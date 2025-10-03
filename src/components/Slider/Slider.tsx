"use client";

import React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

interface SliderProps {
  label: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  unit?: string; // e.g., "₹"
  onChange: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({
  label,
  min,
  max,
  step = 1,
  value,
  unit,
  onChange,
}) => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  return (
    <div className="flex flex-col gap-2">
      <label className="font-medium sm:text-base text-sm">
        {label}: {unit && <span className="font-sans">{unit}</span>}
        {value}
      </label>

      <SliderPrimitive.Root
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(val) => onChange(val[0])}
        className="relative flex items-center w-full h-5 select-none cursor-pointer"
      >
        {/* Track */}
        <SliderPrimitive.Track
          className={`relative flex-1 h-2 rounded-full overflow-hidden ${
            darkMode ? "bg-gray-800" : "bg-gray-300"
          }`}
        >
          {/* Filled Range */}
          <SliderPrimitive.Range
            className={`absolute h-full rounded-full transition-all duration-200 ease-out ${
              darkMode ? "bg-yellow-400" : "bg-yellow-500"
            }`}
          />
        </SliderPrimitive.Track>

        {/* Thumb */}
        <SliderPrimitive.Thumb
          className={`block w-5 h-5 rounded-full border-2 transition-all duration-200 ease-out
          ${
            darkMode
              ? "bg-black border-yellow-400"
              : "bg-white border-yellow-400"
          }
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 cursor-pointer`}
        />
      </SliderPrimitive.Root>
    </div>
  );
};

export default Slider;
