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
const STORAGE_KEY = 'creasegrid_app_state_v3';

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
    id: 'my-tournament',
    name: '',
    format: 'T20',
    overs: 20,
    teams: [],
    matchesCount: 0,
    status: 'Draft',
    location: '',
    startDate: '',
  },
  teams: [],
  scorecard: {
    runs: 0,
    wickets: 0,
    legalBalls: 0,
    events: [],
  },
  savedResults: [],
  userPreferences: {
    favoriteArticles: [],
    followingTeams: [],
    followingPlayers: [],
    darkMode: false,
    displayName: '',
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

