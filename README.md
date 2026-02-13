# SoundMap

A music geography guessing game where players listen to 30-second song previews and guess the location associated with each song on an interactive world map.

## How It Works

1. **Listen** - Hear a 30-second preview of a song from somewhere on Earth
2. **Pin It** - Drop your guess anywhere on the world map
3. **Score** - Earn up to 5,000 points based on how close you are to the actual location

### Scoring

- **Location** - Earn up to 5,000 points based on distance accuracy
- **Year** - Guess the release year for up to 1,000 bonus points (required each round)
- **5 Rounds** - Journey across 5 different locations with a maximum score of 30,000 points

## Tech Stack

- **Framework**: Next.js 16 (App Router) + TypeScript
- **Map**: Leaflet via react-leaflet
- **Styling**: Tailwind CSS + Shadcn/UI
- **Animations**: Framer Motion
- **Audio**: HTML5 Audio API + Deezer previews

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd geo-music

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to play.

### Environment Variables

No environment variables are required for basic functionality. Song data is loaded from local JSON files.

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── play/page.tsx         # Main game page
│   └── api/
│       ├── preview/route.ts  # Fetches fresh Deezer preview URLs
│       └── songs/route.ts    # Returns random songs
├── components/
│   ├── game/                 # Game-specific components
│   │   ├── audio-player.tsx  # Play/pause, progress, volume
│   │   ├── game-map.tsx      # Leaflet map with pin drop
│   │   ├── round-header.tsx  # Round indicator and score
│   │   ├── result-reveal.tsx # Score animation and feedback
│   │   ├── final-summary.tsx # End-game summary
│   │   └── year-picker.tsx   # Year bonus input
│   └── layout/
│       └── split-pane.tsx    # Side-by-side layout
├── contexts/
│   └── game-context.tsx      # Game state management
├── hooks/
│   ├── use-game.ts           # Game actions hook
│   └── use-audio.ts          # Audio playback hook
├── lib/
│   └── scoring.ts            # Haversine distance + score calculation
└── data/
    └── songs.json            # Curated song dataset
```

## Color Palette

| Role       | Name          | Hex       |
|------------|---------------|-----------|
| Background | Soft Pearl    | `#F7F9FB` |
| Primary    | Muted Lavender| `#B8C1EC` |
| Secondary  | Pale Pistachio| `#C3F0CA` |
| Accent     | Peach Sorbet  | `#FFD6BA` |
| Text       | Deep Navy     | `#232946` |

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Adding Songs

Songs are stored in `src/data/songs.json`. Each song entry requires:

```json
{
  "id": "unique-id",
  "title": "Song Title",
  "artist": "Artist Name",
  "year": 1991,
  "deezer_id": "12345678",
  "cover_url": "https://...",
  "latitude": 35.1495,
  "longitude": -90.0490,
  "location_name": "Memphis, Tennessee",
  "country": "United States"
}
```

The `deezer_id` is used to fetch fresh preview URLs on-demand, avoiding expiration issues.

## License

MIT
