"use client";

import { motion } from "framer-motion";
import { Music } from "lucide-react";

interface RoundHeaderProps {
  currentRound: number;
  totalRounds: number;
  totalScore: number;
}

export function RoundHeader({
  currentRound,
  totalRounds,
  totalScore,
}: RoundHeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-border px-4 lg:px-6 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-xl bg-lavender flex items-center justify-center">
          <Music className="h-5 w-5 text-navy" />
        </div>
        <span className="text-xl font-bold text-navy hidden sm:block">
          SoundMap
        </span>
      </div>

      {/* Round Indicator */}
      <div className="flex items-center gap-3">
        <div className="flex gap-1.5">
          {Array.from({ length: totalRounds }).map((_, i) => (
            <motion.div
              key={i}
              className={`w-3 h-3 rounded-full ${
                i < currentRound ? "bg-lavender" : "bg-muted"
              }`}
              initial={false}
              animate={{
                scale: i === currentRound - 1 ? 1.2 : 1,
              }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          ))}
        </div>
        <span className="text-sm text-muted-foreground">
          Round {currentRound}/{totalRounds}
        </span>
      </div>

      {/* Score */}
      <motion.div
        className="bg-pistachio px-4 py-2 rounded-full"
        key={totalScore}
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 0.3 }}
      >
        <span className="font-bold text-navy">
          {totalScore.toLocaleString()} pts
        </span>
      </motion.div>
    </header>
  );
}
