"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Check } from "lucide-react";
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
  const isValid = !isEmpty && parseInt(inputValue, 10) >= MIN_YEAR && parseInt(inputValue, 10) <= MAX_YEAR;

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
        "p-2 sm:p-3 bg-white rounded-xl",
        isEmpty && !disabled && "ring-2 ring-peach/50",
        isValid && !disabled && "ring-2 ring-pistachio/50",
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
          {isValid ? "Year entered" : "Release year"}
        </span>
      </div>

      <div className="flex justify-center">
        <motion.input
          type="number"
          inputMode="numeric"
          placeholder="1990"
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          min={MIN_YEAR}
          max={MAX_YEAR}
          animate={isEmpty && !disabled ? {
            borderColor: ["rgba(255, 214, 186, 0.5)", "rgba(255, 214, 186, 1)", "rgba(255, 214, 186, 0.5)"]
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
          className={cn(
            "w-full max-w-[100px] h-10 sm:h-11 text-center text-lg sm:text-xl font-bold text-navy tabular-nums rounded-lg border-2 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed",
            isValid ? "border-pistachio/50 focus:border-pistachio" : "border-peach/50 focus:border-peach"
          )}
        />
      </div>

      {isEmpty && !disabled && (
        <p className="text-[9px] sm:text-[10px] text-peach text-center mt-1 font-medium">
          Required
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
