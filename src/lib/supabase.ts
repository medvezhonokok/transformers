import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Player {
  id: string;
  name: string;
  birth_year: number;
  height: number;
  skill_level: string;
  position: string;
  story: string;
  color: string;
  created_at: string;
}

export interface Game {
  id: string;
  home_team: string;
  away_team: string;
  game_date: string;
  location: string;
  score: string | null;
  status: 'scheduled' | 'postponed' | 'completed';
  created_at: string;
}