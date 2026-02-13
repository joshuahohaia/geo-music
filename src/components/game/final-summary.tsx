"use client";

import { motion } from "framer-motion";
import { Trophy, RotateCcw, MapPin, Music, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { RoundResult } from "@/types/game";
import { formatDistance, getScoreTier, SCORING_CONFIG } from "@/lib/scoring";

interface FinalSummaryProps {
  results: RoundResult[];
  totalScore: number;
  onPlayAgain: () => void;
}

export function FinalSummary({
  results,
  totalScore,
  onPlayAgain,
}: FinalSummaryProps) {
  const maxLocationScore = results.length * SCORING_CONFIG.MAX_SCORE;
  const maxYearScore = results.length * SCORING_CONFIG.YEAR_MAX_SCORE;
  const maxPossibleScore = maxLocationScore + maxYearScore;
  const totalYearBonus = results.reduce((sum, r) => sum + r.yearScore, 0);
  const percentage = Math.round((totalScore / maxPossibleScore) * 100);

  const getOverallTier = () => {
    if (percentage >= 90) return "World Music Expert!";
    if (percentage >= 70) return "Great ear for global sounds!";
    if (percentage >= 50) return "Solid performance!";
    if (percentage >= 30) return "Keep exploring!";
    return "The world awaits!";
  };

  const overallLabel = getOverallTier();

  return (
    <div className="min-h-screen bg-pearl flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl"
      >
        <Card className="bg-white rounded-3xl overflow-hidden">
          {/* Header */}
          <div className="bg-lavender p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4"
            >
              <Trophy className="h-10 w-10 text-navy" />
            </motion.div>
            <h1 className="text-3xl font-bold text-navy mb-2">Game Complete!</h1>
            <p className="text-navy/70">{overallLabel}</p>
          </div>

          {/* Score */}
          <div className="p-8 text-center border-b border-navy/10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.4 }}
            >
              <div className="text-5xl font-bold text-navy">
                {totalScore.toLocaleString()}
              </div>
              <div className="text-muted-foreground mt-2">
                out of {maxPossibleScore.toLocaleString()} points ({percentage}%)
              </div>
              {totalYearBonus > 0 && (
                <div className="mt-2 inline-flex items-center gap-1 px-3 py-1 bg-pistachio/20 rounded-full text-sm">
                  <Calendar className="h-4 w-4 text-pistachio" />
                  <span className="text-navy font-medium">
                    +{totalYearBonus.toLocaleString()} year bonus
                  </span>
                </div>
              )}
            </motion.div>
          </div>

          {/* Round Breakdown */}
          <div className="p-6">
            <h2 className="font-semibold text-navy mb-4 flex items-center gap-2">
              <Music className="h-5 w-5" />
              Round Breakdown
            </h2>
            <div className="space-y-3">
              {results.map((result, index) => {
                const { color, label } = getScoreTier(result.score);
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-pearl rounded-2xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-lavender flex items-center justify-center text-sm font-bold text-navy">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium text-navy text-sm">
                          {result.song.title}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {result.song.artist}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-bold ${color}`}>
                        {result.totalScore.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center gap-2">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {formatDistance(result.distance)}
                        </span>
                        {result.yearScore > 0 && (
                          <span className="flex items-center gap-1 text-pistachio">
                            <Calendar className="h-3 w-3" />
                            +{result.yearScore}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Play Again Button */}
          <div className="p-6 pt-0">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                size="lg"
                onClick={onPlayAgain}
                className="w-full rounded-full bg-pistachio hover:bg-pistachio/90 text-navy font-bold"
              >
                <RotateCcw className="mr-2 h-5 w-5" />
                Play Again
              </Button>
            </motion.div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
