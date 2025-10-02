"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface CheckBoxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

const CheckBox: React.FC<CheckBoxProps> = ({
  label,
  checked,
  onChange,
  className = "",
}) => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  return (
    <label
      className={`select-none flex items-center gap-2 cursor-pointer text-sm sm:text-base ${
        darkMode ? "text-white" : "text-gray-800"
      } ${className}`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className={`cursor-pointer w-4 h-4 border rounded-sm appearance-none ${
          darkMode
            ? "checked:bg-yellow-400 checked:border-yellow-400 checked:before:text-black"
            : "checked:bg-gray-800 checked:border-gray-800 checked:before:text-white"
        } checked:before:content-['✔']  checked:before:text-xs checked:before:flex checked:before:items-center checked:before:justify-center`}
        style={{ WebkitAppearance: "none" }}
      />
      {label}
    </label>
  );
};

export default CheckBox;
