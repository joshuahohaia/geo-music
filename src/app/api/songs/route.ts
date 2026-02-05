import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import seedSongs from "@/data/seed-songs.json";

// Fisher-Yates shuffle for fallback
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
  const useLocal = searchParams.get("local") === "true";

  try {
    // Try Supabase first (unless explicitly using local)
    if (!useLocal && process.env.NEXT_PUBLIC_SUPABASE_URL) {
      try {
        const supabase = await createClient();

        // Fetch random songs using PostgreSQL's random()
        const { data: songs, error } = await supabase
          .from("songs")
          .select("*")
          .eq("is_active", true)
          .limit(count * 3) // Fetch more to randomize
          .order("id"); // We'll shuffle in JS since random() can be slow

        if (!error && songs && songs.length >= count) {
          const randomSongs = shuffleArray(songs).slice(0, count);
          return NextResponse.json({ songs: randomSongs, source: "supabase" });
        }

        // If Supabase has no data, fall through to local
        console.log("Supabase empty or error, using local data:", error?.message);
      } catch (e) {
        console.log("Supabase connection failed, using local data");
      }
    }

    // Fallback to local seed data
    const songs = seedSongs as Array<{
      id: string;
      title: string;
      artist: string;
      album?: string;
      year?: number;
      genre?: string;
      preview_url: string;
      cover_url?: string;
      latitude: number;
      longitude: number;
      location_name?: string;
      country?: string;
      difficulty?: number;
    }>;

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
