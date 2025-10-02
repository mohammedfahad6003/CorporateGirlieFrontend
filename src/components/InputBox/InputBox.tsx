import { RootState } from "@/store/store";
import React, { ChangeEvent } from "react";
import { useSelector } from "react-redux";

interface InputBoxProps {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  label?: string;
  className?: string;
}

const InputBox: React.FC<InputBoxProps> = ({
  type,
  placeholder,
  value,
  onChange,
  onKeyDown,
  label,
  className = "",
}) => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  return (
    <div className="w-full">
      {label && (
        <label
          className={`block text-sm sm:text-base pb-1 font-normal sm:font-medium ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          {label}
        </label>
      )}
      <input
        type={type ?? "text"}
        placeholder={placeholder || "Enter text"}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
        onKeyDown={onKeyDown}
        className={`
          border-1 px-3 py-2 rounded-md outline-none w-full
          text-[14px] sm:text-[16px]
          [appearance:textfield] 
          [&::-webkit-outer-spin-button]:appearance-none
          [&::-webkit-inner-spin-button]:appearance-none
          transition-all duration-200 ease-in-out
          placeholder-gray-500
          ${className}
          ${
            darkMode
              ? " text-white border-yellow-400 placeholder-gray-300 hover:shadow-md hover:shadow-white/20 bg-black"
              : " text-gray-800 border-gray-800 placeholder-gray-500 hover:shadow-md hover:shadow-gray-400/40"
          }
        `}
      />
    </div>
  );
};

export default InputBox;
