"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThLarge, faList } from "@fortawesome/free-solid-svg-icons";
import FilterSortSection from "../FilterSortSection/FilterSortSection";
import FilterChips from "../FilterSortSection/FilterChips";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface ProductsSectionProps {
  title: string;
  description: string;
  price: number;
  selectedSort: string | null;
  setIsOpen: (val: boolean) => void;
  setActiveTab: React.Dispatch<React.SetStateAction<"filter" | "sort">>;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
  setSelectedSort: React.Dispatch<React.SetStateAction<string | null>>;
  viewMode: "grid" | "list";
  setViewMode: React.Dispatch<React.SetStateAction<"grid" | "list">>;
  selectedCategories?: string[];
  setSelectedCategories?: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function PageFilterSection({
  title,
  description,
  selectedCategories,
  price,
  selectedSort,
  setIsOpen,
  setActiveTab,
  setSelectedCategories,
  setPrice,
  setSelectedSort,
  viewMode,
  setViewMode,
}: ProductsSectionProps) {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  return (
    <>
      {/* Title */}
      <h1
        className={`sm:text-3xl text-xl font-bold mb-4 ${
          darkMode ? "text-yellow-400" : "text-black"
        }`}
      >
        {title}
      </h1>

      {/* Description */}
      <p className="sm:text-lg text-sm mt-3 sm:mt-4 mb-0">{description}</p>

      {/* Filter Section */}
      <FilterSortSection setIsOpen={setIsOpen} setActiveTab={setActiveTab} />

      {/* Selected Chips */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8">
        {/* Filter Chips */}
        {(selectedCategories && selectedCategories.length > 0) || price !== 200 || selectedSort ? (
          <div className="flex flex-wrap gap-2 flex-1">
            {selectedCategories?.map((cat) =>
              setSelectedCategories ? (
                <FilterChips
                  key={cat}
                  label={cat}
                  onClick={() =>
                    setSelectedCategories((prev) =>
                      prev.filter((c) => c !== cat)
                    )
                  }
                />
              ) : null
            )}

            {price !== 200 && (
              <FilterChips
                label={`₹${price} +`}
                onClick={() => setPrice(200)}
              />
            )}

            {selectedSort && (
              <FilterChips
                label={selectedSort}
                onClick={() => setSelectedSort(null)}
              />
            )}
          </div>
        ) : (
          <div></div>
        )}

        {/* View Toggle */}
        <div
          className={`flex w-20 h-10 rounded-lg border overflow-hidden self-end mt-4 sm:mt-0 ${
            darkMode ? "border-yellow-400" : "border-gray-800"
          }`}
        >
          {/* Grid View */}
          <div
            onClick={() => setViewMode("grid")}
            className={`flex-1 flex items-center justify-center cursor-pointer transition-colors duration-200
              ${
                viewMode === "grid"
                  ? darkMode
                    ? "bg-yellow-400 text-black"
                    : "bg-gray-800 text-white"
                  : ""
              }`}
          >
            <FontAwesomeIcon icon={faThLarge} className="w-4 h-4" />
          </div>

          {/* Divider */}
          <div
            className={`w-px ${darkMode ? "bg-yellow-400" : "bg-gray-800"}`}
          ></div>

          {/* List View */}
          <div
            onClick={() => setViewMode("list")}
            className={`flex-1 flex items-center justify-center cursor-pointer transition-colors duration-200
              ${
                viewMode === "list"
                  ? darkMode
                    ? "bg-yellow-400 text-black"
                    : "bg-gray-800 text-white"
                  : ""
              }`}
          >
            <FontAwesomeIcon icon={faList} className="w-4 h-4" />
          </div>
        </div>
      </div>
    </>
  );
}
