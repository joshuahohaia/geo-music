"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useAudio } from "@/hooks/use-audio";
import { cn } from "@/lib/utils";

interface AudioPlayerProps {
  src: string;
  coverUrl?: string;
  disabled?: boolean;
  className?: string;
  autoPlay?: boolean;
}

export function AudioPlayer({
  src,
  coverUrl,
  disabled,
  className,
  autoPlay = false,
}: AudioPlayerProps) {
  const { isPlaying, currentTime, duration, isLoading, error, toggle, seek, setVolume } =
    useAudio(src, { autoPlay });
  const [volume, setVolumeState] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolumeState(newVolume);
    setVolume(isMuted ? 0 : newVolume);
  };

  const handleMuteToggle = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    setVolume(newMuted ? 0 : volume);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex flex-row gap-4 p-4 bg-white rounded-3xl shadow-sm lg:flex-col lg:gap-6 lg:p-6",
        className
      )}
    >
      {/* Album Cover */}
      {coverUrl && (
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="aspect-square w-24 shrink-0 rounded-2xl overflow-hidden shadow-md lg:w-full lg:max-w-[280px] lg:mx-auto"
        >
          <img
            src={coverUrl}
            alt="Album cover"
            className="w-full h-full object-cover"
          />
        </motion.div>
      )}

      {/* Controls */}
      <div className="flex flex-col gap-3 flex-1 min-w-0 lg:gap-6">
        {/* Play button and progress row on mobile */}
        <div className="flex items-center gap-3 lg:flex-col lg:gap-6">
          {/* Play/Pause Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              onClick={toggle}
              disabled={disabled || isLoading || !!error}
              className="w-12 h-12 rounded-full bg-lavender hover:bg-lavender/90 text-navy shadow-md lg:w-16 lg:h-16"
            >
              {isLoading ? (
                <Loader2 className="h-6 w-6 animate-spin lg:h-8 lg:w-8" />
              ) : isPlaying ? (
                <Pause className="h-6 w-6 lg:h-8 lg:w-8" />
              ) : (
                <Play className="h-6 w-6 ml-0.5 lg:h-8 lg:w-8 lg:ml-1" />
              )}
            </Button>
          </motion.div>

          {/* Progress/Seek Bar */}
          <div className="flex-1 space-y-1 lg:w-full lg:space-y-2">
            <Slider
              value={[currentTime]}
              max={duration || 30}
              step={0.1}
              onValueChange={(v) => seek(v[0])}
              disabled={disabled || isLoading}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground lg:text-sm">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration || 30)}</span>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-center text-sm text-destructive">{error}</p>
        )}

        {/* Volume Control - hidden on mobile */}
        <div className="hidden lg:flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleMuteToggle}
            className="text-navy hover:bg-lavender/20"
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="h-5 w-5" />
            ) : (
              <Volume2 className="h-5 w-5" />
            )}
          </Button>
          <Slider
            value={[isMuted ? 0 : volume]}
            max={1}
            step={0.01}
            onValueChange={handleVolumeChange}
            className="w-24"
          />
        </div>
      </div>
    </motion.div>
  );
}
