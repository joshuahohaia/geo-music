"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
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
  const isEmpty = inputValue === "";

  // Reset input when value prop changes (e.g., new round)
  useEffect(() => {
    setInputValue(value?.toString() ?? "");
  }, [value]);

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
        "p-2 sm:p-3 md:p-4 bg-white rounded-xl lg:rounded-2xl",
        // Subtle highlight when empty to draw attention
        isEmpty && !disabled && "ring-2 ring-lavender/30",
        className
      )}
    >
      <div className="flex items-center justify-center gap-1 sm:gap-2 mb-2 sm:mb-3">
        <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-lavender" />
        <span className="text-xs sm:text-sm font-medium text-navy">Bonus: Guess Year</span>
      </div>

      <div className="flex justify-center">
        <motion.input
          type="number"
          inputMode="numeric"
          placeholder="????"
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          min={MIN_YEAR}
          max={MAX_YEAR}
          animate={isEmpty && !disabled ? {
            borderColor: ["rgba(180, 188, 232, 0.5)", "rgba(180, 188, 232, 1)", "rgba(180, 188, 232, 0.5)"]
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-full max-w-[120px] h-10 sm:h-12 text-center text-lg sm:text-2xl font-bold text-navy tabular-nums rounded-lg sm:rounded-xl border-2 border-lavender/50 focus:border-lavender focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      {isEmpty && !disabled && (
        <p className="text-[10px] sm:text-xs text-pistachio text-center mt-1 sm:mt-2 font-medium">
          +1000 pts if correct!
        </p>
      )}
    </motion.div>
  );
}
