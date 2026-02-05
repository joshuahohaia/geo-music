"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GuessButtonProps {
  hasGuess: boolean;
  onSubmit: () => void;
  disabled?: boolean;
}

export function GuessButton({ hasGuess, onSubmit, disabled }: GuessButtonProps) {
  return (
    <AnimatePresence>
      {hasGuess && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000]"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              onClick={onSubmit}
              disabled={disabled}
              className="px-8 py-6 text-lg font-bold rounded-full bg-pistachio hover:bg-pistachio/90 text-navy shadow-lg"
            >
              <MapPin className="mr-2 h-5 w-5" />
              SUBMIT GUESS
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
