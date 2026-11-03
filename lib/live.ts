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
    teams: Array.isArray(m.teamInfo)
      ? m.teamInfo.map((t: any) => ({ name: t.name || '', shortname: t.shortname || '' }))
      : (m.teams || []).map((t: string) => ({ name: t, shortname: t })),
    score: Array.isArray(m.score)
      ? m.score.map((s: any) => ({ inning: s.inning || '', r: s.r ?? 0, w: s.w ?? 0, o: s.o ?? 0 }))
      : [],
  };
}

export async function getCurrentMatches(): Promise<FeedMatch[]> {
  const data = await fetchApi('currentMatches?offset=0', 120);
  if (!Array.isArray(data)) return [];
  return data.map(mapMatch);
}

function teamScore(m: FeedMatch, idx: number): { score?: string; overs?: string } {
  const team = m.teams[idx];
  if (!team) return {};
  const innings = m.score.filter(
    (s) => s.inning.toLowerCase().startsWith(team.name.toLowerCase()) || s.inning.includes(team.shortname),
  );
  const last = innings[innings.length - 1];
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
  const matches = await getCurrentMatches();
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
}

export async function getMatchScorecard(id: string): Promise<MatchScorecard | null> {
  const data = await fetchApi(`match_scorecard?id=${encodeURIComponent(id)}`, 60);
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
  return { match, innings };
}
