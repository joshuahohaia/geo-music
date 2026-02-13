"use client";

import { cn } from "@/lib/utils";

interface SplitPaneProps {
  leftPanel: React.ReactNode;
  rightPanel: React.ReactNode;
  className?: string;
}

export function SplitPane({ leftPanel, rightPanel, className }: SplitPaneProps) {
  return (
    <div
      className={cn(
        "flex flex-row h-[calc(100vh-3.5rem)] overflow-hidden",
        className
      )}
    >
      {/* Left Panel - Audio/Controls (always on left, narrower on mobile) */}
      <div
        className={cn(
          "flex-shrink-0 border-r border-navy/10",
          "h-full overflow-y-auto",
          "bg-pearl w-[140px] sm:w-[200px] md:w-[300px] lg:w-[400px]"
        )}
      >
        <div className="p-2 sm:p-4 lg:p-6 h-full flex flex-col">{leftPanel}</div>
      </div>

      {/* Right Panel - Map */}
      <div className="flex-1 h-full relative">{rightPanel}</div>
    </div>
  );
}
