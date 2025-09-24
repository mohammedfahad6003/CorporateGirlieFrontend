"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import CareInstructions from "../InstructionsContainers/CareInstructions";
import ProductsInstructions from "../InstructionsContainers/ProductsInstructions";
import DeliveryInstructions from "../InstructionsContainers/DeliveryInstructions";
import CustomizedInstructions from "../InstructionsContainers/CustomizedInstructions";

interface CollapseProps {
  title: string;
  description?: Array<string>;
  icon?: IconProp; // optional icon, must be IconProp
  className?: string; // extra styles if needed
}

const Collapse: React.FC<CollapseProps> = ({
  title = "",
  description = "",
  icon,
  className,
}) => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const [isOpen, setIsOpen] = useState(false);

  const fetchDescription = () => {
    return title === "Care Instructions" ? (
      <CareInstructions />
    ) : title === "Product Details" ? (
      <ProductsInstructions
        sections={
          Array.isArray(description)
            ? description
            : description
            ? [description]
            : []
        }
      />
    ) : title === "Shipping Instructions" ? (
      <DeliveryInstructions />
    ) : title === "Customized Instructions" ? (
      <CustomizedInstructions />
    ) : (
      description
    );
  };

  return (
    <div
      className={`w-full border-b-2 rounded-xs transition-all duration-200 cursor-pointer ${className} ${
        darkMode ? "border-yellow-400" : "border-gray-800"
      }`}
    >
      {/* Header */}
      <button
        className="w-full flex justify-between items-center py-4 text-left focus:outline-none cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          {/* optional icon before title */}
          {icon && (
            <FontAwesomeIcon
              icon={icon}
              className={`transform transition-transform duration-500`}
            />
          )}
          <span className="text-base font-medium sm:text-lg">{title}</span>
        </div>

        <FontAwesomeIcon
          icon={faChevronDown}
          className={`ml-2 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          } ${darkMode ? "text-yellow-400" : "text-gray-700"}`}
        />
      </button>

      {/* Body */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "h-auto py-4 pt-0" : "max-h-0 px-4 pt-0"
        }`}
      >
        <div
          className={`text-sm sm:text-base space-y-2 ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          {fetchDescription()}
        </div>
      </div>
    </div>
  );
};

export default Collapse;
