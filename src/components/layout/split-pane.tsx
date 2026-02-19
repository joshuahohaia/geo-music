"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SplitPaneProps {
  leftPanel: React.ReactNode;
  rightPanel: React.ReactNode;
  className?: string;
}

export function SplitPane({ leftPanel, rightPanel, className }: SplitPaneProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "flex flex-row h-[calc(100vh-3.5rem)] overflow-hidden",
        className
      )}
    >
      {/* Left Panel - Audio/Controls (compact, scrollable if needed) */}
      <div
        className={cn(
          "shrink-0 relative transition-all duration-300 ease-in-out",
          "h-full overflow-y-auto",
          "bg-pearl",
          isCollapsed ? "w-0" : "w-40 sm:w-48 md:w-55 lg:w-70"
        )}
      >
        <div className={cn(
          "p-2 sm:p-3 md:p-4 h-full flex flex-col transition-opacity duration-200",
          isCollapsed ? "opacity-0 pointer-events-none" : "opacity-100"
        )}>
          {leftPanel}
        </div>
      </div>

      {/* Collapse Toggle Button - visible on mobile/tablet */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={cn(
          "lg:hidden absolute z-20 top-1/2 -translate-y-1/2 transition-all duration-300",
          "bg-lavender hover:bg-lavender/90 text-white rounded-r-lg",
          "p-1.5 shadow-md",
          isCollapsed ? "left-0" : "left-40 sm:left-48 md:left-55"
        )}
        aria-label={isCollapsed ? "Show controls" : "Hide controls"}
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </button>

      {/* Right Panel - Map */}
      <div className="flex-1 h-full relative">{rightPanel}</div>
    </div>
  );
}
