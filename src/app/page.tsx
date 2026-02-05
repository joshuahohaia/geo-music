"use client";

import { motion } from "framer-motion";
import { Music, MapPin, Play, Headphones, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-pearl">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="text-center max-w-3xl mx-auto">
          {/* Logo */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="inline-flex items-center justify-center w-24 h-24 bg-lavender rounded-3xl mb-8 shadow-lg"
          >
            <Music className="h-12 w-12 text-navy" />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl lg:text-6xl font-bold text-navy mb-4"
          >
            SoundMap
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-muted-foreground mb-8"
          >
            Listen to music. Guess the location. Challenge your geography!
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link href="/play">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="px-12 py-7 text-xl font-bold rounded-full bg-pistachio hover:bg-pistachio/90 text-navy shadow-lg"
                >
                  <Play className="mr-3 h-6 w-6" />
                  Start Game
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>

        {/* How to Play */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-20 max-w-4xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-navy text-center mb-8">
            How to Play
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Headphones,
                title: "Listen",
                description: "Hear a 30-second music preview",
                color: "bg-lavender",
              },
              {
                icon: Globe,
                title: "Guess",
                description: "Click on the map where you think the music is from",
                color: "bg-pistachio",
              },
              {
                icon: MapPin,
                title: "Score",
                description: "Get points based on how close you are!",
                color: "bg-peach",
              },
            ].map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <Card className="p-6 text-center bg-white rounded-3xl border-0 shadow-sm hover:shadow-md transition-shadow">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 ${step.color} rounded-2xl mb-4`}
                  >
                    <step.icon className="h-8 w-8 text-navy" />
                  </div>
                  <h3 className="font-bold text-navy text-lg mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {step.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-20 text-center text-sm text-muted-foreground"
        >
          <p>5 rounds per game | 5,000 points max per round</p>
        </motion.footer>
      </div>
    </div>
  );
}
