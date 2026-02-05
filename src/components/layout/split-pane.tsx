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
        "flex flex-col lg:flex-row h-[calc(100vh-4rem)] overflow-hidden",
        className
      )}
    >
      {/* Left Panel - Audio/Controls */}
      <div
        className={cn(
          "flex-shrink-0 border-b lg:border-b-0 lg:border-r border-border",
          "h-[45vh] lg:h-full overflow-y-auto",
          "bg-pearl lg:w-[400px]"
        )}
      >
        <div className="p-4 lg:p-6 h-full flex flex-col">{leftPanel}</div>
      </div>

      {/* Right Panel - Map */}
      <div className="flex-1 h-[55vh] lg:h-full relative">{rightPanel}</div>
    </div>
  );
}
