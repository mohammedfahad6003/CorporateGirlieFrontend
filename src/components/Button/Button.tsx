"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: "hollow" | "filled";
  className?: string;
  isAnimationRequired?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = "hollow",
  className = "",
  isAnimationRequired = false,
}) => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const [clicked, setClicked] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleClick = () => {
    onClick?.();

    if (isAnimationRequired) {
      if (clicked) return;

      setClicked(true);
      setTimeout(() => {
        setClicked(false);
        setSuccess(true);
      }, 2000);

      // Reset success after a while
      setTimeout(() => setSuccess(false), 3500);
    }

    // Simulate async action
  };

  // Styles
  const baseButton =
    "relative cursor-pointer mt-2 px-6 py-3 font-semibold rounded-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center";

  const filledClass = darkMode
    ? "bg-yellow-400 text-white hover:bg-yellow-500 hover:shadow-lg"
    : "bg-gray-900 text-white hover:bg-gray-800 hover:shadow-lg";

  const hollowClass = darkMode
    ? "bg-black text-white border-2 border-yellow-400 hover:bg-gray-950 hover:text-white hover:shadow-lg"
    : "bg-white text-black border-2 border-gray-800 hover:bg-gray-50 hover:text-black hover:shadow-lg";

  return (
    <button
      onClick={handleClick}
      className={`${className} ${baseButton} ${
        variant === "filled" ? filledClass : hollowClass
      }`}
    >
      <div className="flex items-center justify-center h-6 min-w-[80px]">
        {!clicked && !success && (
          <span className="transition-opacity duration-200">{label}</span>
        )}

        {isAnimationRequired && clicked && !success && (
          <div className="flex items-end gap-1">
            <span className="w-2 h-2 bg-white rounded-full animate-bounceWave"></span>
            <span className="w-2 h-2 bg-white rounded-full animate-bounceWave animation-delay-150"></span>
            <span className="w-2 h-2 bg-white rounded-full animate-bounceWave animation-delay-300"></span>
          </div>
        )}

        {isAnimationRequired && success && (
          <FontAwesomeIcon icon={faCheck} className="text-white text-lg" />
        )}
      </div>
    </button>
  );
};

export default Button;
