import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const trackId = request.nextUrl.searchParams.get("id");

  if (!trackId || !/^\d+$/.test(trackId)) {
    return NextResponse.json({ error: "Invalid track ID" }, { status: 400 });
  }

  try {
    // First, get the track data from Deezer to find the preview URL
    const trackResponse = await fetch(`https://api.deezer.com/track/${trackId}`);
    if (!trackResponse.ok) {
      return NextResponse.json(
        { error: "Failed to fetch from Deezer" },
        { status: trackResponse.status }
      );
    }

    const trackData = await trackResponse.json();
    if (trackData.error) {
      return NextResponse.json(
        { error: trackData.error.message || "Track not found on Deezer" },
        { status: 404 }
      );
    }

    if (!trackData.preview) {
      return NextResponse.json(
        { error: "No preview available for this track" },
        { status: 404 }
      );
    }

    // Now, fetch the actual mp3 audio file from the preview URL
    const audioResponse = await fetch(trackData.preview);

    if (!audioResponse.ok || !audioResponse.body) {
      return NextResponse.json(
        { error: "Failed to fetch audio stream from Deezer's servers" },
        { status: audioResponse.status }
      );
    }

    // Stream the audio back to the client
    const headers = new Headers({
      "Content-Type": audioResponse.headers.get("Content-Type") || "audio/mpeg",
      "Content-Length": audioResponse.headers.get("Content-Length") || "",
    });

    return new Response(audioResponse.body, { headers });

  } catch (error) {
    console.error("Error fetching preview:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

