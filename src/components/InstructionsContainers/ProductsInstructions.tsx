"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface ProductDescriptionProps {
  sections: string[];
}

const ProductsInstructions: React.FC<ProductDescriptionProps> = ({ sections }) => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  return (
    <div
      className={`w-full p-4 rounded-md ${
        darkMode
          ? "bg-gray-950 text-white border-2 border-yellow-400"
          : "bg-gray-100 text-gray-800"
      }`}
    >
      <ul className="list-disc ml-6 space-y-1 text-xs sm:text-sm">
        {sections.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsInstructions;
