"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

// Dynamically import the map component with SSR disabled
export const DynamicGameMap = dynamic(
  () => import("./game-map").then((mod) => mod.GameMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full bg-muted rounded-3xl flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span>Loading map...</span>
        </div>
      </div>
    ),
  }
);
