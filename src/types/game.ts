export interface Song {
  id: string;
  title: string;
  artist: string;
  album?: string;
  year?: number;
  genre?: string;
  deezer_id?: string;
  preview_url: string;
  cover_url?: string;
  latitude: number;
  longitude: number;
  location_name?: string;
  country?: string;
  difficulty?: number;
}

export interface Guess {
  latitude: number;
  longitude: number;
  year?: number;
}

export interface RoundResult {
  song: Song;
  guess: Guess;
  distance: number; // in kilometers
  score: number; // 0-5000 for location
  yearScore: number; // 0-1000 bonus for year
  totalScore: number; // combined score
}

export type GameStatus =
  | "idle"
  | "loading"
  | "playing"
  | "guessing"
  | "revealing"
  | "finished";

export interface GameState {
  status: GameStatus;
  currentRound: number; // 1-based
  totalRounds: number;
  songs: Song[];
  currentGuess: Guess | null;
  roundResults: RoundResult[];
  totalScore: number;
}

export type GameAction =
  | { type: "START_GAME"; payload: Song[] }
  | { type: "SET_GUESS"; payload: Guess }
  | { type: "CLEAR_GUESS" }
  | { type: "SUBMIT_GUESS" }
  | { type: "NEXT_ROUND" }
  | { type: "FINISH_GAME" }
  | { type: "RESET_GAME" };
