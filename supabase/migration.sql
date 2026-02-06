-- SoundMap Database Schema
-- Run this SQL in your Supabase SQL Editor: https://supabase.com/dashboard/project/YOUR_PROJECT/sql
-- Generated: 2026-02-06T10:16:16.495Z

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
('Empire State of Mind', 'JAY-Z ft. Alicia Keys', 'The Blueprint 3', 2009, 'Hip-Hop', '90533119', 'https://cdnt-preview.dzcdn.net/api/1/1/c/5/1/0/c514b21f84201fd6bbe384942125642a.mp3?hdnea=exp=1770373865~acl=/api/1/1/c/5/1/0/c514b21f84201fd6bbe384942125642a.mp3*~data=user_id=0,application_id=42~hmac=3202e4c919803fa655d0e6ba1a74c600551f4aa1aff7f6670ae643f97eba459b', 'https://cdn-images.dzcdn.net/images/cover/e0edb930ad843bb002c04956a81ce7de/250x250-000000-80-0-0.jpg', 40.7484, -73.9857, 'New York City, USA', 'United States', 1),

('London Calling', 'The Clash', 'London Calling', 1979, 'Punk Rock', '69924599', 'https://cdnt-preview.dzcdn.net/api/1/1/0/3/8/0/038710b50afa495e8339a056c32f9057.mp3?hdnea=exp=1770373865~acl=/api/1/1/0/3/8/0/038710b50afa495e8339a056c32f9057.mp3*~data=user_id=0,application_id=42~hmac=f144926cedeeb2ae506edc3fde28b2112bbb45c6ef8ac0583ddb44911e187d7d', 'https://cdn-images.dzcdn.net/images/cover/1dbb7d7bee08ed2b18deabffd675bd36/250x250-000000-80-0-0.jpg', 51.5074, -0.1278, 'London, UK', 'United Kingdom', 1),

('Viva Las Vegas', 'Elvis Presley', 'Viva Las Vegas (Soundtrack)', 1964, 'Rock and Roll', '78551866', 'https://cdnt-preview.dzcdn.net/api/1/1/8/1/8/0/8187d7472d4bc658897a8c12714c14a6.mp3?hdnea=exp=1770373866~acl=/api/1/1/8/1/8/0/8187d7472d4bc658897a8c12714c14a6.mp3*~data=user_id=0,application_id=42~hmac=004bc13b45bb289c5777f29499b3dc0956f8554984bf605bcefe526e95016600', 'https://cdn-images.dzcdn.net/images/cover/63a45fe89705b6f06b477354786a2a14/250x250-000000-80-0-0.jpg', 34.0522, -118.2437, 'Los Angeles, USA', 'United States', 2),

('Waka Waka (This Time for Africa)', 'Shakira', 'Listen Up! The Official 2010 FIFA World Cup Album', 2010, 'Pop', '68473089', 'https://cdnt-preview.dzcdn.net/api/1/1/4/1/0/0/4107a09dd93ef52169edd819029f3ac7.mp3?hdnea=exp=1770373866~acl=/api/1/1/4/1/0/0/4107a09dd93ef52169edd819029f3ac7.mp3*~data=user_id=0,application_id=42~hmac=4b90815af137af3979f78c67f2cb28e7abc8305302e6b86242b3eb72e6b40d71', 'https://cdn-images.dzcdn.net/images/cover/f32ed89fa129b1da7e2b5bb6cdec6980/250x250-000000-80-0-0.jpg', 10.9639, -74.7964, 'Barranquilla, Colombia', 'Colombia', 2),

('Gangnam Style', 'PSY', 'Psy 6 (Six Rules), Part 1', 2012, 'K-Pop', '60726278', 'https://cdnt-preview.dzcdn.net/api/1/1/3/a/0/0/3a0567e318e4ca3102cc6ab1579ec61b.mp3?hdnea=exp=1770373866~acl=/api/1/1/3/a/0/0/3a0567e318e4ca3102cc6ab1579ec61b.mp3*~data=user_id=0,application_id=42~hmac=ad7af6b1b791330ffea30bae3c463bda3b874dc8643898361bf15ebadd76ae4e', 'https://cdn-images.dzcdn.net/images/cover/45e4493fcc15997085491debddcf049e/250x250-000000-80-0-0.jpg', 37.5172, 127.0473, 'Seoul, South Korea', 'South Korea', 2),

('La Vie en Rose', 'Edith Piaf', 'La Vie en Rose', 1947, 'Chanson', '73693857', 'https://cdnt-preview.dzcdn.net/api/1/1/7/2/4/0/7249692939df8e12b652cf45b640dbcd.mp3?hdnea=exp=1770373867~acl=/api/1/1/7/2/4/0/7249692939df8e12b652cf45b640dbcd.mp3*~data=user_id=0,application_id=42~hmac=51843fdf184525ce376aa90453defa657c5bf4b11e2e2ae2fd2f10147bbdede6', 'https://cdn-images.dzcdn.net/images/cover/6e6dde2c332dcb75e76f302f19de636c/250x250-000000-80-0-0.jpg', 48.8566, 2.3522, 'Paris, France', 'France', 2),

('Hotel California', 'Eagles', 'Hotel California', 1976, 'Rock', '426703682', 'https://cdnt-preview.dzcdn.net/api/1/1/d/e/0/0/de0b52925103149e94a7123d0c0cb6c4.mp3?hdnea=exp=1770373867~acl=/api/1/1/d/e/0/0/de0b52925103149e94a7123d0c0cb6c4.mp3*~data=user_id=0,application_id=42~hmac=3e7a654c2528b8da640f7a26eb0adc6f2b23c9307954fd07c5cc30e0b20ce07c', 'https://cdn-images.dzcdn.net/images/cover/7a6c7b49cfdaf4ee233f66c3070d2f40/250x250-000000-80-0-0.jpg', 34.0522, -118.2437, 'Los Angeles, USA', 'United States', 2),

('Despacito', 'Luis Fonsi ft. Daddy Yankee', 'Vida', 2017, 'Reggaeton', '623698142', 'https://cdnt-preview.dzcdn.net/api/1/1/c/6/8/0/c68396f0684b99d05f5b353fb3c4c888.mp3?hdnea=exp=1770373867~acl=/api/1/1/c/6/8/0/c68396f0684b99d05f5b353fb3c4c888.mp3*~data=user_id=0,application_id=42~hmac=28570df926b923de05c5bbd4a8684b0184a843fe82c5f3c44880c2862dd28768', 'https://cdn-images.dzcdn.net/images/cover/7985ef4ccd9e66af2fc3c18d629689aa/250x250-000000-80-0-0.jpg', 18.4655, -66.1057, 'San Juan, Puerto Rico', 'Puerto Rico', 1),

('Havana', 'Camila Cabello', 'Camila', 2017, 'Pop', '447098092', 'https://cdnt-preview.dzcdn.net/api/1/1/b/1/9/0/b19a0e36acb2526676f68f031023d66f.mp3?hdnea=exp=1770373868~acl=/api/1/1/b/1/9/0/b19a0e36acb2526676f68f031023d66f.mp3*~data=user_id=0,application_id=42~hmac=263ca3e026a9235bf7dcb132678737749bb3033c714f7bbd556783096e506cc6', 'https://cdn-images.dzcdn.net/images/cover/824145a71e397185d8a1abe57842430c/250x250-000000-80-0-0.jpg', 25.7617, -80.1918, 'Miami, USA', 'United States', 2),

('Budapest', 'George Ezra', 'Wanted on Voyage', 2014, 'Folk Pop', '71220746', 'https://cdnt-preview.dzcdn.net/api/1/1/0/7/a/0/07abeb1936eaac500b89acf179f7dd9b.mp3?hdnea=exp=1770373868~acl=/api/1/1/0/7/a/0/07abeb1936eaac500b89acf179f7dd9b.mp3*~data=user_id=0,application_id=42~hmac=3d3552fc97d0773792ab076b7bb5a6e0bb6ee44744fe0f716948caa41a162d53', 'https://cdn-images.dzcdn.net/images/cover/8cb7398a61585a1b3ded2557b029e8a6/250x250-000000-80-0-0.jpg', 55.605, 13.0038, 'Malmö, Sweden', 'Sweden', 3),

('Africa', 'Toto', 'Toto IV', 1982, 'Rock', '1079668', 'https://cdnt-preview.dzcdn.net/api/1/1/d/4/6/0/d46762f2025f13175f2fd2c062b46182.mp3?hdnea=exp=1770373868~acl=/api/1/1/d/4/6/0/d46762f2025f13175f2fd2c062b46182.mp3*~data=user_id=0,application_id=42~hmac=8d59cc95f6a66c2bdd86b7f75a5a656e30f66dbdd33e87f414bffd5c6b6fb8e4', 'https://cdn-images.dzcdn.net/images/cover/153332e88a14255a8c3d5959a5a21882/250x250-000000-80-0-0.jpg', 34.0522, -118.2437, 'Los Angeles, USA', 'United States', 3),

('Day-O (Banana Boat Song)', 'Harry Belafonte', 'Calypso', 1956, 'Calypso', '4000407', 'https://cdnt-preview.dzcdn.net/api/1/1/0/7/0/0/070f05ab85e80454167958475499800f.mp3?hdnea=exp=1770373868~acl=/api/1/1/0/7/0/0/070f05ab85e80454167958475499800f.mp3*~data=user_id=0,application_id=42~hmac=c74e3498a8c1c9ecb9dfe6f5abbac58d0104790e29bfc6d59e0af78252f341c0', 'https://cdn-images.dzcdn.net/images/cover/6f30ecb222fa6c4e5a77df1b78ad8027/250x250-000000-80-0-0.jpg', 40.7484, -73.9857, 'New York City, USA', 'United States', 3),

('Take Me Home, Country Roads', 'John Denver', 'Poems, Prayers & Promises', 1971, 'Country', '82697686', 'https://cdnt-preview.dzcdn.net/api/1/1/2/b/0/0/2b04e0f1797578b3521c03c6a43e722b.mp3?hdnea=exp=1770373869~acl=/api/1/1/2/b/0/0/2b04e0f1797578b3521c03c6a43e722b.mp3*~data=user_id=0,application_id=42~hmac=f60a56ed8ff76d7e6e5fe271f4acf4c1fc905946593574faaecde1c9c75f3449', 'https://cdn-images.dzcdn.net/images/cover/31383f3d2c444ca382c19c1def301e95/250x250-000000-80-0-0.jpg', 40.7484, -73.9857, 'New York City, USA', 'United States', 3),

('Bella Ciao', 'Traditional Italian', 'Italian Folk Songs', 1943, 'Folk', '3220819551', 'https://cdnt-preview.dzcdn.net/api/1/1/0/f/3/0/0f3078cbca872f75b129c0bff3c9f0c5.mp3?hdnea=exp=1770373869~acl=/api/1/1/0/f/3/0/0f3078cbca872f75b129c0bff3c9f0c5.mp3*~data=user_id=0,application_id=42~hmac=9da76c394b71a4ed8fc1886e92d3698bffabba050615f0ab1ca6bf617a763dbf', 'https://cdn-images.dzcdn.net/images/cover/f5b61bcbd3a307b5fce4fbad4b1ab767/250x250-000000-80-0-0.jpg', 44.4949, 11.3426, 'Bologna, Italy', 'Italy', 2),

('Waterloo', 'ABBA', 'Waterloo', 1974, 'Pop', '76376889', 'https://cdnt-preview.dzcdn.net/api/1/1/5/0/c/0/50c431836b0b7a99cb46b3e9755cfcdb.mp3?hdnea=exp=1770373869~acl=/api/1/1/5/0/c/0/50c431836b0b7a99cb46b3e9755cfcdb.mp3*~data=user_id=0,application_id=42~hmac=83e2eaa81cf72f1055d4c10404e92bfd923b06395c8d23a97aca74066cdfbc67', 'https://cdn-images.dzcdn.net/images/cover/36133053035ca8f184eb469901965ac0/250x250-000000-80-0-0.jpg', 59.3293, 18.0686, 'Stockholm, Sweden', 'Sweden', 2),

('Cotton Eye Joe', 'Rednex', 'Sex & Violins', 1994, 'Eurodance', '419139102', 'https://cdnt-preview.dzcdn.net/api/1/1/0/0/e/0/00e18ff233c9df8bd93604a8a858e5a6.mp3?hdnea=exp=1770373870~acl=/api/1/1/0/0/e/0/00e18ff233c9df8bd93604a8a858e5a6.mp3*~data=user_id=0,application_id=42~hmac=6173b5c4b4c8e8a7e419d207e13e71e322ddd8d8eb6569c940a41d78518b62a6', 'https://cdn-images.dzcdn.net/images/cover/090f699ce4d73c3a091c46df49d4a833/250x250-000000-80-0-0.jpg', 59.3293, 18.0686, 'Stockholm, Sweden', 'Sweden', 3),

('Moskau', 'Dschinghis Khan', 'Dschinghis Khan', 1979, 'Disco', '470543912', 'https://cdnt-preview.dzcdn.net/api/1/1/8/7/1/0/8718720967b63101c7baa5935e0165f9.mp3?hdnea=exp=1770373870~acl=/api/1/1/8/7/1/0/8718720967b63101c7baa5935e0165f9.mp3*~data=user_id=0,application_id=42~hmac=aa61f4b88adf10e617329f2bc93fd1b87315820e2436bc204c636a61075d10c0', 'https://cdn-images.dzcdn.net/images/cover/58e50ff71735b3ca889d25f8363d68dd/250x250-000000-80-0-0.jpg', 48.1351, 11.582, 'Munich, Germany', 'Germany', 3),

('Copacabana (At the Copa)', 'Barry Manilow', 'Even Now', 1978, 'Disco', '1076432', 'https://cdnt-preview.dzcdn.net/api/1/1/d/0/a/0/d0a139bb2e18d2283ee44aa41fb13608.mp3?hdnea=exp=1770373870~acl=/api/1/1/d/0/a/0/d0a139bb2e18d2283ee44aa41fb13608.mp3*~data=user_id=0,application_id=42~hmac=d3bab3b90bb389a84b1e4a375608ce187c54a295abe45088b492914c22af0735', 'https://cdn-images.dzcdn.net/images/cover/4afdf9716c8c66096b13191f5f58867a/250x250-000000-80-0-0.jpg', 40.7484, -73.9857, 'New York City, USA', 'United States', 3),

('Sweet Child O'' Mine', 'Guns N'' Roses', 'Appetite for Destruction', 1987, 'Rock', '518458172', 'https://cdnt-preview.dzcdn.net/api/1/1/5/9/1/0/59115eec88ea0bc7742eaba93facf49b.mp3?hdnea=exp=1770373871~acl=/api/1/1/5/9/1/0/59115eec88ea0bc7742eaba93facf49b.mp3*~data=user_id=0,application_id=42~hmac=05f6a010840af730f3abf099ad699bf043da1285f990a131678093ea46b9e5d2', 'https://cdn-images.dzcdn.net/images/cover/8bfe7b3b0985d9ff0751090fb2b6f73f/250x250-000000-80-0-0.jpg', 34.0928, -118.3287, 'Hollywood, USA', 'United States', 2),

('Walk Like an Egyptian', 'The Bangles', 'Different Light', 1986, 'Pop Rock', '1056919', 'https://cdnt-preview.dzcdn.net/api/1/1/c/8/e/0/c8e6426c7a4553311cbee87cedc4b004.mp3?hdnea=exp=1770373871~acl=/api/1/1/c/8/e/0/c8e6426c7a4553311cbee87cedc4b004.mp3*~data=user_id=0,application_id=42~hmac=87ce14526849fc02bf6195cc22c7c95d1ede852cfc9082296a1a30d275a34834', 'https://cdn-images.dzcdn.net/images/cover/3bdcbeeaa0df5998e003c25de3c271cc/250x250-000000-80-0-0.jpg', 34.0522, -118.2437, 'Los Angeles, USA', 'United States', 3),

('Abusey Junction', 'Kokoroko', 'KOKOROKO', 2019, 'Afrobeat', '1302440762', 'https://cdnt-preview.dzcdn.net/api/1/1/c/7/4/0/c74b911098deba013e68421ad50fedfd.mp3?hdnea=exp=1770373871~acl=/api/1/1/c/7/4/0/c74b911098deba013e68421ad50fedfd.mp3*~data=user_id=0,application_id=42~hmac=bbf220eb41d8f71dc0e912ccf4e81e852d3dcf9488109e65389f2ac0fde34e39', 'https://cdn-images.dzcdn.net/images/cover/045509a76ee0485f1b07753651eb7d31/250x250-000000-80-0-0.jpg', 51.5074, -0.1278, 'London, UK', 'United Kingdom', 2),

('Bewilderment', 'Pale Jay', 'Bewilderment', 2023, 'Soul', '2330973645', 'https://cdnt-preview.dzcdn.net/api/1/1/e/7/8/0/e7826ecf66475da71f8062716161c6f9.mp3?hdnea=exp=1770373871~acl=/api/1/1/e/7/8/0/e7826ecf66475da71f8062716161c6f9.mp3*~data=user_id=0,application_id=42~hmac=af450dd8636c5e16f2e9d8eac17a356fd4e54138ffe04ad0ba6f15bc85eecb59', 'https://cdn-images.dzcdn.net/images/cover/b4999d1563e34e2aea661b7519d37ad0/250x250-000000-80-0-0.jpg', 34.0522, -118.2437, 'Los Angeles, USA', 'United States', 2),

('Dive', 'Olivia Dean', 'Messy', 2023, 'Soul Pop', '2202055697', 'https://cdnt-preview.dzcdn.net/api/1/1/d/3/1/0/d31f7db65e07947f94c56e58635b0fb4.mp3?hdnea=exp=1770373872~acl=/api/1/1/d/3/1/0/d31f7db65e07947f94c56e58635b0fb4.mp3*~data=user_id=0,application_id=42~hmac=8c4bfadca2a2f2710db77e53a362a833d5591b742b7b0d1933b350bd427ec8cc', 'https://cdn-images.dzcdn.net/images/cover/ea1ff0f64bdbfcf095aa8da57f8a1f75/250x250-000000-80-0-0.jpg', 51.5074, -0.1278, 'London, UK', 'United Kingdom', 2),

('Aotearoa', 'Stan Walker', 'Aotearoa', 2015, 'Pop', '80835642', 'https://cdnt-preview.dzcdn.net/api/1/1/5/0/4/0/5041170c70ae27aef256e44bcf021bf2.mp3?hdnea=exp=1770373872~acl=/api/1/1/5/0/4/0/5041170c70ae27aef256e44bcf021bf2.mp3*~data=user_id=0,application_id=42~hmac=ec2adfb6333df34487049fff19431551fd52ced35b4ad06c88fdc94e1cb31b33', 'https://cdn-images.dzcdn.net/images/cover/0987582d0115b8fab2501bd18c4f5171/250x250-000000-80-0-0.jpg', -36.8485, 174.7633, 'Auckland, New Zealand', 'New Zealand', 2),

('Supalonely', 'BENEE', 'STELLA & STEVE', 2019, 'Indie Pop', '802283032', 'https://cdnt-preview.dzcdn.net/api/1/1/1/f/d/0/1fd5e0ef6773f73f10eda134e644d682.mp3?hdnea=exp=1770373872~acl=/api/1/1/1/f/d/0/1fd5e0ef6773f73f10eda134e644d682.mp3*~data=user_id=0,application_id=42~hmac=5f6efd6451dcf2e0fa584b579800d6d863591666024475985609495784d7ca78', 'https://cdn-images.dzcdn.net/images/cover/efd70a16b2888a86b613d5c45c49e723/250x250-000000-80-0-0.jpg', -36.8485, 174.7633, 'Auckland, New Zealand', 'New Zealand', 2),

('Maria También', 'Khruangbin', 'Maria También', 2024, 'Psychedelic Soul', '2950589691', 'https://cdnt-preview.dzcdn.net/api/1/1/1/c/c/0/1ccef52c6c213cd7b8a2a5863bdd5056.mp3?hdnea=exp=1770373873~acl=/api/1/1/1/c/c/0/1ccef52c6c213cd7b8a2a5863bdd5056.mp3*~data=user_id=0,application_id=42~hmac=f8b93adf0583b8b8404c87b551352a637928d785ec1fe7330ce8fa7d24c61ceb', 'https://cdn-images.dzcdn.net/images/cover/5aa23a75cfeebf8389e16f80f879963b/250x250-000000-80-0-0.jpg', 29.7604, -95.3698, 'Houston, USA', 'United States', 2),

('Zombie', 'Fela Kuti', 'Zombie', 1977, 'Afrobeat', '59693491', 'https://cdnt-preview.dzcdn.net/api/1/1/a/8/a/0/a8a45caa825a97e724dd9eb48ac2846e.mp3?hdnea=exp=1770373873~acl=/api/1/1/a/8/a/0/a8a45caa825a97e724dd9eb48ac2846e.mp3*~data=user_id=0,application_id=42~hmac=6eb85bd319fe85d8e0fcfb70ab9aa025cbfcf8540857e003122bec80c2d62d15', 'https://cdn-images.dzcdn.net/images/cover/ad77ca4027c3ed3cce15baf63ceb7257/250x250-000000-80-0-0.jpg', 6.5244, 3.3792, 'Lagos, Nigeria', 'Nigeria', 2),

('Chan Chan', 'Buena Vista Social Club', 'Buena Vista Social Club', 1997, 'Son Cubano', '1459357802', 'https://cdnt-preview.dzcdn.net/api/1/1/b/8/2/0/b82781498763a16e2ac9fd581def0942.mp3?hdnea=exp=1770373873~acl=/api/1/1/b/8/2/0/b82781498763a16e2ac9fd581def0942.mp3*~data=user_id=0,application_id=42~hmac=c746f4b864c3b8f1841e224511b15f05735213880e5ef4e5a8c156af556f49a4', 'https://cdn-images.dzcdn.net/images/cover/e74bddbc8d4e47d308fb6defd5094220/250x250-000000-80-0-0.jpg', 23.1136, -82.3666, 'Havana, Cuba', 'Cuba', 1),

('Sastanàqqàm', 'Tinariwen', 'Elwan', 2017, 'Desert Blues', '141957681', 'https://cdnt-preview.dzcdn.net/api/1/1/7/3/7/0/737562653ae317d38dc2efd5618b189d.mp3?hdnea=exp=1770373873~acl=/api/1/1/7/3/7/0/737562653ae317d38dc2efd5618b189d.mp3*~data=user_id=0,application_id=42~hmac=cad5c58bf4c457a83dd0aeb5b21144390ebee38512e4b93930f71a5cc33424bd', 'https://cdn-images.dzcdn.net/images/cover/b52a67c5c120eae6d1c5bdd1e56411b4/250x250-000000-80-0-0.jpg', 18.4411, 1.4444, 'Kidal, Mali', 'Mali', 3),

('Hoppípolla', 'Sigur Rós', 'Takk...', 2005, 'Post-Rock', '3113981', 'https://cdnt-preview.dzcdn.net/api/1/1/8/0/3/0/8030e29e4b4efed36c2ce3a841d66e92.mp3?hdnea=exp=1770373874~acl=/api/1/1/8/0/3/0/8030e29e4b4efed36c2ce3a841d66e92.mp3*~data=user_id=0,application_id=42~hmac=e1c1c6daab63a569ceb37ca8b5cb9f53bb9b060278f50fdab9b0a79a39d6e5a5', 'https://cdn-images.dzcdn.net/images/cover/6510a3d00d6f4641bcde62b2f67d5fa4/250x250-000000-80-0-0.jpg', 64.1466, -21.9426, 'Reykjavik, Iceland', 'Iceland', 2),

('Bamboléo', 'Gipsy Kings', 'Gipsy Kings', 1987, 'Flamenco Pop', '958647812', 'https://cdnt-preview.dzcdn.net/api/1/1/7/5/9/0/75952492e1790a478c6e2b739e2d57dd.mp3?hdnea=exp=1770373874~acl=/api/1/1/7/5/9/0/75952492e1790a478c6e2b739e2d57dd.mp3*~data=user_id=0,application_id=42~hmac=a62d208f6ba7cd82ccac04edcca46fa43c9c846a3ffedc741a88981bb6091f5a', 'https://cdn-images.dzcdn.net/images/cover/3ddf556b723a26ff09664dc445c1f0c0/250x250-000000-80-0-0.jpg', 43.6767, 4.6278, 'Arles, France', 'France', 2),

('Beaux Dimanches', 'Amadou & Mariam', 'Dimanche à Bamako', 2004, 'Afro Pop', '515871052', 'https://cdnt-preview.dzcdn.net/api/1/1/d/1/3/0/d1376b653687fc5e6671f92b475e32c1.mp3?hdnea=exp=1770373874~acl=/api/1/1/d/1/3/0/d1376b653687fc5e6671f92b475e32c1.mp3*~data=user_id=0,application_id=42~hmac=63696257dc3ddaf5cb5ba9028b23fa8e39929fb9e85328d0100c96467b691dc3', 'https://cdn-images.dzcdn.net/images/cover/f6f28ee6268377f5f78b5e1ebf09b40a/250x250-000000-80-0-0.jpg', 12.6392, -8.0029, 'Bamako, Mali', 'Mali', 2),

('Envolver', 'Anitta', 'Envolver', 2022, 'Reggaeton', '1539306892', 'https://cdnt-preview.dzcdn.net/api/1/1/c/4/5/0/c45c3cffb5480b4eb437467d7f0a6198.mp3?hdnea=exp=1770373875~acl=/api/1/1/c/4/5/0/c45c3cffb5480b4eb437467d7f0a6198.mp3*~data=user_id=0,application_id=42~hmac=47eff4c85382e5bb8e1a0c706d2a6b16e13a29b46b4de53654ae3a93b2ba9943', 'https://cdn-images.dzcdn.net/images/cover/d4057cde2b30078608ff0b71c63f23e6/250x250-000000-80-0-0.jpg', -22.9068, -43.1729, 'Rio de Janeiro, Brazil', 'Brazil', 1),

('Tití Me Preguntó', 'Bad Bunny', 'Un Verano Sin Ti', 2022, 'Reggaeton', '1741494317', 'https://cdnt-preview.dzcdn.net/api/1/1/c/4/d/0/c4d8eeec871548b83abe5458fff10fc3.mp3?hdnea=exp=1770373875~acl=/api/1/1/c/4/d/0/c4d8eeec871548b83abe5458fff10fc3.mp3*~data=user_id=0,application_id=42~hmac=e78c99a09cf4b726ce3cb3d208c812a5a9090672cfa79797e480c736eedeab29', 'https://cdn-images.dzcdn.net/images/cover/b29d1070377b784384c2456093f96a66/250x250-000000-80-0-0.jpg', 18.4655, -66.1057, 'San Juan, Puerto Rico', 'Puerto Rico', 1),

('Papaoutai', 'Stromae', 'Racine Carrée', 2013, 'Electronic Pop', '69879250', 'https://cdnt-preview.dzcdn.net/api/1/1/f/d/8/0/fd8bf3488238a9931c3c122411657c3a.mp3?hdnea=exp=1770373875~acl=/api/1/1/f/d/8/0/fd8bf3488238a9931c3c122411657c3a.mp3*~data=user_id=0,application_id=42~hmac=9d0a2c52319d0445e35105c4cf389965fa78079372c2bf8e8e508ee5f7104131', 'https://cdn-images.dzcdn.net/images/cover/914db9146f330d0a2969d157872da5eb/250x250-000000-80-0-0.jpg', 50.8503, 4.3517, 'Brussels, Belgium', 'Belgium', 2),

('Sodade', 'Cesária Évora', 'Best Of', 1992, 'Morna', '558398', 'https://cdnt-preview.dzcdn.net/api/1/1/8/e/8/0/8e8d25524890a098422105fdc1ad71b5.mp3?hdnea=exp=1770373875~acl=/api/1/1/8/e/8/0/8e8d25524890a098422105fdc1ad71b5.mp3*~data=user_id=0,application_id=42~hmac=7e81383e2608f0c03fd5ef32ff0d84c95eeef0e0b5c82169c0fd6339217a8d2e', 'https://cdn-images.dzcdn.net/images/cover/0eb25006b1ee65770adaf0c55f558f36/250x250-000000-80-0-0.jpg', 16.89, -24.98, 'Mindelo, Cape Verde', 'Cape Verde', 3),

('7 Seconds', 'Youssou N''Dour ft. Neneh Cherry', 'The Guide (Wommat)', 1994, 'World Pop', '1015065', 'https://cdnt-preview.dzcdn.net/api/1/1/2/9/6/0/2963ee46511bf8a8962487f5bcaee863.mp3?hdnea=exp=1770373876~acl=/api/1/1/2/9/6/0/2963ee46511bf8a8962487f5bcaee863.mp3*~data=user_id=0,application_id=42~hmac=9313a19bb56475eeeabc3dc6be1ce2ec92f5adac0e15de938055482749fc7dfe', 'https://cdn-images.dzcdn.net/images/cover/91c012b0428759c3851245691d458431/250x250-000000-80-0-0.jpg', 14.7167, -17.4677, 'Dakar, Senegal', 'Senegal', 2);

-- Verify the data
SELECT COUNT(*) as song_count FROM songs;
