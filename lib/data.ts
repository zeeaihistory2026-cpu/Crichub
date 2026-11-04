// CreaseGrid data layer — reads the Supabase stats database (public read via anon key).
// Env vars win when present (set in Vercel); the defaults below are the project's
// public URL + anon key, which are safe to ship: all tables are read-only in public.

export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ylxxbxdjfptsnlzbkoyp.supabase.co';
export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlseHhieGRqZnB0c25semJrb3lwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM3MjMwNjUsImV4cCI6MjEwOTI5OTA2NX0.PRGO2alNzKpqNJfTfWHhp_BzYf8Qq9MFBqc-7X9bR1o';

export interface DbPlayer {
  id: string;
  full_name: string;
  display_name: string | null;
  country_id: string;
  gender: string | null;
  dob: string | null;
  birthplace: string | null;
  batting_style: string | null;
  bowling_style: string | null;
  playing_role: string | null;
  active_from: number | null;
  active_to: number | null;
  has_stats: boolean;
}

export interface BattingRow {
  category: string;
  matches: number | null;
  innings: number | null;
  not_outs: number | null;
  runs: number | null;
  high_score: number | null;
  high_score_not_out: boolean | null;
  average: number | null;
  balls_faced: number | null;
  strike_rate: number | null;
  hundreds: number | null;
  fifties: number | null;
  ducks: number | null;
  fours: number | null;
  sixes: number | null;
}

export interface BowlingRow {
  category: string;
  matches: number | null;
  innings: number | null;
  balls: number | null;
  runs: number | null;
  wkts: number | null;
  best_innings: string | null;
  best_match: string | null;
  average: number | null;
  economy: number | null;
  strike_rate: number | null;
  four_w: number | null;
  five_w: number | null;
  ten_w: number | null;
}

export interface FieldingRow {
  category: string;
  matches: number | null;
  catches: number | null;
  stumpings: number | null;
}

export interface DbCountry {
  id: string;
  name: string;
  is_full_member: boolean;
}

const PLAYER_COLS =
  'id,full_name,display_name:short_name,country_id,dob,birthplace,batting_style,bowling_style,playing_role:role,active_from,active_to,has_stats';

async function sbGet<T>(path: string, client = false): Promise<T | null> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      ...(client ? {} : { next: { revalidate: 3600 } }),
    } as RequestInit);
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function getCountries(): Promise<DbCountry[]> {
  return (await sbGet<DbCountry[]>('countries?select=id,name,is_full_member&order=name.asc&limit=200')) || [];
}

export function countryName(countries: DbCountry[], id: string): string {
  return countries.find((c) => c.id === id)?.name || id;
}

export async function getPlayerBySlug(slug: string): Promise<DbPlayer | null> {
  const rows = await sbGet<DbPlayer[]>(`players?select=${PLAYER_COLS}&id=eq.${encodeURIComponent(slug)}&limit=1`);
  return rows && rows.length ? rows[0] : null;
}

export async function resolvePlayerSlug(slug: string): Promise<string | null> {
  // Legacy short links (e.g. /players/babar-azam) resolve to the canonical
  // full-name slug (e.g. mohammad-babar-azam-pakistan) when unambiguous.
  const like = encodeURIComponent(`%-${slug}-%`);
  const rows = await sbGet<{ id: string }[]>(`players?select=id&id=like.${like}&limit=2`);
  if (rows && rows.length === 1) return rows[0].id;
  const likeStart = encodeURIComponent(`${slug}-%`);
  const rows2 = await sbGet<{ id: string }[]>(`players?select=id&id=like.${likeStart}&limit=2`);
  if (rows2 && rows2.length === 1) return rows2[0].id;
  return null;
}

export async function getPlayerStats(playerId: string) {
  const [batting, bowling, fielding] = await Promise.all([
    sbGet<BattingRow[]>(`batting_stats?player_id=eq.${encodeURIComponent(playerId)}&select=category,matches:mat,innings:inns,not_outs:not_out,runs,high_score:hs,high_score_not_out:hs_not_out,average:ave,balls_faced,strike_rate:sr,hundreds,fifties,ducks,fours,sixes`),
    sbGet<BowlingRow[]>(`bowling_stats?player_id=eq.${encodeURIComponent(playerId)}&select=category,matches:mat,innings:inns,balls,runs,wkts,best_innings:bbi,best_match:bbm,average:ave,economy:econ,strike_rate:sr,four_w,five_w,ten_w`),
    sbGet<FieldingRow[]>(`fielding_stats?player_id=eq.${encodeURIComponent(playerId)}&select=category,matches:mat,catches,stumpings`),
  ]);
  return { batting: batting || [], bowling: bowling || [], fielding: fielding || [] };
}

export interface PlayerListResult {
  players: DbPlayer[];
  total: number;
}

export async function listPlayers(opts: {
  q?: string;
  country?: string;
  statsOnly?: boolean;
  page?: number;
  pageSize?: number;
}): Promise<PlayerListResult> {
  const page = Math.max(1, opts.page || 1);
  const pageSize = opts.pageSize || 60;
  const offset = (page - 1) * pageSize;
  let path = `players?select=${PLAYER_COLS}&order=has_stats.desc,full_name.asc&limit=${pageSize}&offset=${offset}`;
  if (opts.country) path += `&country_id=eq.${encodeURIComponent(opts.country)}`;
  if (opts.statsOnly) path += `&has_stats=eq.true`;
  if (opts.q) {
    const q = encodeURIComponent(`%${opts.q}%`);
    path += `&or=(full_name.ilike.${q},short_name.ilike.${q})`;
  }
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Prefer: 'count=exact',
      },
      next: { revalidate: 600 },
    } as RequestInit);
    if (!res.ok) return { players: [], total: 0 };
    const players = (await res.json()) as DbPlayer[];
    const range = res.headers.get('content-range') || '';
    const total = parseInt(range.split('/')[1] || '0', 10) || players.length;
    return { players, total };
  } catch {
    return { players: [], total: 0 };
  }
}

export async function searchPlayers(q: string, limit = 8, client = false): Promise<DbPlayer[]> {
  if (!q || q.trim().length < 2) return [];
  const enc = encodeURIComponent(`%${q.trim()}%`);
  const rows = await sbGet<DbPlayer[]>(
    `players?select=${PLAYER_COLS}&or=(full_name.ilike.${enc},short_name.ilike.${enc})&order=has_stats.desc,full_name.asc&limit=${limit}`,
    client
  );
  return rows || [];
}

export async function getPlayerBySlugClient(slug: string): Promise<DbPlayer | null> {
  const rows = await sbGet<DbPlayer[]>(
    `players?select=${PLAYER_COLS}&id=eq.${encodeURIComponent(slug)}&limit=1`,
    true
  );
  return rows && rows.length ? rows[0] : null;
}

export async function getPlayerStatsClient(playerId: string) {
  const [batting, bowling] = await Promise.all([
    sbGet<BattingRow[]>(`batting_stats?player_id=eq.${encodeURIComponent(playerId)}&select=category,matches:mat,innings:inns,not_outs:not_out,runs,high_score:hs,high_score_not_out:hs_not_out,average:ave,balls_faced,strike_rate:sr,hundreds,fifties,ducks,fours,sixes`, true),
    sbGet<BowlingRow[]>(`bowling_stats?player_id=eq.${encodeURIComponent(playerId)}&select=category,matches:mat,innings:inns,balls,runs,wkts,best_innings:bbi,best_match:bbm,average:ave,economy:econ,strike_rate:sr,four_w,five_w,ten_w`, true),
  ]);
  return { batting: batting || [], bowling: bowling || [] };
}

export interface LeaderRow {
  runs?: number | null;
  wkts?: number | null;
  average: number | null;
  matches: number | null;
  players: { id: string; full_name: string; display_name: string | null; country_id: string } | null;
}

export async function topBatting(category: string, limit = 10): Promise<LeaderRow[]> {
  const rows = await sbGet<LeaderRow[]>(
    `batting_stats?select=runs,average:ave,matches:mat,players!inner(id,full_name,display_name:short_name,country_id)&category=eq.${category}&runs=not.is.null&order=runs.desc&limit=${limit}`
  );
  return rows || [];
}

export async function topBowling(category: string, limit = 10): Promise<LeaderRow[]> {
  const rows = await sbGet<LeaderRow[]>(
    `bowling_stats?select=wkts,average:ave,matches:mat,players!inner(id,full_name,display_name:short_name,country_id)&category=eq.${category}&wkts=not.is.null&order=wkts.desc&limit=${limit}`
  );
  return rows || [];
}

async function countRows(path: string): Promise<number> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Prefer: 'count=exact',
      },
      next: { revalidate: 600 },
    } as RequestInit);
    if (!res.ok) return 0;
    const range = res.headers.get('content-range') || '';
    return parseInt(range.split('/')[1] || '0', 10) || 0;
  } catch {
    return 0;
  }
}

export interface DbCounts {
  players: number;
  withStats: number;
  statRows: number;
  countries: number;
  teams: number;
}

export async function getDbCounts(): Promise<DbCounts> {
  const [players, withStats, batting, bowling, fielding, countries, teams] = await Promise.all([
    countRows('players?select=id&limit=1'),
    countRows('players?select=id&has_stats=eq.true&limit=1'),
    countRows('batting_stats?select=player_id&limit=1'),
    countRows('bowling_stats?select=player_id&limit=1'),
    countRows('fielding_stats?select=player_id&limit=1'),
    countRows('countries?select=id&limit=1'),
    countRows('teams?select=id&limit=1'),
  ]);
  return { players, withStats, statRows: batting + bowling + fielding, countries, teams };
}

export const CATEGORY_LABELS: Record<string, string> = {
  test: 'Test',
  odi: 'ODI',
  t20i: 'T20I',
  first_class: 'First-Class',
  list_a: 'List A',
  t20: 'T20',
  ipl: 'IPL',
  psl: 'PSL',
  bbl: 'BBL',
  other_leagues: 'Other Leagues',
  youth_odi: 'Youth ODI',
  youth_test: 'Youth Test',
  pak_domestic_u19: 'Pakistan U19 Domestic',
};

// How current each category's published aggregates are (audit 2026-11-04:
// profiles and leaderboards must never present these as silently current).
export const CATEGORY_COVERAGE: Record<string, string> = {
  test: 'career figures to end of 2019',
  odi: 'to March 2025 for Pakistan, India, Australia, England, New Zealand, South Africa, Bangladesh and Afghanistan; end of 2019 for other teams',
  t20i: 'career figures to end of 2019',
  first_class: 'career figures to end of 2019',
  list_a: 'career figures to end of 2019',
  t20: 'career figures to end of 2019',
  ipl: 'complete through the 2026 season',
};

export const CATEGORY_ORDER = [
  'test',
  'odi',
  't20i',
  'first_class',
  'list_a',
  't20',
  'ipl',
  'psl',
  'bbl',
  'other_leagues',
  'youth_odi',
  'youth_test',
  'pak_domestic_u19',
];

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
