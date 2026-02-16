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
      {/* Left Panel - Audio/Controls (compact, scrollable if needed) */}
      <div
        className={cn(
          "shrink-0 ",
          "h-full overflow-y-auto",
          "bg-pearl w-30 sm:w-40 md:w-55 lg:w-70"
        )}
      >
        <div className="p-2 sm:p-3 md:p-4 h-full flex flex-col">{leftPanel}</div>
      </div>

      {/* Right Panel - Map */}
      <div className="flex-1 h-full relative">{rightPanel}</div>
    </div>
  );
}
