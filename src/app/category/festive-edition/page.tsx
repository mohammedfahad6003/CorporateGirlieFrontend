"use client";

import ProductsContainer from "@/components/ContainerStyles/ProductsContainer";
import { RootState } from "@/store/store";
import {
  faArrowUpWideShort,
  faSliders,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const FestiveEdition = () => {
  const [isOpen, setIsOpen] = useState(false);

  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  const buttonBase =
    "flex items-center justify-center h-10 px-3 rounded-lg cursor-pointer transition text-sm sm:text-base";

  const lightButton =
    "border text-gray-900 hover:bg-gray-100 shadow-sm hover:shadow-gray-200";

  const darkButton =
    "border border-yellow-400 text-white shadow-sm hover:shadow-yellow-400/100";

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
          {/* Filter Button */}
          <button
            onClick={() => setIsOpen(true)}
            className={`${buttonBase} ${
              darkMode ? darkButton : lightButton
            } gap-2`}
          >
            <FontAwesomeIcon icon={faSliders} className="w-4 h-4" />
            <span>Filter</span>
          </button>

          {/* Sort Button */}
          <button
            onClick={() => setIsOpen(true)}
            className={`${buttonBase} ${
              darkMode ? darkButton : lightButton
            } gap-2`}
          >
            <span>Sort By</span>
            <FontAwesomeIcon icon={faArrowUpWideShort} className="w-3 h-3" />
          </button>
        </div>
      </ProductsContainer>
      {isOpen && <>Hello World</>}
    </>
  );
};

export default FestiveEdition;
