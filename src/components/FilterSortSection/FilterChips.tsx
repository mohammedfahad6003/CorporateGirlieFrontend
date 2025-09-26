"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface FilterChipProps {
  label: string;
  isPrice?: boolean;
  onClick: () => void;
}

const FilterChips = ({ label, onClick, isPrice = false }: FilterChipProps) => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  return (
    <span
      className={`flex items-center gap-1 px-3 py-1 rounded-xl text-xs sm:text-sm font-medium shadow-sm cursor-pointer
        ${
          darkMode
            ? "bg-yellow-400 border border-yellow-400 text-black"
            : "bg-gray-800 border border-gray-800 text-white"
        }`}
    >
      {isPrice && <span className="font-sans">₹</span>}
      {label}
      <FontAwesomeIcon
        icon={faTimes}
        className="w-2.5 h-2.5 sm:w-3 sm:h-3"
        onClick={onClick}
      />
    </span>
  );
};

export default FilterChips;
