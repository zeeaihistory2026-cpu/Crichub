export type MatchStatus = 'LIVE' | 'IN PROGRESS' | 'UPCOMING' | 'FINAL';

export interface MatchSummary {
  id: string;
  slug: string;
  name: string;
  short: string;
  teamA: string;
  teamACode: string;
  teamAFlag: string;
  teamAScore: string;
  teamB: string;
  teamBCode: string;
  teamBFlag: string;
  teamBScore: string;
  detail: string;
  status: MatchStatus;
  target?: number;
  ballsRemaining?: number;
  runsNeeded?: number;
  requiredRate?: number;
  currentRate?: number;
  venue?: string;
  format?: 'T20' | 'ODI' | 'Test';
  series?: string;
  dateLabel?: string;
  result?: string;
  note?: string;
}

export interface BallDeliveryEvent {
  id: string;
  sequence: number;
  legal: boolean;
  kind: '0' | '1' | '2' | '3' | '4' | '6' | 'W' | 'Wd' | 'Nb';
  runs: number;
  wicket: number;
  label: string;
  overNumber: number;
  ballInOver: number;
  timestamp: string;
  bowlerName?: string;
  batterName?: string;
  commentary?: string;
}

export interface InningsState {
  runs: number;
  wickets: number;
  legalBalls: number;
  events: BallDeliveryEvent[];
  oversLimit: number;
}

export interface StandingTeam {
  name: string;
  flag: string;
  p: number;
  w: number;
  l: number;
  t?: number;
  nr?: number;
  pts: number;
  scored: number;
  faced: number;
  conceded: number;
  bowled: number;
}

export interface Article {
  id: string;
  category: string;
  region: string;
  title: string;
  summary: string;
  date: string;
  minutes: number;
  stamp: string;
  author: string;
  body: string[];
  highlights: string[];
  coverImage?: string;
}

export interface ToolField {
  key: string;
  label: string;
  default: string;
  type: 'number' | 'overs' | 'text';
  placeholder?: string;
}

export interface ToolDefinition {
  id: string;
  name: string;
  category: 'Match Calculators' | 'Player Analysis' | 'Tournament Tools' | 'Creator Tools' | 'Planning';
  priority: 'P1' | 'P2' | 'P3';
  icon: string;
  desc: string;
  fields: ToolField[];
  formula: string;
  workedExample: string;
}

export interface LocalTournament {
  id: string;
  name: string;
  format: 'T20' | 'ODI' | 'Tape-ball' | 'Custom';
  overs: number;
  teams: string[];
  matchesCount: number;
  status: 'Draft' | 'In Progress' | 'Completed';
  location?: string;
  startDate?: string;
  created_at?: string;
}

export interface UserPreferences {
  favoriteArticles: string[];
  followingTeams: string[];
  followingPlayers: string[];
  darkMode: boolean;
  displayName: string;
}

