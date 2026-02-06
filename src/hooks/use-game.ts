"use client";

import { useCallback } from "react";
import { useGameContext } from "@/contexts/game-context";
import type { Song } from "@/types/game";

export function useGame() {
  const { state, dispatch } = useGameContext();

  const startGame = useCallback(
    async (songs?: Song[]) => {
      if (songs) {
        dispatch({ type: "START_GAME", payload: songs });
        return;
      }

      // Fetch songs from API
      try {
        const response = await fetch("/api/songs?count=5");
        if (!response.ok) throw new Error("Failed to fetch songs");
        const { songs: fetchedSongs } = await response.json();
        dispatch({ type: "START_GAME", payload: fetchedSongs });
      } catch (error) {
        console.error("Failed to start game:", error);
        throw error;
      }
    },
    [dispatch]
  );

  const setGuess = useCallback(
    (latitude: number, longitude: number, year?: number) => {
      dispatch({ type: "SET_GUESS", payload: { latitude, longitude, year } });
    },
    [dispatch]
  );

  const setYearGuess = useCallback(
    (year: number) => {
      if (state.currentGuess) {
        dispatch({
          type: "SET_GUESS",
          payload: { ...state.currentGuess, year },
        });
      }
    },
    [state.currentGuess, dispatch]
  );

  const clearGuess = useCallback(() => {
    dispatch({ type: "CLEAR_GUESS" });
  }, [dispatch]);

  const submitGuess = useCallback(() => {
    if (state.currentGuess) {
      dispatch({ type: "SUBMIT_GUESS" });
    }
  }, [state.currentGuess, dispatch]);

  const nextRound = useCallback(() => {
    dispatch({ type: "NEXT_ROUND" });
  }, [dispatch]);

  const resetGame = useCallback(() => {
    dispatch({ type: "RESET_GAME" });
  }, [dispatch]);

  const currentSong = state.songs[state.currentRound - 1] || null;
  const lastResult = state.roundResults[state.roundResults.length - 1] || null;
  const isLastRound = state.currentRound >= state.totalRounds;

  return {
    // State
    ...state,
    currentSong,
    lastResult,
    isLastRound,

    // Actions
    startGame,
    setGuess,
    setYearGuess,
    clearGuess,
    submitGuess,
    nextRound,
    resetGame,
  };
}
