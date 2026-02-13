"use client";

import { motion } from "framer-motion";
import { Play, Disc3, MapPin, Calendar, Trophy, Headphones, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-pearl overflow-hidden">
      {/* Subtle topographic background pattern */}
      <div className="fixed inset-0 opacity-[0.04]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="topo" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#232946" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="30" fill="none" stroke="#232946" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="20" fill="none" stroke="#232946" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="10" fill="none" stroke="#232946" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#topo)" />
        </svg>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="container mx-auto px-6 pt-12 pb-8 lg:pt-20 lg:pb-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left: Text content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block text-navy/50 text-sm font-mono tracking-widest uppercase mb-4">
                  Music Geography Game
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-black text-navy mb-6 tracking-tight"
              >
                Sound<span className="text-lavender">Map</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg sm:text-xl text-navy/60 mb-8 max-w-md mx-auto lg:mx-0"
              >
                Listen to songs from around the world.
                Drop a pin where you think they&apos;re from.
                How well do you know global music?
              </motion.p>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Link href="/play">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      size="lg"
                      className="w-full sm:w-auto px-8 py-6 text-lg font-bold rounded-full bg-pistachio hover:bg-pistachio/90 text-navy"
                    >
                      <Play className="mr-2 h-5 w-5" />
                      Play Now
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
            </div>

            {/* Right: Vinyl record visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative order-1 lg:order-2 flex justify-center"
            >
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                {/* Spinning record */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0"
                >
                  {/* Outer ring */}
                  <div className="absolute inset-0 rounded-full bg-navy border-4 border-navy/80" />

                  {/* Record grooves */}
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute rounded-full border border-white/10"
                      style={{
                        inset: `${12 + i * 5}%`,
                      }}
                    />
                  ))}

                  {/* Center label */}
                  <div className="absolute inset-[30%] rounded-full bg-peach flex items-center justify-center">
                    <div className="text-center">
                      <Disc3 className="h-8 w-8 mx-auto text-navy mb-1" />
                      <span className="text-[10px] font-bold text-navy tracking-wider">SOUNDMAP</span>
                    </div>
                  </div>

                  {/* Center hole */}
                  <div className="absolute inset-[46%] rounded-full bg-pearl" />
                </motion.div>

                {/* Static overlay - map pin */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-lavender rounded-2xl flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-navy" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* How it works */}
        <div className="border-t border-navy/10">
          <div className="container mx-auto px-6 py-12 lg:py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h2 className="text-center text-navy/40 text-sm font-mono tracking-widest uppercase mb-10">
                How It Works
              </h2>

              <div className="grid sm:grid-cols-3 gap-8 lg:gap-12 max-w-4xl mx-auto">
                {[
                  {
                    step: "01",
                    title: "Listen",
                    description: "Hear a 30-second preview from somewhere on Earth",
                    color: "bg-lavender",
                    Icon: Headphones,
                  },
                  {
                    step: "02",
                    title: "Pin It",
                    description: "Drop your guess anywhere on the world map",
                    color: "bg-pistachio",
                    Icon: Globe,
                  },
                  {
                    step: "03",
                    title: "Score",
                    description: "Earn up to 5,000 points based on accuracy",
                    color: "bg-peach",
                    Icon: Trophy,
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className={`inline-flex items-center justify-center w-16 h-16 ${item.color} rounded-2xl mb-4`}>
                      <item.Icon className="h-7 w-7 text-navy" />
                    </div>
                    <div className="text-navy/30 text-xs font-mono mb-2">{item.step}</div>
                    <h3 className="text-navy font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-navy/50 text-sm">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bonus section */}
        <div className="border-t border-navy/10 bg-white/50">
          <div className="container mx-auto px-6 py-12 lg:py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="max-w-2xl mx-auto"
            >
              <div className="grid sm:grid-cols-2 gap-6">
                {/* Year bonus card */}
                <div className="bg-white border border-navy/10 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-peach/40 rounded-xl flex items-center justify-center shrink-0">
                      <Calendar className="h-6 w-6 text-navy" />
                    </div>
                    <div>
                      <h3 className="text-navy font-bold mb-1">Year Bonus</h3>
                      <p className="text-navy/50 text-sm">
                        Guess when the song was released for up to 1,000 extra points
                      </p>
                    </div>
                  </div>
                </div>

                {/* Rounds card */}
                <div className="bg-white border border-navy/10 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-lavender/40 rounded-xl flex items-center justify-center shrink-0">
                      <Trophy className="h-6 w-6 text-navy" />
                    </div>
                    <div>
                      <h3 className="text-navy font-bold mb-1">5 Rounds</h3>
                      <p className="text-navy/50 text-sm">
                        Journey across 5 different locations. Max score: 30,000 points
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-navy/10">
          <div className="container mx-auto px-6 py-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-navy/30 text-sm">
              <span className="font-mono">SoundMap</span>
              <span>Music from around the world</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
