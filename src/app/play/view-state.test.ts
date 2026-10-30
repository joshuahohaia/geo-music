import { describe, it, expect } from "vitest";
import { resolveGameView } from "./view-state";

describe("resolveGameView", () => {
  it("shows the error view when the initial fetch fails while status stays idle", () => {
    // Regression: the idle/loading branch used to render first, so a failed
    // startGame() left the spinner up and the error screen unreachable.
    expect(resolveGameView("idle", "Failed to load songs. Please try again.")).toBe("error");
  });

  it("shows the error view when a failure happens during loading", () => {
    expect(resolveGameView("loading", "boom")).toBe("error");
  });

  it("shows loading while idle with no error", () => {
    expect(resolveGameView("idle", null)).toBe("loading");
  });

  it("shows loading while loading with no error", () => {
    expect(resolveGameView("loading", null)).toBe("loading");
  });

  it("shows finished when the game is finished", () => {
    expect(resolveGameView("finished", null)).toBe("finished");
  });

  it("shows the game during play", () => {
    expect(resolveGameView("playing", null)).toBe("game");
    expect(resolveGameView("revealing", null)).toBe("game");
  });
});
