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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex flex-col gap-2 p-2 sm:p-3 bg-white rounded-xl lg:rounded-2xl",
        className
      )}
    >
      {/* Album Cover */}
      {coverUrl && (
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="aspect-square w-full max-w-[180px] mx-auto rounded-lg lg:rounded-xl overflow-hidden"
        >
          <img
            src={coverUrl}
            alt="Album cover"
            className="w-full h-full object-cover"
          />
        </motion.div>
      )}

      {/* Play/Pause Button */}
      <div className="flex justify-center">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            size="lg"
            onClick={toggle}
            disabled={disabled || isLoading || !!error}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-lavender hover:bg-lavender/90 text-navy"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5 ml-0.5" />
            )}
          </Button>
        </motion.div>
      </div>

      {/* Progress/Seek Bar - hidden on very small screens */}
      <div className="hidden sm:block space-y-0.5">
        <Slider
          value={[currentTime]}
          max={duration || 30}
          step={0.1}
          onValueChange={(v) => seek(v[0])}
          disabled={disabled || isLoading}
          className="w-full"
        />
        <div className="flex justify-between text-[10px] text-muted-foreground">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration || 30)}</span>
        </div>
      </div>

      {/* Error Message - only show after loading completes to avoid transient flashes */}
      {error && !isLoading && (
        <p className="text-center text-[10px] sm:text-xs text-destructive">{error}</p>
      )}

      {/* Volume Control - hidden on smaller screens */}
      <div className="hidden lg:flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleMuteToggle}
          className="h-8 w-8 text-navy hover:bg-lavender/20"
        >
          {isMuted || volume === 0 ? (
            <VolumeX className="h-4 w-4" />
          ) : (
            <Volume2 className="h-4 w-4" />
          )}
        </Button>
        <Slider
          value={[isMuted ? 0 : volume]}
          max={1}
          step={0.01}
          onValueChange={handleVolumeChange}
          className="w-20"
        />
      </div>
    </motion.div>
  );
}
