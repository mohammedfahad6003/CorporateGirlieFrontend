"use client";

import { RootState } from "@/store/store";
import React, { useState, useRef, useEffect } from "react";
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
  const [open, setOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6); // first 6 options
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectId = id || label.replace(/\s+/g, "-").toLowerCase();
  const isDisabled = disabled && value.trim().length > 0;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      setVisibleCount((prev) => Math.min(prev + 6, options.length));
    }
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Input Box */}
      <div
        className={`relative border rounded-md px-3 pb-2.5 sm:pb-3 pt-3.5 sm:pt-4 h-[45px] sm:h-[54px] cursor-pointer 
          ${
            darkMode
              ? isDisabled
                ? "bg-black text-gray-400 border-yellow-400 cursor-not-allowed"
                : "bg-black text-white border-yellow-400"
              : isDisabled
              ? "bg-gray-50 text-gray-500 border-gray-800 cursor-not-allowed"
              : "bg-white text-black border-gray-800"
          } ${className}`}
        onClick={() => !isDisabled && setOpen((prev) => !prev)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        <span className="text-sm sm:text-base select-none">
          {value ? options.find((opt) => opt.value === value)?.label || "" : ""}
        </span>

        {/* Clear button */}
        {value && !isDisabled && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onChange("");
            }}
            className={`absolute right-8 top-1/2 transform -translate-y-1/2 text-sm cursor-pointer ${
              darkMode ? "text-yellow-400" : "text-gray-700"
            }`}
          >
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
        )}

        {/* Dropdown icon */}
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-sm ${
            darkMode ? "text-white" : "text-gray-700"
          }`}
        />
      </div>

      {/* Label */}
      <label
        htmlFor={selectId}
        className={`absolute left-2.5 transition-all duration-200 pointer-events-none select-none
          ${darkMode ? "text-gray-400 bg-black" : "text-gray-500 bg-white"}
          ${
            focused && value
              ? `-top-2 sm:-top-2.5 text-xs sm:text-sm px-1 ${
                  darkMode ? "text-white" : "text-black"
                }`
              : "top-3 sm:top-4 text-sm sm:text-base"
          }`}
      >
        {label}
      </label>

      {/* Custom Dropdown */}
      {open && (
        <div
          onScroll={handleScroll}
          className={`absolute z-10 mt-1 w-full max-h-48 overflow-y-auto border rounded-md shadow-lg
            ${
              darkMode
                ? "bg-black text-white border-yellow-400"
                : "bg-white text-black border-gray-800"
            }`}
        >
          {options.slice(0, visibleCount).map((opt) => (
            <div
              key={opt.value}
              className={`px-3 py-2 cursor-pointer ${
                darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
              }`}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </div>
          ))}

          {visibleCount < options.length && (
            <div className="px-3 py-2 text-center text-sm text-gray-500">
              Scroll to load more...
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FloatingSelectBox;
