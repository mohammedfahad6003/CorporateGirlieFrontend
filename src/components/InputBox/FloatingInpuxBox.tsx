"use client";

import { RootState } from "@/store/store";
import React, { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";

interface FloatingInputBoxProps {
  id?: string;
  type?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
}

const FloatingInputBox: React.FC<FloatingInputBoxProps> = ({
  id,
  type,
  label,
  value,
  onChange,
  onKeyDown,
  className = "",
}) => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const [focused, setFocused] = useState(false);

  // fallback id if not provided
  const inputId = id || label.replace(/\s+/g, "-").toLowerCase();

  return (
    <div className="relative w-full">
      <input
        id={inputId}
        type={type ?? "text"}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
        onKeyDown={onKeyDown}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`
          peer w-full rounded-md px-3 pb-2.5 sm:pb-3 pt-3.5 sm:pt-4 text-sm sm:text-base
          border transition-all duration-200 outline-none
          ${
            darkMode
              ? "bg-black text-white border-yellow-400"
              : "bg-white text-black border-gray-800"
          }
          ${className}
        `}
      />
      <label
        htmlFor={inputId}
        className={`
          absolute left-2.5 sm:left-3 transition-all duration-200
          pointer-events-none select-none
          ${darkMode ? "text-gray-400 bg-black" : "text-gray-500 bg-white"}
          ${
            focused || value
              ? `-top-2 sm:-top-2.5 text-xs sm:text-sm px-1 ${
                  darkMode ? "text-white" : "text-black"
                }`
              : "top-3 sm:top-4 text-sm sm:text-base"
          }
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default FloatingInputBox;
