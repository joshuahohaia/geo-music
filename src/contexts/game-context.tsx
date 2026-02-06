"use client";

import {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
} from "react";
import type { GameState, GameAction, RoundResult } from "@/types/game";
import { calculateDistance, calculateScore, calculateYearScore } from "@/lib/scoring";

const initialState: GameState = {
  status: "idle",
  currentRound: 1,
  totalRounds: 5,
  songs: [],
  currentGuess: null,
  roundResults: [],
  totalScore: 0,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "START_GAME":
      return {
        ...initialState,
        status: "playing",
        songs: action.payload,
        totalRounds: action.payload.length,
      };

    case "SET_GUESS":
      return {
        ...state,
        currentGuess: action.payload,
        status: "guessing",
      };

    case "CLEAR_GUESS":
      return {
        ...state,
        currentGuess: null,
        status: "playing",
      };

    case "SUBMIT_GUESS": {
      if (!state.currentGuess) return state;

      const currentSong = state.songs[state.currentRound - 1];
      const distance = calculateDistance(
        state.currentGuess.latitude,
        state.currentGuess.longitude,
        currentSong.latitude,
        currentSong.longitude
      );
      const score = calculateScore(distance);
      const yearScore = calculateYearScore(state.currentGuess.year, currentSong.year);
      const totalScore = score + yearScore;

      const result: RoundResult = {
        song: currentSong,
        guess: state.currentGuess,
        distance,
        score,
        yearScore,
        totalScore,
      };

      return {
        ...state,
        status: "revealing",
        roundResults: [...state.roundResults, result],
        totalScore: state.totalScore + totalScore,
        currentGuess: null,
      };
    }

    case "NEXT_ROUND": {
      const nextRound = state.currentRound + 1;
      if (nextRound > state.totalRounds) {
        return { ...state, status: "finished" };
      }
      return {
        ...state,
        status: "playing",
        currentRound: nextRound,
      };
    }

    case "FINISH_GAME":
      return { ...state, status: "finished" };

    case "RESET_GAME":
      return initialState;

    default:
      return state;
  }
}

interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within GameProvider");
  }
  return context;
}
