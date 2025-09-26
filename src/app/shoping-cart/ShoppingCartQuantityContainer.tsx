"use client";

import { RootState } from "@/store/store";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";

export const ShoppingCartQuantityContainer: React.FC<{
  quantity: number;
  onChange: (newQty: number) => void;
  min?: number;
  max?: number;
}> = ({ quantity, onChange, min = 1, max = 10 }) => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const [animate, setAnimate] = useState(false);

  // Trigger animation when quantity changes
  useEffect(() => {
    setAnimate(true);
    const timeout = setTimeout(() => setAnimate(false), 200);
    return () => clearTimeout(timeout);
  }, [quantity]);

  const buttonClass = `w-8 sm:w-8 h-8 sm:h-8 flex items-center justify-center rounded-full 
    transition-all duration-200 transform cursor-pointer border-2 ${
      darkMode
        ? "border-yellow-400 hover:bg-yellow-400 hover:text-black"
        : "border-gray-800 hover:bg-gray-800 hover:text-white"
    } text-lg font-semibold`;

  const disabledClass = "opacity-50 cursor-not-allowed";

  return (
    <div className="flex items-center gap-1">
      {/* Minus */}
      <button
        onClick={() => quantity > min && onChange(quantity - 1)}
        disabled={quantity <= min}
        className={`${buttonClass} ${
          quantity <= min ? disabledClass : "cursor-pointer"
        }`}
      >
        <FontAwesomeIcon icon={faMinus} className={`text-xs`} />
      </button>

      {/* Quantity */}
      <span
        className={`w-8 text-center text-base font-medium transition-transform duration-200 ${
          animate
            ? "scale-125 text-yellow-400"
            : darkMode
            ? "text-white"
            : "text-gray-800"
        }`}
      >
        {quantity}
      </span>

      {/* Plus */}
      <button
        onClick={() => quantity < max && onChange(quantity + 1)}
        disabled={quantity >= max}
        className={`${buttonClass} ${
          quantity >= max ? disabledClass : "cursor-pointer"
        }`}
      >
        <FontAwesomeIcon icon={faPlus} className={`text-xs`} />
      </button>
    </div>
  );
};
