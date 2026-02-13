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
          "flex-shrink-0 border-r border-navy/10",
          "h-full overflow-y-auto",
          "bg-pearl w-[120px] sm:w-[160px] md:w-[220px] lg:w-[280px]"
        )}
      >
        <div className="p-2 sm:p-3 md:p-4 h-full flex flex-col">{leftPanel}</div>
      </div>

      {/* Right Panel - Map */}
      <div className="flex-1 h-full relative">{rightPanel}</div>
    </div>
  );
}
