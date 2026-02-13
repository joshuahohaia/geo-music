import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const trackId = request.nextUrl.searchParams.get("id");

  if (!trackId || !/^\d+$/.test(trackId)) {
    return NextResponse.json({ error: "Invalid track ID" }, { status: 400 });
  }

  try {
    const response = await fetch(`https://api.deezer.com/track/${trackId}`);

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch from Deezer" },
        { status: response.status }
      );
    }

    const data = await response.json();

    if (data.error) {
      return NextResponse.json(
        { error: data.error.message || "Track not found" },
        { status: 404 }
      );
    }

    if (!data.preview) {
      return NextResponse.json(
        { error: "No preview available for this track" },
        { status: 404 }
      );
    }

    return NextResponse.json({ preview_url: data.preview });
  } catch (error) {
    console.error("Error fetching preview:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
