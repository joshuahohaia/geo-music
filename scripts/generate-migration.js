const fs = require('fs');
const path = require('path');

const songsPath = path.join(__dirname, '..', 'src', 'data', 'seed-songs.json');
const migrationPath = path.join(__dirname, '..', 'supabase', 'migration.sql');

const songs = JSON.parse(fs.readFileSync(songsPath, 'utf-8'));

const escapeSQL = (str) => str.replace(/'/g, "''");

const songValues = songs.map(song => {
  return `('${escapeSQL(song.title)}', '${escapeSQL(song.artist)}', '${escapeSQL(song.album)}', ${song.year}, '${escapeSQL(song.genre)}', '${song.deezer_id}', '${escapeSQL(song.preview_url)}', '${escapeSQL(song.cover_url)}', ${song.latitude}, ${song.longitude}, '${escapeSQL(song.location_name)}', '${escapeSQL(song.country)}', ${song.difficulty})`;
}).join(',\n\n');

const migration = `-- SoundMap Database Schema
-- Run this SQL in your Supabase SQL Editor: https://supabase.com/dashboard/project/YOUR_PROJECT/sql
-- Generated: ${new Date().toISOString()}

-- Drop existing table if you want to reset (uncomment if needed)
-- DROP TABLE IF EXISTS songs;

-- Create songs table
CREATE TABLE IF NOT EXISTS songs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  artist VARCHAR(255) NOT NULL,
  album VARCHAR(255),
  year INTEGER,
  genre VARCHAR(100),
  deezer_id VARCHAR(50),
  preview_url TEXT NOT NULL,
  cover_url TEXT,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  location_name VARCHAR(255),
  country VARCHAR(100),
  difficulty INTEGER DEFAULT 2 CHECK (difficulty BETWEEN 1 AND 5),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_songs_active ON songs(is_active) WHERE is_active = true;

-- Enable Row Level Security
ALTER TABLE songs ENABLE ROW LEVEL SECURITY;

-- Allow anonymous read access (no auth required for MVP)
DROP POLICY IF EXISTS "Allow anonymous read" ON songs;
CREATE POLICY "Allow anonymous read" ON songs
  FOR SELECT TO anon
  USING (is_active = true);

-- Clear existing data and insert fresh seed data
TRUNCATE TABLE songs;

INSERT INTO songs (title, artist, album, year, genre, deezer_id, preview_url, cover_url, latitude, longitude, location_name, country, difficulty) VALUES
${songValues};

-- Verify the data
SELECT COUNT(*) as song_count FROM songs;
`;

fs.writeFileSync(migrationPath, migration);
console.log('Generated: supabase/migration.sql');
console.log(`Includes ${songs.length} songs with fresh preview URLs.`);
