// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useAudio } from "./use-audio";

type Listener = () => void;

class FakeAudio {
  static instances: FakeAudio[] = [];

  src = "";
  currentTime = 0;
  duration = 0;
  volume = 1;
  readyState = 0;

  private listeners = new Map<string, Set<Listener>>();

  constructor(src: string) {
    this.src = src;
    FakeAudio.instances.push(this);
  }

  addEventListener(type: string, cb: Listener) {
    if (!this.listeners.has(type)) this.listeners.set(type, new Set());
    this.listeners.get(type)!.add(cb);
  }

  removeEventListener(type: string, cb: Listener) {
    this.listeners.get(type)?.delete(cb);
  }

  play() {
    return Promise.resolve();
  }

  pause() {}

  emit(type: string) {
    this.listeners.get(type)?.forEach((cb) => cb());
  }
}

describe("useAudio", () => {
  beforeEach(() => {
    FakeAudio.instances = [];
    (globalThis as unknown as { Audio: typeof FakeAudio }).Audio = FakeAudio;
  });

  it("stops loading and surfaces the error when the audio fails to load", () => {
    // Regression: the error handler used to leave isLoading=true, so the UI
    // showed a spinner forever and hid the error message.
    const { result } = renderHook(() => useAudio("https://example.com/song.mp3"));
    expect(result.current.isLoading).toBe(true);

    const audio = FakeAudio.instances[0];
    act(() => audio.emit("error"));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe("Failed to load audio");
  });

  it("clears a transient error when playback becomes possible", () => {
    const { result } = renderHook(() => useAudio("https://example.com/song.mp3"));
    const audio = FakeAudio.instances[0];

    act(() => audio.emit("error"));
    expect(result.current.error).not.toBeNull();

    act(() => audio.emit("canplay"));
    expect(result.current.error).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  it("marks loading complete when the audio can play", () => {
    const { result } = renderHook(() => useAudio("https://example.com/song.mp3"));
    const audio = FakeAudio.instances[0];

    act(() => audio.emit("canplay"));
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });
});
