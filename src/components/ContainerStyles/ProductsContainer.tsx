"use client";

import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface MainContainerProps {
  children: ReactNode;
}

const ProductsContainer = ({ children }: MainContainerProps) => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  const bgColor = darkMode ? "bg-black" : "bg-white";
  const textColor = darkMode ? "text-white" : "text-gray-900";

  return (
    <div className={`min-h-screen ${bgColor} ${textColor} px-4 sm:py-12 py-6 sm:px-12`}>
      <div className="max-w-full md:max-w-4xl lg:max-w-6xl 2xl:max-w-7xl mx-auto space-y-8 relative">
        {children}
      </div>
    </div>
  );
};

export default ProductsContainer;
