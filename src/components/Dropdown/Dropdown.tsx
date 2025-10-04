"use client";

import { RootState } from "@/store/store";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

interface FloatingSelectBoxProps {
  id?: string;
  label: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

const FloatingSelectBox: React.FC<FloatingSelectBoxProps> = ({
  id,
  label,
  value,
  options,
  onChange,
  className = "",
  disabled = false,
}) => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const [focused, setFocused] = useState(false);

  const selectId = id || label.replace(/\s+/g, "-").toLowerCase();
  const isDisabled = disabled && value.trim().length > 0;

  return (
    <div className="relative w-full">
      <div className="relative">
        <select
          id={selectId}
          value={value}
          disabled={isDisabled}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`
            peer w-full appearance-none rounded-md px-3 pb-2.5 sm:pb-3 pt-3.5 sm:pt-4 text-sm sm:text-base
            border transition-all duration-200 outline-none pr-10 cursor-pointer
            ${
              darkMode
                ? isDisabled
                  ? "bg-black text-gray-400 border-yellow-400 cursor-not-allowed"
                  : "bg-black text-white border-yellow-400"
                : isDisabled
                ? "bg-gray-50 text-gray-500 border-gray-800 cursor-not-allowed"
                : "bg-white text-black border-gray-800"
            }
            ${className}
          `}
          style={{
            maxHeight: "150px",
            overflowY: "auto",
          }}
        >
          <option value="" disabled hidden></option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Dropdown icon */}
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-sm
            ${darkMode ? "text-white" : "text-gray-700"}
          `}
        />

        {/* Clear button */}
        {value && !isDisabled && (
          <button
            type="button"
            onClick={() => onChange("")}
            className={`absolute right-10 top-1/2 transform -translate-y-2 text-sm cursor-pointer ${
              darkMode ? "text-yellow-400" : "text-gray-700"
            }`}
          >
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
        )}
      </div>

      <label
        htmlFor={selectId}
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

export default FloatingSelectBox;
