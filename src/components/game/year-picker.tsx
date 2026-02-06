"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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
  const [inputValue, setInputValue] = useState(value?.toString() ?? "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    // Allow empty or partial input while typing
    if (val === "" || /^\d{0,4}$/.test(val)) {
      setInputValue(val);

      const year = parseInt(val, 10);
      if (!isNaN(year) && year >= MIN_YEAR && year <= MAX_YEAR) {
        onChange(year);
      }
    }
  };

  const handleBlur = () => {
    const year = parseInt(inputValue, 10);
    if (isNaN(year) || year < MIN_YEAR) {
      setInputValue("");
    } else if (year > MAX_YEAR) {
      setInputValue(MAX_YEAR.toString());
      onChange(MAX_YEAR);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "p-4 bg-white rounded-2xl shadow-sm",
        className
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-navy">Guess the year</span>
        <span className="text-sm text-muted-foreground">+1000 pts bonus</span>
      </div>

      <div className="flex justify-center">
        <input
          type="number"
          inputMode="numeric"
          placeholder="e.g. 1985"
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          min={MIN_YEAR}
          max={MAX_YEAR}
          className="w-32 h-12 text-center text-2xl font-bold text-navy tabular-nums rounded-xl border-2 border-lavender/50 focus:border-lavender focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      <p className="text-xs text-muted-foreground text-center mt-2">
        {MIN_YEAR} - {MAX_YEAR}
      </p>
    </motion.div>
  );
}
