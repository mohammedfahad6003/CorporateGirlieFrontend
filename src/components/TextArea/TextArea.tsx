import { RootState } from "@/store/store";
import React from "react";
import { useSelector } from "react-redux";

interface TextAreaProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

const TextArea = ({ placeholder, value, onChange }: TextAreaProps) => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  return (
    <textarea
      placeholder={placeholder || "Enter text"}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`
        border-1 px-3 py-2 rounded-md outline-none w-full
        text-[14px] sm:text-[16px] min-h-[120px]
        transition-all duration-200 ease-in-out
        placeholder-gray-500
        [resize:vertical]
        ${
          darkMode
            ? "text-white border-yellow-300 placeholder-gray-300 hover:shadow-md hover:shadow-white/20"
            : "text-gray-800 border-gray-800 placeholder-gray-500 hover:shadow-md hover:shadow-gray-400/40"
        }
      `}
    />
  );
};

export default TextArea;
