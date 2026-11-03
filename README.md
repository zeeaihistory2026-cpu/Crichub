# CreaseGrid — Global Cricket Intelligence & Operations Platform

> **Originating in Pakistan** · Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **Material UI**, **Framer Motion**, and **Supabase**.

---

## 🚀 Quick Start

To run the full development server:

```bash
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser.

To verify mathematical test vectors:

```bash
npm test
```

To run a production build:

```bash
npm run build
npm start
```

---

## 🏏 What Has Been Built

### 1. Three Dedicated Role-Based Dashboards
- **Super Admin Console (`/admin`)**:
  - 5 High-level KPIs (Page views 4.93M, MAU 48,291, Published Articles 2,846, Managed Tournaments 186, Tools Launched 89).
  - 12-Month Audience Growth SVG Curve with area gradients.
  - Latest Newsroom Activity data table.
  - Editorial Workflow queue with status breakdown.
  - Live Match Operations monitoring card.
  - Quick action shortcuts (Write article, Add tournament, Add player, Update score).
  - Most-used tools usage analytics with progress bars.
- **Tournament Organizer Workspace (`/organizer`)**:
  - Active tournament state banner (Lahore, Pakistan · Nov 2026).
  - 4 Operational KPIs (Registered teams, Fixtures completed, Players registered, Matches live).
  - Match-Day Fixtures list with direct "Score match" CTA.
  - Tournament checklist with interactive to-dos.
  - Real-time tournament leaders (Top run scorer, top wicket taker, best all-rounder).
  - Team Registration modal with live persistence.
  - **Phone-First Ball-by-Ball Mobile Scorer (`/organizer/scoring`)**:
    - Thumb-zone score recording: `0` (Dot), `1`, `2`, `3`, `4` (Boundary), `6` (Six), `W` (Wicket), `Wd` (Wide), `Nb` (No Ball).
    - MCC Law adherence: Wides and No-Balls add 1 run without consuming legal deliveries.
    - Automatic overs notation (`overs.balls`, e.g., 16.2 / 20.0).
    - Dynamic Run Rate (RPO) calculation.
    - "Undo Last Ball" action with full score recalculation.
    - Export Scorecard CSV functionality.
- **Cricket Fan / My Cricket (`/me` or `/my-cricket`)**:
  - Live Followed Match Hero tracker (Pakistan vs New Zealand chase equation).
  - 4 Personal KPIs (Following teams, Saved reads, Upcoming matches, Quiz score).
  - News stream tabs: "For you", "Latest", "Analysis".
  - Followed teams list (Pakistan, India, Lahore Qalandars).
  - Coming up for you fixtures calendar.
  - Daily Insight card.

---

### 2. Public Platform & Cricket Intelligence
- **Homepage (`/`)**:
  - High-resolution photographic hero (`hero.webp`) with quick search and shortcut pills.
  - Live Match ticker with real-time match cards.
  - 8-Item Quick navigation hub.
  - Latest Cricket News with featured cover story (`player2.webp`) and "More news" link to `/news`.
  - Upcoming fixtures & Group A standings table.
  - Popular tools grid and Qualification Lab insight callout.
  - "Cricket Explained" guides and Local Tournament organizer CTA banner.
- **Match Centre (`/matches` & `/matches/[slug]`)**:
  - Live demo scoreboard, chase equation (Need 35 runs from 22 balls, Req RR 9.55).
  - Tabs: Summary, Detailed Scorecard, Ball-by-Ball Commentary, Innings Comparison, Match Timeline.
  - Batting and bowling breakdown tables.
- **Tournament Hub & Archive (`/tournaments`)**:
  - Pakistan Super League (PSL) 2026 official standings with NRR, fixtures, squads, and leaderboards.
- **Player Profile (`/players/babar-azam` & `/players`)**:
  - Babar Azam verified profile with portrait (`profile.webp`).
  - Format toggle: T20I, ODI, Test.
  - 5 Metric boxes (Matches, Runs, Average, Strike Rate, Centuries/50s).
  - Performance benchmark scale and Recent Innings log.
  - Interactive "Follow Player" button with persistent state.
- **Stats & Records (`/stats`) & Player Comparison Lab (`/compare`)**:
  - Records explorer by format.
  - Head-to-Head Comparison Lab: Babar Azam vs Mohammad Rizwan side-by-side with format selector and dual-track proportional bars.
- **News & Analysis (`/news` & `/news/[slug]`)**:
  - Category filters (Breaking, Pakistan, International, PSL, Women's Cricket, Domestic, Analysis, Explainer).
  - Search input with headline filtering.
  - Article reader with key highlights box, author byline, share button, and save story bookmarking.
- **Cricket Tools Suite (`/tools`)**:
  - Directory of 12 validated calculators with live interactive math.
- **Signature Qualification Lab (`/qualification`)**:
  - Custom scenario simulator: pick Team A, Team B, runs, overs, and all-out status.
  - Deterministic MCC tournament logic: All-out innings count the entire quota as effective overs faced.
  - Live recalculation of Group A points, cumulative NRR, tie-breaks, and semi-final qualification seeds.
- **Local Cricket Network (`/local`)**:
  - Community landing page detailing benefits for clubs, schools, tape-ball, and leagues.
- **Global Search (`/search` & Modal Command Palette)**:
  - Instant search across players, calculators, tournaments, and articles.

---

### 3. Cricket Mathematics Engine (`lib/cricket-math.ts`)
Strictly follows PRD 2.0 and MCC Laws:
1. **Overs to Legal Deliveries Converter**: Integer legal-ball basis (`17.4` = 106 balls; `17.6` throws an invalid notation error).
2. **Run Rate**: `(runs * 6) / legal_balls`.
3. **Required Run Rate**: `((target - current) * 6) / remaining_legal_balls`.
4. **Net Run Rate**: `(runs_scored * 6 / balls_faced) - (runs_conceded * 6 / balls_bowled)` with all-out effective quota.
5. **Batting Average**: `runs / (innings - not_outs)` (returns `N/A` with 0 dismissals).
6. **Batting Strike Rate**: `(runs * 100) / balls_faced`.
7. **Bowling Average**: `conceded / wickets` (returns `N/A` with 0 wickets).
8. **Bowling Economy**: `(conceded * 6) / legal_balls`.
9. **Bowling Strike Rate**: `legal_balls / wickets`.
10. **Target & Chase**: Target = opponent + 1; runs needed = target - current.
11. **Projected Score**: Current runs + linear rate * remaining balls.
12. **Partnership**: Batter A + Batter B + Extras.

---

### 4. Supabase Backend Integration
- **PostgreSQL Database Schema (`supabase/schema.sql`)**:
  - `user_profiles`, `local_tournaments`, `tournament_teams`, `local_matches`, `delivery_events`, `articles`, `user_bookmarks`, `user_follows`, `scenario_snapshots`.
  - Row Level Security (RLS) enabled on all tables.
- **Intelligent Offline / Mock Storage Layer (`lib/supabase.ts`)**:
  - Works out of the box with zero setup required.
  - To connect a live Supabase project, create `.env.local`:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
    ```

