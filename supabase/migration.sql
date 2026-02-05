-- SoundMap Database Schema
-- Run this SQL in your Supabase SQL Editor: https://supabase.com/dashboard/project/YOUR_PROJECT/sql

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

-- Insert seed data
INSERT INTO songs (title, artist, album, year, genre, deezer_id, preview_url, cover_url, latitude, longitude, location_name, country, difficulty) VALUES
('Empire State of Mind', 'JAY-Z ft. Alicia Keys', 'The Blueprint 3', 2009, 'Hip-Hop', '90533119', 'https://cdnt-preview.dzcdn.net/api/1/1/c/5/1/0/c514b21f84201fd6bbe384942125642a.mp3?hdnea=exp=1770332899~acl=/api/1/1/c/5/1/0/c514b21f84201fd6bbe384942125642a.mp3*~data=user_id=0,application_id=42~hmac=ebf8841d678d13eb7055fabee53897560ab621719a6b26df8142d97951a46318', 'https://cdn-images.dzcdn.net/images/cover/e0edb930ad843bb002c04956a81ce7de/250x250-000000-80-0-0.jpg', 40.7484, -73.9857, 'New York City, New York', 'United States', 1),

('London Calling', 'The Clash', 'London Calling', 1979, 'Punk Rock', '69924599', 'https://cdnt-preview.dzcdn.net/api/1/1/0/3/8/0/038710b50afa495e8339a056c32f9057.mp3?hdnea=exp=1770332900~acl=/api/1/1/0/3/8/0/038710b50afa495e8339a056c32f9057.mp3*~data=user_id=0,application_id=42~hmac=522bbd928255c846a2bfe39a98a3961c87d2b666a7bdad9be932462444cd179d', 'https://cdn-images.dzcdn.net/images/cover/1dbb7d7bee08ed2b18deabffd675bd36/250x250-000000-80-0-0.jpg', 51.5074, -0.1278, 'London, England', 'United Kingdom', 1),

('Viva Las Vegas', 'Elvis Presley', 'Viva Las Vegas (Soundtrack)', 1964, 'Rock and Roll', '78551866', 'https://cdnt-preview.dzcdn.net/api/1/1/8/1/8/0/8187d7472d4bc658897a8c12714c14a6.mp3?hdnea=exp=1770332900~acl=/api/1/1/8/1/8/0/8187d7472d4bc658897a8c12714c14a6.mp3*~data=user_id=0,application_id=42~hmac=a6f6ba34f04643b6f879ff5526f0c67509aeae83b053dca768a1bbd33dd0c346', 'https://cdn-images.dzcdn.net/images/cover/63a45fe89705b6f06b477354786a2a14/250x250-000000-80-0-0.jpg', 36.1699, -115.1398, 'Las Vegas, Nevada', 'United States', 1),

('Waka Waka (This Time for Africa)', 'Shakira', 'Listen Up! The Official 2010 FIFA World Cup Album', 2010, 'Pop', '68473089', 'https://cdnt-preview.dzcdn.net/api/1/1/4/1/0/0/4107a09dd93ef52169edd819029f3ac7.mp3?hdnea=exp=1770332900~acl=/api/1/1/4/1/0/0/4107a09dd93ef52169edd819029f3ac7.mp3*~data=user_id=0,application_id=42~hmac=ca4018b2d77c7207546a5eab41983e66d31cbf6666fb96de60f9628ab1a3a7dd', 'https://cdn-images.dzcdn.net/images/cover/f32ed89fa129b1da7e2b5bb6cdec6980/250x250-000000-80-0-0.jpg', -33.9249, 18.4241, 'Cape Town, South Africa', 'South Africa', 2),

('Gangnam Style', 'PSY', 'Psy 6 (Six Rules), Part 1', 2012, 'K-Pop', '60726278', 'https://cdnt-preview.dzcdn.net/api/1/1/3/a/0/0/3a0567e318e4ca3102cc6ab1579ec61b.mp3?hdnea=exp=1770332901~acl=/api/1/1/3/a/0/0/3a0567e318e4ca3102cc6ab1579ec61b.mp3*~data=user_id=0,application_id=42~hmac=e86c783f25df066a4b02bbaf07207f619a709623a9f2296b2e09dcb9f4f686fa', 'https://cdn-images.dzcdn.net/images/cover/45e4493fcc15997085491debddcf049e/250x250-000000-80-0-0.jpg', 37.5172, 127.0473, 'Gangnam, Seoul', 'South Korea', 2),

('La Vie en Rose', 'Edith Piaf', 'La Vie en Rose', 1947, 'Chanson', '73693857', 'https://cdnt-preview.dzcdn.net/api/1/1/7/2/4/0/7249692939df8e12b652cf45b640dbcd.mp3?hdnea=exp=1770332901~acl=/api/1/1/7/2/4/0/7249692939df8e12b652cf45b640dbcd.mp3*~data=user_id=0,application_id=42~hmac=d44618d2f893a36318c6d9923c2f275f7956fc78d975d703547f22b265925fab', 'https://cdn-images.dzcdn.net/images/cover/6e6dde2c332dcb75e76f302f19de636c/250x250-000000-80-0-0.jpg', 48.8566, 2.3522, 'Paris, France', 'France', 2),

('Hotel California', 'Eagles', 'Hotel California', 1976, 'Rock', '426703682', 'https://cdnt-preview.dzcdn.net/api/1/1/d/e/0/0/de0b52925103149e94a7123d0c0cb6c4.mp3?hdnea=exp=1770332901~acl=/api/1/1/d/e/0/0/de0b52925103149e94a7123d0c0cb6c4.mp3*~data=user_id=0,application_id=42~hmac=2b067804035a621d97b86e3fa42c5c72427e3595046c60dec71c96ef9a3fa025', 'https://cdn-images.dzcdn.net/images/cover/7a6c7b49cfdaf4ee233f66c3070d2f40/250x250-000000-80-0-0.jpg', 34.0522, -118.2437, 'Los Angeles, California', 'United States', 2),

('Despacito', 'Luis Fonsi ft. Daddy Yankee', 'Vida', 2017, 'Reggaeton', '623698142', 'https://cdnt-preview.dzcdn.net/api/1/1/c/6/8/0/c68396f0684b99d05f5b353fb3c4c888.mp3?hdnea=exp=1770332902~acl=/api/1/1/c/6/8/0/c68396f0684b99d05f5b353fb3c4c888.mp3*~data=user_id=0,application_id=42~hmac=802fa637918cb0d7b805bc06e76d0209881ebd3fcbf1147f38e8386424472895', 'https://cdn-images.dzcdn.net/images/cover/7985ef4ccd9e66af2fc3c18d629689aa/250x250-000000-80-0-0.jpg', 18.4655, -66.1057, 'San Juan, Puerto Rico', 'Puerto Rico', 2),

('Havana', 'Camila Cabello', 'Camila', 2017, 'Pop', '447098092', 'https://cdnt-preview.dzcdn.net/api/1/1/b/1/9/0/b19a0e36acb2526676f68f031023d66f.mp3?hdnea=exp=1770332902~acl=/api/1/1/b/1/9/0/b19a0e36acb2526676f68f031023d66f.mp3*~data=user_id=0,application_id=42~hmac=a99ccef14aaacebfc8069ca9d5e51f27cd5bea658e594e1e02ad86e164e83bdf', 'https://cdn-images.dzcdn.net/images/cover/824145a71e397185d8a1abe57842430c/250x250-000000-80-0-0.jpg', 23.1136, -82.3666, 'Havana, Cuba', 'Cuba', 1),

('Budapest', 'George Ezra', 'Wanted on Voyage', 2014, 'Folk Pop', '71220746', 'https://cdnt-preview.dzcdn.net/api/1/1/0/7/a/0/07abeb1936eaac500b89acf179f7dd9b.mp3?hdnea=exp=1770332902~acl=/api/1/1/0/7/a/0/07abeb1936eaac500b89acf179f7dd9b.mp3*~data=user_id=0,application_id=42~hmac=69ff774d992d2ec4e2040fb22df559dc7cabc960b105b6d2273f88e4352d9182', 'https://cdn-images.dzcdn.net/images/cover/8cb7398a61585a1b3ded2557b029e8a6/250x250-000000-80-0-0.jpg', 47.4979, 19.0402, 'Budapest, Hungary', 'Hungary', 1),

('Africa', 'Toto', 'Toto IV', 1982, 'Rock', '1079668', 'https://cdnt-preview.dzcdn.net/api/1/1/d/4/6/0/d46762f2025f13175f2fd2c062b46182.mp3?hdnea=exp=1770332903~acl=/api/1/1/d/4/6/0/d46762f2025f13175f2fd2c062b46182.mp3*~data=user_id=0,application_id=42~hmac=c23e463c4095f81a9157c05045d79172be6787e8b5ba827eb458c5184adda017', 'https://cdn-images.dzcdn.net/images/cover/153332e88a14255a8c3d5959a5a21882/250x250-000000-80-0-0.jpg', -1.2921, 36.8219, 'Nairobi, Kenya', 'Kenya', 3),

('Day-O (Banana Boat Song)', 'Harry Belafonte', 'Calypso', 1956, 'Calypso', '4000407', 'https://cdnt-preview.dzcdn.net/api/1/1/0/7/0/0/070f05ab85e80454167958475499800f.mp3?hdnea=exp=1770332903~acl=/api/1/1/0/7/0/0/070f05ab85e80454167958475499800f.mp3*~data=user_id=0,application_id=42~hmac=89d059e5ac52e71ed0cce704f86aa80320db5df5f9c257af045bc59bcde5a7d2', 'https://cdn-images.dzcdn.net/images/cover/6f30ecb222fa6c4e5a77df1b78ad8027/250x250-000000-80-0-0.jpg', 18.1096, -77.2975, 'Kingston, Jamaica', 'Jamaica', 2),

('Take Me Home, Country Roads', 'John Denver', 'Poems, Prayers & Promises', 1971, 'Country', '82697686', 'https://cdnt-preview.dzcdn.net/api/1/1/2/b/0/0/2b04e0f1797578b3521c03c6a43e722b.mp3?hdnea=exp=1770332904~acl=/api/1/1/2/b/0/0/2b04e0f1797578b3521c03c6a43e722b.mp3*~data=user_id=0,application_id=42~hmac=08b5427a42cd97a841ed16cbd0de7fc4d9ebf4a8d22f415e69b05e1639d1caf9', 'https://cdn-images.dzcdn.net/images/cover/31383f3d2c444ca382c19c1def301e95/250x250-000000-80-0-0.jpg', 38.3498, -81.6326, 'Charleston, West Virginia', 'United States', 2),

('Bella Ciao', 'Traditional Italian', 'Italian Folk Songs', 1943, 'Folk', '3220819551', 'https://cdnt-preview.dzcdn.net/api/1/1/0/f/3/0/0f3078cbca872f75b129c0bff3c9f0c5.mp3?hdnea=exp=1770332904~acl=/api/1/1/0/f/3/0/0f3078cbca872f75b129c0bff3c9f0c5.mp3*~data=user_id=0,application_id=42~hmac=e5bc1d2f2985abf869246817ebb632b4b3217e59b12994dab6971ba66490e7a2', 'https://cdn-images.dzcdn.net/images/cover/f5b61bcbd3a307b5fce4fbad4b1ab767/250x250-000000-80-0-0.jpg', 41.9028, 12.4964, 'Rome, Italy', 'Italy', 2),

('Waterloo', 'ABBA', 'Waterloo', 1974, 'Pop', '76376889', 'https://cdnt-preview.dzcdn.net/api/1/1/5/0/c/0/50c431836b0b7a99cb46b3e9755cfcdb.mp3?hdnea=exp=1770332904~acl=/api/1/1/5/0/c/0/50c431836b0b7a99cb46b3e9755cfcdb.mp3*~data=user_id=0,application_id=42~hmac=7458a7a67cfc14722142922f3d52b12ebdec5ef321b8cbdbf098faef37d012e6', 'https://cdn-images.dzcdn.net/images/cover/36133053035ca8f184eb469901965ac0/250x250-000000-80-0-0.jpg', 59.3293, 18.0686, 'Stockholm, Sweden', 'Sweden', 2),

('Cotton Eye Joe', 'Rednex', 'Sex & Violins', 1994, 'Eurodance', '419139102', 'https://cdnt-preview.dzcdn.net/api/1/1/0/0/e/0/00e18ff233c9df8bd93604a8a858e5a6.mp3?hdnea=exp=1770332905~acl=/api/1/1/0/0/e/0/00e18ff233c9df8bd93604a8a858e5a6.mp3*~data=user_id=0,application_id=42~hmac=e319a029a9221e1338f65285f6d8bc2cc7a510983c6f05a48a84fa4192f8e9fa', 'https://cdn-images.dzcdn.net/images/cover/090f699ce4d73c3a091c46df49d4a833/250x250-000000-80-0-0.jpg', 29.7604, -95.3698, 'Houston, Texas', 'United States', 3),

('Moskau', 'Dschinghis Khan', 'Dschinghis Khan', 1979, 'Disco', '470543912', 'https://cdnt-preview.dzcdn.net/api/1/1/8/7/1/0/8718720967b63101c7baa5935e0165f9.mp3?hdnea=exp=1770332905~acl=/api/1/1/8/7/1/0/8718720967b63101c7baa5935e0165f9.mp3*~data=user_id=0,application_id=42~hmac=6fd35371a74f3fe43bd7616d0f0b241b93659f7da7a35ccf5f2241cd140ff22b', 'https://cdn-images.dzcdn.net/images/cover/58e50ff71735b3ca889d25f8363d68dd/250x250-000000-80-0-0.jpg', 55.7558, 37.6173, 'Moscow, Russia', 'Russia', 1),

('Copacabana (At the Copa)', 'Barry Manilow', 'Even Now', 1978, 'Disco', '1076432', 'https://cdnt-preview.dzcdn.net/api/1/1/d/0/a/0/d0a139bb2e18d2283ee44aa41fb13608.mp3?hdnea=exp=1770332906~acl=/api/1/1/d/0/a/0/d0a139bb2e18d2283ee44aa41fb13608.mp3*~data=user_id=0,application_id=42~hmac=86cca7db595194cff74c4331c66757ed4beb7d748c79abe594d4232e55f0efbe', 'https://cdn-images.dzcdn.net/images/cover/4afdf9716c8c66096b13191f5f58867a/250x250-000000-80-0-0.jpg', -22.9714, -43.1823, 'Copacabana, Rio de Janeiro', 'Brazil', 2),

('Sweet Child O'' Mine', 'Guns N'' Roses', 'Appetite for Destruction', 1987, 'Rock', '518458172', 'https://cdnt-preview.dzcdn.net/api/1/1/5/9/1/0/59115eec88ea0bc7742eaba93facf49b.mp3?hdnea=exp=1770332906~acl=/api/1/1/5/9/1/0/59115eec88ea0bc7742eaba93facf49b.mp3*~data=user_id=0,application_id=42~hmac=1aae011cca3c1d2f5f9afe8ffcb650b8d5b4d06f9c33daf27a43d5972590f270', 'https://cdn-images.dzcdn.net/images/cover/8bfe7b3b0985d9ff0751090fb2b6f73f/250x250-000000-80-0-0.jpg', 34.0928, -118.3287, 'Hollywood, Los Angeles', 'United States', 3),

('Walk Like an Egyptian', 'The Bangles', 'Different Light', 1986, 'Pop Rock', '1056919', 'https://cdnt-preview.dzcdn.net/api/1/1/c/8/e/0/c8e6426c7a4553311cbee87cedc4b004.mp3?hdnea=exp=1770332906~acl=/api/1/1/c/8/e/0/c8e6426c7a4553311cbee87cedc4b004.mp3*~data=user_id=0,application_id=42~hmac=8d1113be796bc0982b77359412a45a9b73f1b4606e4757a146478a2c92456874', 'https://cdn-images.dzcdn.net/images/cover/3bdcbeeaa0df5998e003c25de3c271cc/250x250-000000-80-0-0.jpg', 30.0444, 31.2357, 'Cairo, Egypt', 'Egypt', 2);

-- Verify the data
SELECT COUNT(*) as song_count FROM songs;
