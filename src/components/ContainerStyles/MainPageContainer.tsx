"use client";

import React, { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { smoothScrollToTop } from "@/utils/helperFunctions";

interface MainPageContainerProps {
  children: ReactNode;
}

const MainPageContainer = ({ children }: MainPageContainerProps) => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  const bgColor = darkMode ? "bg-black" : "bg-white";
  const textColor = darkMode ? "text-white" : "text-gray-900";

  useEffect(() => {
    if (typeof window !== "undefined") {
      smoothScrollToTop();
    }
  }, []);

  return (
    <div className={`min-h-screen ${bgColor} ${textColor}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </div>
    </div>
  );
};

export default MainPageContainer;
