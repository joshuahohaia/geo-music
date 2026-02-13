"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { GameProvider } from "@/contexts/game-context";
import { useGame } from "@/hooks/use-game";
import { RoundHeader } from "@/components/game/round-header";
import { AudioPlayer } from "@/components/game/audio-player";
import { DynamicGameMap } from "@/components/game/map-wrapper";
import { GuessButton } from "@/components/game/guess-button";
import { ResultReveal } from "@/components/game/result-reveal";
import { FinalSummary } from "@/components/game/final-summary";
import { YearPicker } from "@/components/game/year-picker";
import { SplitPane } from "@/components/layout/split-pane";

function GameContent() {
  const {
    status,
    currentRound,
    totalRounds,
    totalScore,
    currentSong,
    currentGuess,
    roundResults,
    lastResult,
    isLastRound,
    startGame,
    setGuess,
    setYearGuess,
    submitGuess,
    nextRound,
    resetGame,
  } = useGame();

  const [error, setError] = useState<string | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Start game on mount
  useEffect(() => {
    const initGame = async () => {
      try {
        await startGame();
      } catch (err) {
        setError("Failed to load songs. Please try again.");
      }
    };
    initGame();
  }, [startGame]);

  // Handle loading state
  if (status === "idle" || status === "loading") {
    return (
      <div className="min-h-screen bg-pearl flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <Loader2 className="h-12 w-12 animate-spin text-lavender" />
          <p className="text-muted-foreground">Loading game...</p>
        </motion.div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="min-h-screen bg-pearl flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="text-lavender underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  // Handle finished state
  if (status === "finished") {
    return (
      <FinalSummary
        results={roundResults}
        totalScore={totalScore}
        onPlayAgain={async () => {
          resetGame();
          await startGame();
        }}
      />
    );
  }

  const isRevealing = status === "revealing";
  const hasGuess = currentGuess !== null;

  return (
    <div className="h-screen flex flex-col bg-pearl">
      {/* Header */}
      <RoundHeader
        currentRound={currentRound}
        totalRounds={totalRounds}
        totalScore={totalScore}
      />

      {/* Game Area */}
      <SplitPane
        leftPanel={
          <div className="flex flex-col h-full">
            {/* Round Info - hidden on very small screens */}
            <div className="hidden sm:block mb-2 md:mb-4 text-center">
              <h2 className="text-sm md:text-lg font-semibold text-navy">
                Where is this music from?
              </h2>
              <p className="hidden md:block text-sm text-muted-foreground">
                Click on the map to place your guess
              </p>
            </div>

            {/* Audio Player */}
            {currentSong && (
              <div onClick={() => setHasInteracted(true)}>
                <AudioPlayer
                  src={
                    currentSong.deezer_id
                      ? `/api/preview?id=${currentSong.deezer_id}`
                      : currentSong.preview_url
                  }
                  coverUrl={currentSong.cover_url}
                  disabled={isRevealing}
                  autoPlay={hasInteracted && currentRound > 1}
                />
              </div>
            )}

            {/* Year Picker */}
            <YearPicker
              value={currentGuess?.year}
              onChange={setYearGuess}
              disabled={isRevealing}
              className="mt-2 sm:mt-3 md:mt-4"
            />
          </div>
        }
        rightPanel={
          <div className="relative h-full">
            <DynamicGameMap
              onLocationSelect={(lat, lng) => setGuess(lat, lng)}
              selectedLocation={
                isRevealing && lastResult
                  ? { lat: lastResult.guess.latitude, lng: lastResult.guess.longitude }
                  : currentGuess
                  ? { lat: currentGuess.latitude, lng: currentGuess.longitude }
                  : null
              }
              revealMode={isRevealing}
              actualLocation={
                isRevealing && lastResult
                  ? {
                      lat: lastResult.song.latitude,
                      lng: lastResult.song.longitude,
                    }
                  : undefined
              }
              disabled={isRevealing}
              resetKey={isRevealing ? undefined : currentRound}
            />

            {/* Guess Button */}
            {!isRevealing && (
              <GuessButton
                hasGuess={hasGuess}
                onSubmit={submitGuess}
                disabled={!hasGuess}
              />
            )}

            {/* Result Reveal */}
            {isRevealing && lastResult && (
              <ResultReveal
                result={lastResult}
                isLastRound={isLastRound}
                onNextRound={nextRound}
                onFinish={() => nextRound()} // Will trigger finished state
              />
            )}
          </div>
        }
      />
    </div>
  );
}

export default function PlayPage() {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
}
