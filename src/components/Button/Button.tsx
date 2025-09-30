"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: "hollow" | "filled";
  className?: string;
  isAnimationRequired?: boolean;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = "hollow",
  className = "",
  isAnimationRequired = false,
  loading = false,
}) => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const [clicked, setClicked] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (loading) return;

    if (isAnimationRequired) {
      if (clicked) return;
      setClicked(true);

      setTimeout(() => {
        setClicked(false);
        setSuccess(true);
      }, 2000);

      setTimeout(() => setSuccess(false), 3500);
    }
    onClick?.();
  };

  const baseButton =
    "relative cursor-pointer mt-1 sm:mt-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center";

  const filledClass = darkMode
    ? "bg-yellow-400 text-black border-2 border-yellow-400 hover:bg-yellow-500"
    : "bg-gray-900 text-white border-2 border-gray-800 hover:bg-gray-800";

  const hollowClass = darkMode
    ? "bg-black text-white border-2 border-yellow-400 hover:bg-gray-950"
    : "bg-white text-black border-2 border-gray-800 hover:bg-gray-50";

  const getTextColor = (variant: string, darkMode: boolean) => {
    if (variant === "filled")
      return darkMode ? "text-black font-medium" : "text-white font-medium";
    return darkMode ? "text-white font-medium" : "text-black font-medium";
  };

  const getLoadingTextColor = (variant: string, darkMode: boolean) => {
    if (variant === "filled") return darkMode ? "bg-black " : "bg-white";
    return darkMode ? "bg-white" : "bg-black";
  };

  const textColor = getTextColor(variant, darkMode);
  const loadingTextColor = getLoadingTextColor(variant, darkMode);

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`${className} ${baseButton} ${
        variant === "filled" ? filledClass : hollowClass
      }`}
    >
      <div className="flex items-center justify-center h-6 min-w-[100px] w-full">
        {/* Loading spinner */}
        {loading && (
          <>
            <FontAwesomeIcon
              icon={faSpinner}
              spin
              className={`${textColor} mr-2`}
            />
            <span className={textColor}>Sending...</span>
          </>
        )}

        {/* Normal label */}
        {!loading && !clicked && !success && (
          <span className={`${textColor} transition-opacity duration-200`}>
            {label}
          </span>
        )}

        {/* Wave dots animation */}
        {isAnimationRequired && clicked && !success && !loading && (
          <div className="flex items-end gap-1">
            <span
              className={`w-2 h-2 ${loadingTextColor} rounded-full animate-bounceWave`}
            />
            <span
              className={`w-2 h-2 ${loadingTextColor} rounded-full animate-bounceWave animation-delay-150`}
            />
            <span
              className={`w-2 h-2 ${loadingTextColor} rounded-full animate-bounceWave animation-delay-300`}
            />
          </div>
        )}

        {/* Success check */}
        {isAnimationRequired && success && !loading && (
          <FontAwesomeIcon icon={faCheck} className={`${textColor} text-lg`} />
        )}
      </div>
    </button>
  );
};

export default Button;
