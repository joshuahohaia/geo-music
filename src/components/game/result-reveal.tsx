"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Trophy, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { RoundResult } from "@/types/game";
import { formatDistance, getScoreTier } from "@/lib/scoring";

interface ResultRevealProps {
  result: RoundResult;
  isLastRound: boolean;
  onNextRound: () => void;
  onFinish: () => void;
}

export function ResultReveal({
  result,
  isLastRound,
  onNextRound,
  onFinish,
}: ResultRevealProps) {
  const { tier, color, label } = getScoreTier(result.score);

  useEffect(() => {
    // Show toast notification for score
    const yearBonus = result.yearScore > 0 ? ` (+${result.yearScore} year bonus!)` : "";
    toast.success(`+${result.totalScore.toLocaleString()} points!${yearBonus}`, {
      description: label,
      duration: 3000,
    });
  }, [result.totalScore, result.yearScore, label]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute inset-x-0 bottom-0 z-[1000] p-4 lg:p-6"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-3xl p-6 max-w-md mx-auto"
      >
        {/* Song Info */}
        <div className="text-center mb-4">
          <h3 className="font-bold text-lg text-navy">{result.song.title}</h3>
          <p className="text-muted-foreground">{result.song.artist}</p>
          {result.song.location_name && (
            <div className="flex items-center justify-center gap-1 mt-2 text-sm">
              <MapPin className="h-4 w-4 text-pistachio" />
              <span className="text-navy">{result.song.location_name}</span>
            </div>
          )}
        </div>

        {/* Score Display */}
        <div className="text-center py-4 border-y border-border">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
          >
            <div className={`text-4xl font-bold ${color}`}>
              {result.totalScore.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground mt-1">points</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-3 space-y-2"
          >
            <span className={`text-lg font-semibold ${color}`}>{label}</span>

            {/* Score breakdown */}
            <div className="flex justify-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3 text-lavender" />
                <span className="text-muted-foreground">
                  {result.score.toLocaleString()} pts
                </span>
                <span className="text-xs text-muted-foreground">
                  ({formatDistance(result.distance)})
                </span>
              </div>
              {result.yearScore > 0 && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3 text-pistachio" />
                  <span className="text-pistachio font-medium">
                    +{result.yearScore} pts
                  </span>
                </div>
              )}
            </div>

            {/* Year guess feedback */}
            {result.guess.year && result.song.year && (
              <div className="text-xs text-muted-foreground">
                You guessed {result.guess.year}, it was {result.song.year}
                {result.guess.year === result.song.year && (
                  <span className="text-pistachio font-medium"> - Perfect!</span>
                )}
              </div>
            )}
          </motion.div>
        </div>

        {/* Action Button */}
        <div className="mt-4 flex justify-center">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              size="lg"
              onClick={isLastRound ? onFinish : onNextRound}
              className="rounded-full px-8 bg-lavender hover:bg-lavender/90 text-navy"
            >
              {isLastRound ? (
                <>
                  <Trophy className="mr-2 h-5 w-5" />
                  See Results
                </>
              ) : (
                <>
                  Next Round
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
