"use client";

import { useRef, useState, useEffect, useCallback } from "react";

interface AudioState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  isLoading: boolean;
  error: string | null;
}

interface UseAudioOptions {
  autoPlay?: boolean;
}

export function useAudio(src: string, options: UseAudioOptions = {}) {
  const { autoPlay = false } = options;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<AudioState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    // Stop and cleanup previous audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }

    // Reset state for new source
    setState({
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      isLoading: true,
      error: null,
    });

    let cancelled = false;

    const loadAudio = async () => {
      let audioUrl = src;

      // If src is our API endpoint, fetch the actual URL first
      if (src.startsWith("/api/preview")) {
        try {
          const response = await fetch(src);
          if (!response.ok) {
            throw new Error("Failed to fetch preview URL");
          }
          const data = await response.json();
          if (data.error) {
            throw new Error(data.error);
          }
          audioUrl = data.preview_url;
        } catch (err) {
          if (!cancelled) {
            setState((s) => ({
              ...s,
              isLoading: false,
              error: err instanceof Error ? err.message : "Failed to load audio",
            }));
          }
          return;
        }
      }

      if (cancelled) return;

      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      const handleLoadedMetadata = () => {
        setState((s) => ({
          ...s,
          duration: audio.duration,
          isLoading: false,
        }));
      };

      const handleTimeUpdate = () => {
        setState((s) => ({ ...s, currentTime: audio.currentTime }));
      };

      const handleEnded = () => {
        setState((s) => ({ ...s, isPlaying: false, currentTime: 0 }));
      };

      const handleError = () => {
        // Only set error if we haven't already loaded successfully
        if (audio.readyState < 2) {
          setState((s) => ({
            ...s,
            isLoading: false,
            error: "Failed to load audio",
          }));
        }
      };

      const handleCanPlay = () => {
        // Clear any error and mark as loaded
        setState((s) => ({ ...s, isLoading: false, error: null }));
        if (autoPlay) {
          audio.play().then(() => {
            setState((s) => ({ ...s, isPlaying: true }));
          }).catch(() => {
            // Autoplay blocked by browser
          });
        }
      };

      audio.addEventListener("loadedmetadata", handleLoadedMetadata);
      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("ended", handleEnded);
      audio.addEventListener("error", handleError);
      audio.addEventListener("canplay", handleCanPlay);
    };

    loadAudio();

    return () => {
      cancelled = true;
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, [src, autoPlay]);

  const play = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play();
      setState((s) => ({ ...s, isPlaying: true }));
    }
  }, []);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setState((s) => ({ ...s, isPlaying: false }));
    }
  }, []);

  const toggle = useCallback(() => {
    if (state.isPlaying) {
      pause();
    } else {
      play();
    }
  }, [state.isPlaying, play, pause]);

  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setState((s) => ({ ...s, currentTime: time }));
    }
  }, []);

  const setVolume = useCallback((volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, volume));
    }
  }, []);

  return {
    ...state,
    play,
    pause,
    toggle,
    seek,
    setVolume,
  };
}
