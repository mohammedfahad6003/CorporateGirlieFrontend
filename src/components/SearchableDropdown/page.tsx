"use client";

import { RootState } from "@/store/store";
import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

interface DropdownOption {
  id: number;
  label: string;
  value: string;
}

interface SearchableDropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

const placeholders = [
  " Enter Resin....",
  " Enter Painting....",
  " Enter Art & Crafts....",
  " Enter Decor....",
];

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  options,
  value,
  onChange,
  required = false,
}) => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);

  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [typedPlaceholder, setTypedPlaceholder] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!required || isFocused) return;

    const currentText = placeholders[placeholderIndex];
    const typingSpeed = isDeleting ? 80 : 120;

    const interval = setInterval(() => {
      setTypedPlaceholder((prev) => {
        if (!isDeleting) {
          const next = currentText.substring(0, prev.length + 1);
          if (next === currentText) {
            clearInterval(interval);
            setTimeout(() => setIsDeleting(true), 1500);
          }
          return next;
        } else {
          const next = currentText.substring(0, prev.length - 1);
          if (next === "") {
            clearInterval(interval);
            setIsDeleting(false);
            setPlaceholderIndex(
              (prevIndex) => (prevIndex + 1) % placeholders.length
            );
          }
          return next;
        }
      });
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [placeholderIndex, isDeleting, isFocused, required]);

  // close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClear = () => {
    setSearchTerm("");
    onChange("");
    setOpen(false);
  };

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="relative flex items-center" ref={dropdownRef}>
      {/* search icon inside input */}
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        className={`absolute left-3 text-sm sm:text-base ${
          darkMode ? "text-yellow-400" : "text-gray-500"
        }`}
      />

      <input
        type="text"
        value={
          open
            ? searchTerm 
            : selectedOption?.label || ""
        }
        placeholder={
          required && !isFocused && !value ? typedPlaceholder : "Search..."
        }
        onFocus={() => {
          setOpen(true);
          setIsFocused(true);
        }}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setOpen(true);
        }}
        className={`
          pl-10 pr-10 border-1 px-3 py-2 rounded-md outline-none w-full
          text-[14px] sm:text-[16px]
          transition-all duration-200 ease-in-out
          placeholder-gray-500 cursor-pointer
          ${
            darkMode
              ? "text-white border-yellow-400 placeholder-gray-300 hover:shadow-md hover:shadow-white/20 bg-black"
              : "text-gray-800 border-gray-800 placeholder-gray-500 hover:shadow-md hover:shadow-gray-400/40 bg-white"
          }
        `}
      />

      {/* cancel icon inside input */}
      {(searchTerm || value) && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 text-md sm:text-sm cursor-pointer"
        >
          <FontAwesomeIcon
            icon={faCircleXmark}
            className={darkMode ? "text-yellow-400" : "text-gray-600"}
          />
        </button>
      )}

      {open && (
        <ul
          className={`absolute top-full mt-1 max-h-40 w-full overflow-y-auto rounded-md shadow-lg custom-scrollbar z-50
          ${
            darkMode
              ? "bg-black text-white border border-yellow-400 dark"
              : "bg-white text-gray-800 border border-gray-300 light"
          }`}
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt) => (
              <li
                key={opt?.id}
                onClick={() => {
                  onChange(opt.value);
                  setSearchTerm("");
                  setOpen(false);
                }}
                className={`py-1.5 px-3 sm:py-2 cursor-pointer text-sm sm:text-base 
                  ${
                    darkMode
                      ? "hover:bg-yellow-400 hover:text-black"
                      : "hover:bg-yellow-400 hover:text-white"
                  } ${value === opt?.value ? "font-semibold" : ""}`}
              >
                {opt.label}
              </li>
            ))
          ) : (
            <li className="px-3 py-2 text-sm text-gray-400">No results</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchableDropdown;
