import { createClient } from '@supabase/supabase-js';
import { BallDeliveryEvent, LocalTournament, UserPreferences } from '@/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mock.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'mock-anon-key';

export const isSupabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('mock.supabase.co')
);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Robust Local Storage & Mock Layer for immediate operational reliability
 * Allows full local tournaments, team creation, ball-by-ball scoring,
 * bookmarking, following, and offline operation.
 */
const STORAGE_KEY = 'creasegrid_app_state_v2';

interface AppStorageState {
  tournament: LocalTournament;
  teams: string[];
  scorecard: {
    runs: number;
    wickets: number;
    legalBalls: number;
    events: BallDeliveryEvent[];
  };
  savedResults: Array<{ teamA: string; teamB: string; runsA: number; runsB: number; date: string }>;
  userPreferences: UserPreferences;
}

const DEFAULT_STORAGE: AppStorageState = {
  tournament: {
    id: 'demo-tournament-1',
    name: 'City Champions Cup 2026',
    format: 'T20',
    overs: 20,
    teams: ['Lahore Strikers', 'City Warriors', 'Royal Falcons', 'Tigers XI'],
    matchesCount: 24,
    status: 'In Progress',
    location: 'Lahore, Pakistan',
    startDate: '2–16 Nov 2026',
  },
  teams: ['Lahore Strikers', 'City Warriors', 'Royal Falcons', 'Tigers XI'],
  scorecard: {
    runs: 142,
    wickets: 4,
    legalBalls: 98, // 16.2 overs
    events: [
      { id: '1', sequence: 1, legal: true, kind: '1', runs: 1, wicket: 0, label: 'Single', overNumber: 15, ballInOver: 5, timestamp: '1h ago' },
      { id: '2', sequence: 2, legal: true, kind: '4', runs: 4, wicket: 0, label: 'Four runs', overNumber: 15, ballInOver: 6, timestamp: '1h ago' },
      { id: '3', sequence: 3, legal: true, kind: '0', runs: 0, wicket: 0, label: 'Dot ball', overNumber: 16, ballInOver: 1, timestamp: '45m ago' },
      { id: '4', sequence: 4, legal: true, kind: '6', runs: 6, wicket: 0, label: 'Six runs', overNumber: 16, ballInOver: 2, timestamp: '40m ago' },
    ],
  },
  savedResults: [
    { teamA: 'North Stars', teamB: 'Metro Kings', runsA: 165, runsB: 158, date: 'Nov 2, 2026' }
  ],
  userPreferences: {
    favoriteArticles: ['pakistan-squad'],
    followingTeams: ['Pakistan', 'India', 'Lahore Qalandars'],
    followingPlayers: ['babar'],
    darkMode: false,
    displayName: 'Ayaan Khan',
  },
};

export function getLocalState(): AppStorageState {
  if (typeof window === 'undefined') return DEFAULT_STORAGE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STORAGE;
    return { ...DEFAULT_STORAGE, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_STORAGE;
  }
}

export function saveLocalState(state: Partial<AppStorageState>): void {
  if (typeof window === 'undefined') return;
  try {
    const current = getLocalState();
    const updated = { ...current, ...state };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save state to localStorage', e);
  }
}

