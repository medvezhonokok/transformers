/*
  # Create Transformers Volleyball Team Tables

  1. New Tables
    - `players`
      - `id` (uuid, primary key)
      - `name` (text) - Full name of the player
      - `birth_year` (integer) - Year of birth
      - `height` (integer) - Height in cm
      - `skill_level` (text) - Skill level
      - `position` (text) - Playing position
      - `story` (text) - Fun story about the player
      - `color` (text) - Accent color for the player card
      - `created_at` (timestamp)
    
    - `schedule`
      - `id` (uuid, primary key)
      - `home_team` (text) - Home team name
      - `away_team` (text) - Away team name
      - `game_date` (timestamptz) - Date and time of the game
      - `location` (text) - Game location
      - `score` (text) - Game score (nullable)
      - `status` (text) - Game status (scheduled, postponed, completed)
      - `created_at` (timestamp)
  
  2. Security
    - Enable RLS on both tables
    - Add policies for public read access
*/

CREATE TABLE IF NOT EXISTS players (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  birth_year integer NOT NULL,
  height integer NOT NULL,
  skill_level text NOT NULL DEFAULT 'любитель',
  position text NOT NULL,
  story text NOT NULL,
  color text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS schedule (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  home_team text NOT NULL,
  away_team text NOT NULL,
  game_date timestamptz NOT NULL,
  location text NOT NULL,
  score text,
  status text NOT NULL DEFAULT 'scheduled',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedule ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view players"
  ON players
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can view schedule"
  ON schedule
  FOR SELECT
  TO anon
  USING (true);