"use client";

import { motion } from "framer-motion";
import { Disc3 } from "lucide-react";
import Link from "next/link";

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
    <header className="h-14 bg-white border-b border-navy/10 px-4 lg:px-6 flex items-center justify-between">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-peach flex items-center justify-center">
          <Disc3 className="h-4 w-4 text-navy" />
        </div>
        <span className="text-lg font-bold text-navy hidden sm:block">
          Sound<span className="text-lavender">Map</span>
        </span>
      </Link>

      {/* Round Indicator */}
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex gap-1">
          {Array.from({ length: totalRounds }).map((_, i) => (
            <motion.div
              key={i}
              className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${
                i < currentRound ? "bg-lavender" : "bg-navy/10"
              }`}
              initial={false}
              animate={{
                scale: i === currentRound - 1 ? 1.3 : 1,
              }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          ))}
        </div>
        <span className="text-xs sm:text-sm text-navy/50 font-mono">
          {currentRound}/{totalRounds}
        </span>
      </div>

      {/* Score */}
      <motion.div
        className="bg-pistachio px-3 py-1.5 sm:px-4 sm:py-2 rounded-full"
        key={totalScore}
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 0.3 }}
      >
        <span className="font-bold text-navy text-sm sm:text-base tabular-nums">
          {totalScore.toLocaleString()}
        </span>
      </motion.div>
    </header>
  );
}
