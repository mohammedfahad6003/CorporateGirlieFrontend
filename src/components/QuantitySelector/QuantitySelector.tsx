"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface QuantitySelectorProps {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  min?: number;
  max?: number;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  setQuantity,
  min = 1,
  max = 10,
}) => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const [animate, setAnimate] = useState(false);

  const triggerAnimation = () => {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 200);
  };

  const increase = () => {
    if (quantity < max) {
      setQuantity((prev) => prev + 1);
      triggerAnimation();
    }
  };

  const decrease = () => {
    if (quantity > min) {
      setQuantity((prev) => prev - 1);
      triggerAnimation();
    }
  };

  const containerClass = `flex items-center rounded-lg overflow-hidden border-2 
    ${
      darkMode ? "border-yellow-400 bg-gray-800" : "border-gray-800 bg-white"
    } shadow-sm`;

  const buttonClass = `w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center 
    transition-colors duration-200 cursor-pointer hover:bg-yellow-400 text-lg font-semibold`;

  const disabledClass = `opacity-50 cursor-not-allowed hover:bg-none`;

  return (
    <div className="flex flex-col items-start gap-2">
      <span
        className={`text-sm sm:text-base font-medium ${
          darkMode ? "text-white" : "text-gray-800"
        }`}
      >
        Quantity
      </span>

      <div className={containerClass}>
        {/* Minus */}
        <button
          onClick={decrease}
          disabled={quantity <= min}
          className={`${quantity <= min ? disabledClass : ""} ${buttonClass}`}
        >
          <FontAwesomeIcon icon={faMinus} className="text-sm" />
        </button>

        {/* Quantity */}
        <div
          className={`w-10 sm:w-12 flex items-center justify-center border-l-1 border-r-1 
          ${
            darkMode ? "border-yellow-400" : "border-gray-400"
          } transition-colors duration-200`}
        >
          <span
            className={`text-sm sm:text-lg font-bold transition-transform duration-200 cursor-default
            ${
              animate
                ? "scale-125 text-yellow-400"
                : darkMode
                ? "text-white"
                : "text-gray-900"
            }`}
          >
            {quantity}
          </span>
        </div>

        {/* Plus */}
        <button
          onClick={increase}
          disabled={quantity >= max}
          className={`${quantity >= max ? disabledClass : ""} ${buttonClass}`}
        >
          <FontAwesomeIcon icon={faPlus} className="text-sm" />
        </button>
      </div>
    </div>
  );
};

export default QuantitySelector;
