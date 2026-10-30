export type GameViewState = "loading" | "error" | "finished" | "game";

/**
 * Decide which top-level view the play page shows.
 *
 * Error takes precedence over the idle/loading spinner: when the initial
 * song fetch fails, the game status can remain "idle" forever, and checking
 * loading first would hide the error screen (and its retry) behind a spinner.
 */
export function resolveGameView(
  status: string,
  error: string | null
): GameViewState {
  if (error) return "error";
  if (status === "idle" || status === "loading") return "loading";
  if (status === "finished") return "finished";
  return "game";
}
