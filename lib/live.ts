// Live match feed adapter (CricAPI / CricketData.org).
// Server-side only: the API key lives in the CRICAPI_KEY env var and is
// never sent to the browser. When no key is configured (or the provider
// errors), every function returns empty/null and the site falls back to
// its verified recent-results content - never to invented scores.

export interface RibbonItem {
  id: string;
  slug: string;
  href: string;
  type: 'live' | 'upcoming' | 'completed';
  badge: string;
  badgeType: 'live' | 'upcoming' | 'completed';
  series: string;
  teamA: { code: string; score?: string; overs?: string };
  teamB: { code: string; score?: string; overs?: string };
  statusText: string;
  highlightStatus?: boolean;
}

export interface FeedInnings {
  inning: string;
  r: number;
  w: number;
  o: number;
}

export interface FeedMatch {
  id: string;
  name: string;
  matchType: string;
  status: string;
  venue: string;
  dateTimeGMT: string;
  state: 'live' | 'upcoming' | 'completed';
  teams: { name: string; shortname: string }[];
  score: FeedInnings[];
}

const API_BASE = 'https://api.cricapi.com/v1';

import { SUPABASE_URL, SUPABASE_ANON_KEY } from './data';

// ---------- Scorecard archive ----------
// The feed only carries recent matches, and its free quota can run out.
// Every completed scorecard the site loads is archived into our own
// database (feed_scorecards), so a match page keeps its full scorecard
// forever - readable with the public anon key, writable only from the
// server via the service-role key.

async function readArchiveById(id: string): Promise<MatchScorecard | null> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/feed_scorecards?match_id=eq.${encodeURIComponent(id)}&select=payload`,
      { headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` }, next: { revalidate: 3600 } },
    );
    if (!res.ok) return null;
    const rows = await res.json();
    return Array.isArray(rows) && rows[0]?.payload ? (rows[0].payload as MatchScorecard) : null;
  } catch {
    return null;
  }
}

export async function findArchivedScorecard(teamA: string, teamB: string): Promise<MatchScorecard | null> {
  const a = normalizeTeamName(teamA);
  const b = normalizeTeamName(teamB);
  const filter = `or=(and(team_a.eq.${a},team_b.eq.${b}),and(team_a.eq.${b},team_b.eq.${a}))`;
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/feed_scorecards?${filter}&select=payload&order=captured_at.desc&limit=1`,
      { headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` }, next: { revalidate: 3600 } },
    );
    if (!res.ok) return null;
    const rows = await res.json();
    return Array.isArray(rows) && rows[0]?.payload ? (rows[0].payload as MatchScorecard) : null;
  } catch {
    return null;
  }
}

async function writeArchive(sc: MatchScorecard): Promise<void> {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey || sc.match.teams.length < 2) return;
  try {
    await fetch(`${SUPABASE_URL}/rest/v1/feed_scorecards`, {
      method: 'POST',
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        'Content-Type': 'application/json',
        Prefer: 'resolution=merge-duplicates',
      },
      body: JSON.stringify({
        match_id: sc.match.id,
        name: sc.match.name,
        team_a: normalizeTeamName(sc.match.teams[0].name),
        team_b: normalizeTeamName(sc.match.teams[1].name),
        payload: sc,
      }),
      cache: 'no-store',
    });
  } catch {
    /* archive is best-effort */
  }
}

export function liveFeedConfigured(): boolean {
  return Boolean(process.env.CRICAPI_KEY);
}

async function fetchApi(path: string, revalidateSeconds: number): Promise<any | null> {
  const key = process.env.CRICAPI_KEY;
  if (!key) return null;
  try {
    const res = await fetch(`${API_BASE}/${path}${path.includes('?') ? '&' : '?'}apikey=${key}`, {
      next: { revalidate: revalidateSeconds },
    });
    if (!res.ok) return null;
    const json = await res.json();
    if (!json || json.status !== 'success' || !json.data) return null;
    return json.data;
  } catch {
    return null;
  }
}

function mapMatch(m: any): FeedMatch {
  const state: FeedMatch['state'] = m.matchEnded
    ? 'completed'
    : m.matchStarted
      ? 'live'
      : 'upcoming';
  return {
    id: String(m.id),
    name: m.name || '',
    matchType: (m.matchType || '').toString(),
    status: m.status || '',
    venue: m.venue || '',
    dateTimeGMT: m.dateTimeGMT || '',
    state,
    teams: Array.isArray(m.teamInfo) && m.teamInfo.length > 0
      ? m.teamInfo.map((t: any, i: number) => ({
          name: t.name || (m.teams || [])[i] || '',
          shortname: t.shortname || (m.teams || [])[i] || t.name || '',
        }))
      : (m.teams || []).map((t: string) => ({ name: t, shortname: t })),
    score: Array.isArray(m.score)
      ? m.score.map((s: any) => ({ inning: s.inning || '', r: s.r ?? 0, w: s.w ?? 0, o: s.o ?? 0 }))
      : [],
  };
}

export async function getCurrentMatches(full = false): Promise<FeedMatch[]> {
  // The feed's first page is dominated by just-finished matches; live and
  // upcoming fixtures can sit on later pages (25 rows per page, ~57 total).
  // Page through up to 3 pages, stopping early once a live match is found
  // or a short page marks the end of the list.
  const all: FeedMatch[] = [];
  for (const offset of [0, 25, 50]) {
    const data = await fetchApi(`currentMatches?offset=${offset}`, 300);
    if (!Array.isArray(data) || data.length === 0) break;
    const mapped = data.map(mapMatch);
    all.push(...mapped);
    if (data.length < 25) break;
    if (!full && mapped.some((m) => m.state === 'live')) break;
  }
  return all;
}

function teamScore(m: FeedMatch, idx: number): { score?: string; overs?: string } {
  const team = m.teams[idx];
  if (!team) return {};
  const innings = m.score.filter(
    (s) => s.inning.toLowerCase().startsWith(team.name.toLowerCase()) || s.inning.includes(team.shortname),
  );
  let last = innings[innings.length - 1];
  if (!last && m.score[idx] && m.teams.length === 2) {
    // Positional fallback for feed quirks like "TeamA,TeamB Inning 1".
    const other = m.score.filter(
      (x) => x.inning.toLowerCase().startsWith(m.teams[1 - idx].name.toLowerCase()),
    );
    if (!other.includes(m.score[idx])) last = m.score[idx];
  }
  if (!last) return {};
  return { score: `${last.r}/${last.w}`, overs: `(${last.o} ov)` };
}

export function toRibbonItem(m: FeedMatch): RibbonItem {
  const isLive = m.state === 'live';
  return {
    id: `live-${m.id}`,
    slug: `live/${m.id}`,
    href: `/matches/live/${m.id}`,
    type: m.state,
    badge: isLive ? 'LIVE' : 'UPCOMING',
    badgeType: isLive ? 'live' : 'upcoming',
    series: `${m.matchType.toUpperCase()} - ${m.venue}`,
    teamA: { code: m.teams[0]?.shortname || 'TBA', ...teamScore(m, 0) },
    teamB: { code: m.teams[1]?.shortname || 'TBA', ...teamScore(m, 1) },
    statusText: m.status || (isLive ? 'Match in progress' : 'Upcoming'),
    highlightStatus: isLive,
  };
}

export async function getLiveRibbonItems(): Promise<RibbonItem[]> {
  const matches = await getFeaturedMatches();
  return matches.filter((m) => m.state !== 'completed').map(toRibbonItem);
}

// ---------- Scorecard (live match detail) ----------

export interface ScorecardBatter {
  name: string;
  dismissal: string;
  r: number;
  b: number;
  fours: number;
  sixes: number;
  sr: number;
}

export interface ScorecardBowler {
  name: string;
  o: number;
  m: number;
  r: number;
  w: number;
  eco: number;
}

export interface ScorecardInnings {
  label: string;
  batting: ScorecardBatter[];
  bowling: ScorecardBowler[];
  totalText: string;
}

export interface MatchScorecard {
  match: FeedMatch;
  innings: ScorecardInnings[];
  // Set when the scorecard did not come from the live feed (e.g. compiled
  // from a published scorecard into the archive).
  source?: string;
}

export async function getMatchScorecard(id: string): Promise<MatchScorecard | null> {
  const archived = await readArchiveById(id);
  if (archived) return archived;
  const data = await fetchApi(`match_scorecard?id=${encodeURIComponent(id)}`, 300);
  if (!data) return null;
  const match = mapMatch(data);
  const innings: ScorecardInnings[] = Array.isArray(data.scorecard)
    ? data.scorecard.map((inn: any) => ({
        label: inn.inning || '',
        batting: (inn.batting || []).map((b: any) => ({
          name: b.batsman?.name || '',
          dismissal: b['dismissal-text'] || '',
          r: b.r ?? 0,
          b: b.b ?? 0,
          fours: b['4s'] ?? 0,
          sixes: b['6s'] ?? 0,
          sr: b.sr ?? 0,
        })),
        bowling: (inn.bowling || []).map((bw: any) => ({
          name: bw.bowler?.name || '',
          o: bw.o ?? 0,
          m: bw.m ?? 0,
          r: bw.r ?? 0,
          w: bw.w ?? 0,
          eco: bw.eco ?? 0,
        })),
        totalText: inn.totals ? `${inn.totals.r}/${inn.totals.w} (${inn.totals.o} ov)` : '',
      }))
    : [];
  const result = { match, innings };
  if (match.state === 'completed' && innings.length > 0) {
    await writeArchive(result);
  }
  return result;
}

// ---------- Editorial filter: internationals + major leagues only ----------
// The site surfaces only (a) matches between national teams and
// (b) the major franchise leagues in its scope. Domestic tournaments
// (Ranji Trophy, county cricket, local leagues) stay out of the ribbon
// and the Match Centre.

const NATIONAL_TEAMS = new Set(
  [
    'Afghanistan', 'Argentina', 'Australia', 'Austria', 'Bahamas', 'Bahrain', 'Bangladesh',
    'Belgium', 'Belize', 'Bermuda', 'Bhutan', 'Botswana', 'Brazil', 'Bulgaria', 'Cambodia',
    'Cameroon', 'Canada', 'Cayman Islands', 'Chile', 'China', 'Cook Islands', 'Costa Rica',
    'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'Egypt', 'England', 'Estonia', 'Eswatini',
    'Fiji', 'Finland', 'France', 'Gambia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Guernsey',
    'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Ireland', 'Isle of Man',
    'Israel', 'Italy', 'Ivory Coast', 'Japan', 'Jersey', 'Kenya', 'Kuwait', 'Lesotho',
    'Luxembourg', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Mexico', 'Mongolia',
    'Mozambique', 'Myanmar', 'Namibia', 'Nepal', 'Netherlands', 'New Zealand', 'Nigeria',
    'Norway', 'Oman', 'Pakistan', 'Panama', 'Papua New Guinea', 'Philippines', 'Portugal',
    'Qatar', 'Romania', 'Rwanda', 'Samoa', 'Saudi Arabia', 'Scotland', 'Serbia', 'Seychelles',
    'Sierra Leone', 'Singapore', 'Slovenia', 'South Africa', 'South Korea', 'Spain',
    'Sri Lanka', 'St Helena', 'Suriname', 'Sweden', 'Switzerland', 'Tanzania', 'Thailand',
    'Turkey', 'Uganda', 'United Arab Emirates', 'United States of America', 'Vanuatu',
    'West Indies', 'Zambia', 'Zimbabwe',
  ].map((n) => n.toLowerCase()),
);

const TEAM_ALIASES: Record<string, string> = {
  'united states': 'united states of america',
  usa: 'united states of america',
  uae: 'united arab emirates',
  'hong kong, china': 'hong kong',
  "cote d'ivoire": 'ivory coast',
  "côte d'ivoire": 'ivory coast',
  türkiye: 'turkey',
  turkiye: 'turkey',
  czechia: 'czech republic',
  holland: 'netherlands',
  korea: 'south korea',
  'korea republic': 'south korea',
};

export function normalizeTeamName(name: string): string {
  let n = (name || '').toLowerCase().trim().replace(/\s+/g, ' ');
  n = n.replace(/ (women|woman)$/, '');
  n = n.replace(/ (u19|u-19|under-19|under 19)$/, '');
  return TEAM_ALIASES[n] || n;
}

export function isNationalTeam(name: string): boolean {
  return NATIONAL_TEAMS.has(normalizeTeamName(name));
}

const LEAGUE_PATTERNS: RegExp[] = [
  /indian premier league|ipl/,
  /pakistan super league|psl/,
  /big bash|bbl/,
  /caribbean premier league|cpl/,
  /sa20/,
  /the hundred/,
  /lanka premier league|lpl/,
  /bangladesh premier league|bpl/,
];

export type MatchClass = 'international' | 'league' | 'other';

export function classifyMatch(m: FeedMatch): MatchClass {
  if (m.teams.length >= 2 && m.teams.every((t) => isNationalTeam(t.name))) {
    return 'international';
  }
  const hay = m.name.toLowerCase();
  if (LEAGUE_PATTERNS.some((re) => re.test(hay))) return 'league';
  return 'other';
}

export async function getFeaturedMatches(): Promise<FeedMatch[]> {
  const all = await getCurrentMatches();
  return all.filter((m) => classifyMatch(m) !== 'other');
}

// Find a feed match (any state) between two teams - used to attach full
// scorecards to curated result pages while the match is in the feed window.
// The recent-matches window only spans a few days. For older completed
// matches, look the fixture up in the feed's series archive: find a series
// whose name mentions one of the teams and whose dates cover the match
// date, then pick the match with the same team pair on that date.
export async function findSeriesScorecardId(
  teamA: string,
  teamB: string,
  dateISO?: string,
): Promise<string | null> {
  const a = normalizeTeamName(teamA);
  const b = normalizeTeamName(teamB);
  const wantedDates = new Set<string>();
  if (dateISO) {
    const base = new Date(`${dateISO}T00:00:00Z`).getTime();
    for (const delta of [-1, 0, 1]) {
      wantedDates.add(new Date(base + delta * 86400000).toISOString().slice(0, 10));
    }
  }
  for (const offset of [0, 25, 50, 75]) {
    const data = await fetchApi(`series?offset=${offset}`, 86400);
    if (!Array.isArray(data) || data.length === 0) break;
    for (const series of data) {
      const name = String(series?.name || '').toLowerCase();
      if (!name.includes(a) && !name.includes(b)) continue;
      if (dateISO && series?.startDate && series?.endDate) {
        if (dateISO < String(series.startDate).slice(0, 10) || dateISO > String(series.endDate).slice(0, 10)) continue;
      }
      const info = await fetchApi(`series_info?id=${encodeURIComponent(series.id)}`, 86400);
      const list = Array.isArray(info?.matchList) ? info.matchList : [];
      for (const m of list) {
        const names = (Array.isArray(m?.teams) ? m.teams : []).map((t: string) => normalizeTeamName(t));
        const pairOk =
          (names.includes(a) && names.includes(b)) ||
          (Array.isArray(m?.teamInfo) &&
            m.teamInfo.some((t: any) => normalizeTeamName(t?.name || '') === a) &&
            m.teamInfo.some((t: any) => normalizeTeamName(t?.name || '') === b));
        if (!pairOk) continue;
        if (wantedDates.size > 0) {
          const d = String(m?.dateTimeGMT || m?.date || '').slice(0, 10);
          if (!wantedDates.has(d)) continue;
        }
        if (m?.id) return String(m.id);
      }
    }
    if (data.length < 25) break;
  }
  return null;
}

export async function findFeedMatch(teamA: string, teamB: string): Promise<FeedMatch | null> {
  const a = normalizeTeamName(teamA);
  const b = normalizeTeamName(teamB);
  const all = await getCurrentMatches(true);
  return (
    all.find((m) => {
      if (m.teams.length < 2) return false;
      const names = m.teams.map((t) => normalizeTeamName(t.name));
      return names.includes(a) && names.includes(b);
    }) || null
  );
}
