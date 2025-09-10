"use client";

import React from "react";

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
  return (
    <div>
      <label className="font-medium mb-2 block sm:text-base text-sm">
        {label}:{" "}
        {unit && (
          <span style={{ fontFamily: "Roboto, sans-serif" }}>{unit}</span>
        )}
        {value}+
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-yellow-400 cursor-pointer"
      />
    </div>
  );
};

export default Slider;
