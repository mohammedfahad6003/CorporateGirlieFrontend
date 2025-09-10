import { RootState } from "@/store/store";
import { faArrowsUpDown, faSliders } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useSelector } from "react-redux";

interface FilterSortSectionProps {
  setIsOpen: (open: boolean) => void;
  setActiveTab: (tab: "filter" | "sort") => void;
}

const FilterSortSection: React.FC<FilterSortSectionProps> = ({ setIsOpen, setActiveTab }) => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  const buttonBase =
    "flex items-center justify-center h-10 px-3 rounded-lg cursor-pointer transition text-sm sm:text-base";
  const lightButton =
    "border text-gray-900 hover:bg-gray-100 shadow-sm hover:shadow-gray-200";
  const darkButton =
    "border border-yellow-400 text-white shadow-sm hover:shadow-yellow-400/100";

  return (
    <div className="flex justify-between items-center my-4 gap-3">
      <button
        onClick={() => {
          setIsOpen(true);
          setActiveTab("filter");
        }}
        className={`${buttonBase} ${darkMode ? darkButton : lightButton} gap-2`}
      >
        <FontAwesomeIcon icon={faSliders} className="w-4 h-4" />
        <span>Filter</span>
      </button>

      <button
        onClick={() => {
          setIsOpen(true);
          setActiveTab("sort");
        }}
        className={`${buttonBase} ${darkMode ? darkButton : lightButton} gap-2`}
      >
        <span>Sort By</span>
        <FontAwesomeIcon icon={faArrowsUpDown} className="w-3 h-3" />
      </button>
    </div>
  );
};

export default FilterSortSection;
