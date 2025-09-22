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
  loading?: boolean; // new
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
    if (loading) return; // prevent click while loading
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
  };

  // Styles
  const baseButton =
    "relative cursor-pointer mt-1 sm:mt-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center";

  const filledClass = darkMode
    ? "bg-yellow-400 text-white border-2 border-yellow-400 hover:bg-yellow-500 hover:shadow-lg"
    : "bg-gray-900 text-white border-2 border-gray-800 hover:bg-gray-800 hover:shadow-lg";

  const hollowClass = darkMode
    ? "bg-black text-white border-2 border-yellow-400 hover:bg-gray-950 hover:text-white hover:shadow-lg"
    : "bg-white text-black border-2 border-gray-800 hover:bg-gray-50 hover:text-black hover:shadow-lg";

  return (
    <button
      onClick={(e) => handleClick(e)}
      disabled={loading}
      className={`${className} ${baseButton} ${
        variant === "filled" ? filledClass : hollowClass
      }`}
    >
      <div className="flex items-center justify-center h-6 min-w-[100px]">
        {/* Loading spinner */}
        {loading && (
          <>
            <FontAwesomeIcon
              icon={faSpinner}
              spin
              className="text-white mr-2"
            />
            <span>Sending...</span>
          </>
        )}

        {/* Normal label */}
        {!loading && !clicked && !success && (
          <span className="transition-opacity duration-200">{label}</span>
        )}

        {/* Wave dots animation */}
        {isAnimationRequired && clicked && !success && !loading && (
          <div className="flex items-end gap-1">
            <span className="w-2 h-2 bg-white rounded-full animate-bounceWave"></span>
            <span className="w-2 h-2 bg-white rounded-full animate-bounceWave animation-delay-150"></span>
            <span className="w-2 h-2 bg-white rounded-full animate-bounceWave animation-delay-300"></span>
          </div>
        )}

        {/* Success check */}
        {isAnimationRequired && success && !loading && (
          <FontAwesomeIcon icon={faCheck} className="text-white text-lg" />
        )}
      </div>
    </button>
  );
};

export default Button;
