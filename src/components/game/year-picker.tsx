"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";

interface YearPickerProps {
  value?: number;
  onChange: (year: number) => void;
  disabled?: boolean;
  className?: string;
}

const MIN_YEAR = 1940;
const MAX_YEAR = new Date().getFullYear();

export function YearPicker({
  value,
  onChange,
  disabled,
  className,
}: YearPickerProps) {
  const isValid = value !== undefined;
  const displayYear = value ?? Math.round((MIN_YEAR + MAX_YEAR) / 2);
  const [inputValue, setInputValue] = useState(String(displayYear));
  const [isEditing, setIsEditing] = useState(false);

  const handleValueChange = (values: number[]) => {
    onChange(values[0]);
    setInputValue(String(values[0]));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const commitInputValue = () => {
    const parsed = parseInt(inputValue, 10);
    if (!isNaN(parsed)) {
      const clamped = Math.min(MAX_YEAR, Math.max(MIN_YEAR, parsed));
      onChange(clamped);
      setInputValue(String(clamped));
    } else {
      setInputValue(String(displayYear));
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      commitInputValue();
      (e.target as HTMLInputElement).blur();
    } else if (e.key === "Escape") {
      setInputValue(String(displayYear));
      setIsEditing(false);
      (e.target as HTMLInputElement).blur();
    }
  };

  const handleFocus = () => {
    setIsEditing(true);
    setInputValue(String(displayYear));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "p-2 sm:p-3 bg-white rounded-xl",
        className
      )}
    >
      <div className="flex items-center justify-center gap-1.5 mb-1.5 sm:mb-2">
        {isValid ? (
          <Check className="h-3 w-3 sm:h-4 sm:w-4 text-pistachio" />
        ) : (
          <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-peach" />
        )}
        <span className="text-[10px] sm:text-xs font-medium text-navy">
          {isValid ? "Year selected" : "Guess the release year"}
        </span>
      </div>

      <div className="flex items-center justify-center gap-4 px-2">
        <Slider
          value={[displayYear]}
          onValueChange={handleValueChange}
          min={MIN_YEAR}
          max={MAX_YEAR}
          step={1}
          disabled={disabled}
          className="w-full"
        />
        <input
          type="text"
          inputMode="numeric"
          value={isEditing ? inputValue : displayYear}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={commitInputValue}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className="text-lg sm:text-xl font-bold text-navy tabular-nums w-16 text-center bg-transparent border-b-2 border-transparent focus:border-lavender focus:outline-none"
        />
      </div>

      {!isValid && !disabled && (
        <p className="text-[9px] sm:text-[10px] text-peach text-center mt-1 font-medium">
          Slide to select a year
        </p>
      )}
      {isValid && !disabled && (
        <p className="text-[9px] sm:text-[10px] text-pistachio text-center mt-1 font-medium">
          +1000 if correct!
        </p>
      )}
    </motion.div>
  );
}
