import { NextResponse } from "next/server";
import seedSongs from "@/data/seed-songs.json";
import type { Song } from "@/types/game";

// Fisher-Yates shuffle
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const count = parseInt(searchParams.get("count") || "5", 10);

  try {
    const songs = seedSongs as Song[];

    if (songs.length < count) {
      return NextResponse.json(
        { error: "Not enough songs available" },
        { status: 404 }
      );
    }

    const randomSongs = shuffleArray(songs).slice(0, count);
    return NextResponse.json({ songs: randomSongs, source: "local" });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
