"use client";

import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface MainContainerProps {
  children: ReactNode;
}

const PolicyContainer = ({ children }: MainContainerProps) => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  const bgColor = darkMode ? "bg-black" : "bg-white";
  const textColor = darkMode ? "text-white" : "text-gray-900";

  return (
    <div className={`min-h-screen ${bgColor} ${textColor} px-6 sm:py-12 py-6`}>
      <div className="max-w-4xl mx-auto space-y-8">{children}</div>
    </div>
  );
};

export default PolicyContainer;
