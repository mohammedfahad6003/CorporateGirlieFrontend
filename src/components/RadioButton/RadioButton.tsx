"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface RadioButtonProps {
  label: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  name,
  value,
  checked,
  onChange,
}) => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  return (
    <label
      className={`flex items-center gap-2 cursor-pointer text-sm sm:text-base ${
        darkMode ? "text-white" : "text-gray-800"
      }`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="w-4 h-4 accent-yellow-400"
      />
      {label}
    </label>
  );
};

export default RadioButton;
