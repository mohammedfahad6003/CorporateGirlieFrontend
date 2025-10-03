"use client";

import React from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

interface RadioOption {
  label: string;
  value: string;
}

interface RadioGroupProps {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const RadioButton: React.FC<RadioGroupProps> = ({
  options,
  value,
  onChange,
  className = "",
}) => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  return (
    <RadioGroup.Root
      value={value}
      onValueChange={onChange}
      className={`flex flex-col gap-4 ${className}`}
    >
      {options.map((option) => (
        <label
          key={option.value}
          htmlFor={option.value}
          className="flex items-center gap-2 cursor-pointer select-none text-sm sm:text-base"
        >
          <RadioGroup.Item
            value={option.value}
            id={option.value}
            className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors cursor-pointer
              ${darkMode ? "border-yellow-400 bg-black" : "border-gray-600 bg-white"}
              data-[state=checked]:bg-${darkMode ? "yellow-400" : "gray-800"}
            `}
          >
            <RadioGroup.Indicator>
              <div
                className={`w-2 h-2 rounded-full ${
                  darkMode ? "bg-black" : "bg-white"
                }`}
              />
            </RadioGroup.Indicator>
          </RadioGroup.Item>
          <span className={`${darkMode ? "text-white" : "text-gray-800"}`}>
            {option.label}
          </span>
        </label>
      ))}
    </RadioGroup.Root>
  );
};

export default RadioButton;
