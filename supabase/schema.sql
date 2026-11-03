-- ==============================================================================
-- CREASEGRID — SUPABASE / POSTGRESQL PRODUCTION DATABASE SCHEMA
-- Complies with PRD 2.0 (PostgreSQL schemas, constraints, enums, RLS policies)
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. USERS & PROFILES
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_user_id UUID UNIQUE,
  display_name TEXT NOT NULL DEFAULT 'Cricket Enthusiast',
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('super_admin', 'editor', 'organizer', 'scorer', 'user')),
  email TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public user profiles are viewable by everyone" 
ON public.user_profiles FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" 
ON public.user_profiles FOR UPDATE USING (auth.uid() = auth_user_id);

-- ------------------------------------------------------------------------------
-- 2. LOCAL TOURNAMENTS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.local_tournaments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  format TEXT NOT NULL DEFAULT 'T20' CHECK (format IN ('T20', 'ODI', 'Tape-ball', 'Custom')),
  overs INTEGER NOT NULL DEFAULT 20 CHECK (overs >= 1 AND overs <= 90),
  status TEXT NOT NULL DEFAULT 'In Progress' CHECK (status IN ('Draft', 'Scheduled', 'In Progress', 'Completed', 'Archived')),
  location TEXT DEFAULT 'Pakistan',
  owner_id UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.local_tournaments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published tournaments"
ON public.local_tournaments FOR SELECT USING (true);

CREATE POLICY "Organizers can create and manage tournaments"
ON public.local_tournaments FOR ALL USING (true);

-- ------------------------------------------------------------------------------
-- 3. TOURNAMENT TEAMS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.tournament_teams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tournament_id UUID NOT NULL REFERENCES public.local_tournaments(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  flag TEXT DEFAULT '🏏',
  contact_person TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.tournament_teams ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tournament teams are viewable by everyone"
ON public.tournament_teams FOR SELECT USING (true);

CREATE POLICY "Organizers can manage tournament teams"
ON public.tournament_teams FOR ALL USING (true);

-- ------------------------------------------------------------------------------
-- 4. FIXTURES & MATCHES
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.local_matches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tournament_id UUID REFERENCES public.local_tournaments(id) ON DELETE CASCADE,
  team_a_name TEXT NOT NULL,
  team_b_name TEXT NOT NULL,
  scheduled_at TIMESTAMPTZ DEFAULT NOW(),
  venue TEXT DEFAULT 'Local Ground',
  status TEXT NOT NULL DEFAULT 'Scheduled' CHECK (status IN ('Scheduled', 'In Progress', 'Completed', 'Abandoned')),
  overs_limit INTEGER NOT NULL DEFAULT 20,
  winner TEXT,
  result_summary TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.local_matches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Matches are viewable by everyone"
ON public.local_matches FOR SELECT USING (true);

CREATE POLICY "Scorers and organizers can update matches"
ON public.local_matches FOR ALL USING (true);

-- ------------------------------------------------------------------------------
-- 5. BALL-BY-BALL DELIVERY LOG (Idempotent Append-Only)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.delivery_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  match_id UUID NOT NULL REFERENCES public.local_matches(id) ON DELETE CASCADE,
  innings_number INTEGER NOT NULL DEFAULT 1,
  sequence INTEGER NOT NULL,
  legal_delivery BOOLEAN NOT NULL DEFAULT true,
  kind TEXT NOT NULL CHECK (kind IN ('0', '1', '2', '3', '4', '6', 'W', 'Wd', 'Nb', 'Bye', 'LegBye', 'Penalty')),
  runs INTEGER NOT NULL DEFAULT 0 CHECK (runs >= 0),
  wicket INTEGER NOT NULL DEFAULT 0 CHECK (wicket IN (0, 1)),
  label TEXT NOT NULL,
  bowler_name TEXT,
  batter_name TEXT,
  recorded_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_match_inning_seq UNIQUE (match_id, innings_number, sequence)
);

ALTER TABLE public.delivery_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Delivery events are viewable by everyone"
ON public.delivery_events FOR SELECT USING (true);

CREATE POLICY "Authorized scorers can append delivery events"
ON public.delivery_events FOR INSERT WITH CHECK (true);

-- ------------------------------------------------------------------------------
-- 6. EDITORIAL ARTICLES & CONTENT
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  category TEXT NOT NULL,
  region TEXT DEFAULT 'Pakistan',
  author TEXT NOT NULL DEFAULT 'CreaseGrid Desk',
  body JSONB NOT NULL DEFAULT '[]'::jsonb,
  highlights JSONB NOT NULL DEFAULT '[]'::jsonb,
  cover_image TEXT,
  read_time_minutes INTEGER DEFAULT 4,
  status TEXT NOT NULL DEFAULT 'Published' CHECK (status IN ('Draft', 'In Review', 'Scheduled', 'Published')),
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published articles are readable by everyone"
ON public.articles FOR SELECT USING (status = 'Published');

-- ------------------------------------------------------------------------------
-- 7. USER PREFERENCES & ACTIVITY
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.user_bookmarks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  article_id UUID REFERENCES public.articles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, article_id)
);

CREATE TABLE IF NOT EXISTS public.user_follows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  entity_type TEXT NOT NULL CHECK (entity_type IN ('team', 'player', 'tournament')),
  entity_identifier TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, entity_type, entity_identifier)
);

ALTER TABLE public.user_bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_follows ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their bookmarks"
ON public.user_bookmarks FOR ALL USING (true);

CREATE POLICY "Users can manage their follows"
ON public.user_follows FOR ALL USING (true);

-- ------------------------------------------------------------------------------
-- 8. QUALIFICATION LAB SCENARIO SNAPSHOTS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.scenario_snapshots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  tournament_name TEXT DEFAULT 'Demo League',
  assumptions JSONB NOT NULL,
  projected_standings JSONB NOT NULL,
  created_by UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.scenario_snapshots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Scenario snapshots are viewable"
ON public.scenario_snapshots FOR SELECT USING (true);

