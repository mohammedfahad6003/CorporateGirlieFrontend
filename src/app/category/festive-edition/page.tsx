"use client";

import ProductsContainer from "@/components/ContainerStyles/ProductsContainer";
import { RootState } from "@/store/store";
import {
  faArrowDownWideShort,
  faArrowsUpDown,
  faArrowUpShortWide,
  faCircleXmark,
  faIndianRupeeSign,
  faSliders,
  faStar,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const categories = ["Art", "Drawings", "Resin", "Home Décor", "Crafts"];

const sortOptions = [
  { label: "Low to High", icon: faArrowUpShortWide },
  { label: "High to Low", icon: faArrowDownWideShort },
  { label: "Below 1000", icon: faIndianRupeeSign },
  { label: "Popularity", icon: faStar },
];

const FestiveEdition = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"filter" | "sort">("filter");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [price, setPrice] = useState(100);
  const [selectedSort, setSelectedSort] = useState<string | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);

  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  const buttonBase =
    "flex items-center justify-center h-10 px-3 rounded-lg cursor-pointer transition text-sm sm:text-base";
  const lightButton =
    "border text-gray-900 hover:bg-gray-100 shadow-sm hover:shadow-gray-200";
  const darkButton =
    "border border-yellow-400 text-white shadow-sm hover:shadow-yellow-400/100";

  // Toggle category selection
  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  // Close modal when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      // Disable background scrolling
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable scrolling
      document.body.style.overflow = "auto";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      <ProductsContainer>
        <h1
          className={`sm:text-3xl text-xl font-bold mb-4 ${
            darkMode ? "text-yellow-400" : "text-black"
          }`}
        >
          Festive Edition
        </h1>

        <p className="sm:text-lg text-sm mt-3 sm:mt-4">
          {`Celebrate the season of joy with our Festive Edition – a vibrant mix of art, drawings, resin pieces, home décor, and crafts to brighten your celebrations.`}
        </p>

        {/* FilterSection */}
        <div className="flex justify-between items-center my-4 gap-3">
          <button
            onClick={() => {
              setIsOpen(true);
              setActiveTab("filter");
            }}
            className={`${buttonBase} ${
              darkMode ? darkButton : lightButton
            } gap-2`}
          >
            <FontAwesomeIcon icon={faSliders} className="w-4 h-4" />
            <span>Filter</span>
          </button>

          <button
            onClick={() => {
              setIsOpen(true);
              setActiveTab("sort");
            }}
            className={`${buttonBase} ${
              darkMode ? darkButton : lightButton
            } gap-2`}
          >
            <span>Sort By</span>
            <FontAwesomeIcon icon={faArrowsUpDown} className="w-3 h-3" />
          </button>
        </div>
      </ProductsContainer>

      {/* Modal */}
      {isOpen && (
        <div
          className={`fixed inset-0 z-40 flex items-end sm:items-center justify-center overflow-y-auto bg-black/75 transition-opacity duration-300 ease-out`}
          onClick={() => setIsOpen(false)}
        >
          <div
            ref={modalRef}
            className={`relative w-full sm:max-w-md mx-auto transform transition-transform duration-300 ease-out
              ${
                darkMode
                  ? "bg-black text-white border-2 border-yellow-400"
                  : "bg-white text-gray-900"
              }
              sm:rounded-xl rounded-t-3xl shadow-2xl max-h-[90vh] flex flex-col`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b p-4 sm:p-6 relative">
              {/* Tabs */}
              <div className="flex w-full">
                <button
                  onClick={() => setActiveTab("filter")}
                  className={`flex-1 text-center text-base sm:text-lg font-medium pb-2 border-b-2 sm:border-b-4 transition-colors cursor-pointer ${
                    activeTab === "filter"
                      ? darkMode
                        ? "border-yellow-400 text-yellow-400"
                        : "border-yellow-400 text-black"
                      : darkMode
                      ? "border-transparent text-white"
                      : "border-transparent text-gray-900"
                  }`}
                >
                  Filter
                </button>
                <button
                  onClick={() => setActiveTab("sort")}
                  className={`flex-1 text-center text-base sm:text-lg font-medium pb-2 border-b-2 sm:border-b-4 transition-colors cursor-pointer ${
                    activeTab === "sort"
                      ? darkMode
                        ? "border-yellow-400 text-yellow-400"
                        : "border-yellow-400 text-black"
                      : darkMode
                      ? "border-transparent text-white"
                      : "border-transparent text-gray-900"
                  }`}
                >
                  Sort
                </button>
              </div>

              {/* Close */}
              <button
                onClick={() => setIsOpen(false)}
                className={`hidden sm:inline absolute right-2 top-1/4 -translate-y-1/2 p-2 rounded-full transition-colors cursor-pointer ${
                  darkMode
                    ? "text-yellow-400 hover:text-yellow-300"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <FontAwesomeIcon icon={faTimes} className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-4 sm:p-6 h-[40vh] sm:h-[55vh] overflow-y-auto flex flex-col gap-2 sm:gap-5">
              {activeTab === "filter" ? (
                <>
                  {/* Filter Header with Clear */}
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-base sm:text-lg">
                      Filter Options
                    </span>

                    {(selectedCategories.length > 0 || price !== 100) && (
                      <button
                        onClick={() => {
                          setSelectedCategories([]);
                          setPrice(100);
                        }}
                        className="flex items-center gap-1 text-xs sm:text-sm text-red-500 hover:underline transition-colors cursor-pointer"
                      >
                        Clear{" "}
                        <FontAwesomeIcon
                          icon={faCircleXmark}
                          className="w-4 h-4"
                        />
                      </button>
                    )}
                  </div>
                  {/* Price Slider */}
                  <div>
                    <label className="font-medium mb-2 block sm:text-base text-sm">
                      Price Range:{" "}
                      <span style={{ fontFamily: "Roboto, sans-serif" }}>
                        ₹
                      </span>
                      {price}+
                    </label>
                    <input
                      type="range"
                      min="100"
                      max="8000"
                      step="100"
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="w-full accent-yellow-400 cursor-pointer"
                    />
                  </div>

                  {/* Categories */}
                  <div>
                    <label className="font-medium mb-2 block sm:text-base text-sm">
                      Categories
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => toggleCategory(cat)}
                          className={`p-3 sm:px-5 sm:py-3 rounded-xl border font-medium text-sm transition-all duration-200 cursor-pointer shadow-sm ${
                            selectedCategories.includes(cat)
                              ? "bg-yellow-400 text-black border-yellow-400 shadow-lg"
                              : darkMode
                              ? "border-gray-600 text-white hover:border-yellow-400 hover:text-yellow-400"
                              : "border-gray-300 text-gray-900 hover:border-yellow-400 hover:text-yellow-400"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-medium text-base sm:text-lg">
                      Sort Options
                    </span>
                    {selectedSort && (
                      <button
                        onClick={() => setSelectedSort(null)}
                        className="flex items-center text-xs sm:text-sm text-red-500 hover:underline transition-colors gap-1 cursor-pointer"
                      >
                        Clear
                        <FontAwesomeIcon
                          icon={faCircleXmark}
                          className="w-4 h-4"
                        />
                      </button>
                    )}
                  </div>
                  {/* Sort Options */}
                  <div className="flex flex-col gap-3">
                    {sortOptions.map((option) => (
                      <button
                        key={option.label}
                        onClick={() => setSelectedSort(option.label)}
                        className={`flex justify-between items-center px-5 py-3 rounded-xl border font-medium text-sm transition-all duration-200 cursor-pointer shadow-sm ${
                          selectedSort === option.label
                            ? "bg-yellow-400 text-black border-yellow-400 shadow-lg"
                            : darkMode
                            ? "border-gray-600 text-white hover:border-yellow-400 hover:text-yellow-400"
                            : "border-gray-300 text-gray-900 hover:border-yellow-400 hover:text-yellow-400"
                        }`}
                      >
                        <span>{option.label}</span>
                        <FontAwesomeIcon
                          icon={option.icon}
                          className="w-4 h-4"
                        />
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 sm:p-6 border-t text-center">
              <button
                onClick={() => setIsOpen(false)}
                className={`sm:w-[75%] w-[60%] py-3 text-sm sm:text-base rounded-xl font-semibold cursor-pointer transition-shadow duration-200 shadow-sm
                  ${
                    darkMode
                      ? "bg-yellow-400 text-white hover:shadow-lg"
                      : "bg-yellow-400 text-black hover:shadow-lg"
                  }
                  disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none
                `}
                disabled={
                  activeTab === "filter"
                    ? selectedCategories.length === 0 && price === 100
                    : activeTab === "sort"
                    ? selectedSort === null
                    : false
                }
              >
                {activeTab === "filter" ? "Apply Filters" : "Apply Sort"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FestiveEdition;
