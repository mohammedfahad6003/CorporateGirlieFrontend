"use client";

import React from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";

interface Product {
  id: number;
  title: string;
  price: string;
  image?: string;
}

interface CardProps {
  product: Product;
}

const Card: React.FC<CardProps> = ({ product }) => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  const borderColor = darkMode ? "border-yellow-400" : "border-gray-300";

  return (
    <div
      className={`group relative rounded-2xl overflow-hidden cursor-pointer
        transition-transform duration-500 ease-out
        border-2 ${borderColor}
        ${darkMode ? "bg-black text-white" : "bg-white text-gray-900"}
        hover:z-10
        ${
          darkMode
            ? "hover:scale-105 hover:shadow-[0_0_25px_8px_rgba(250,204,21,0.1)]"
            : "hover:scale-105 hover:shadow-2xl"
        }`}
    >
      {/* Image */}
      <div
        className={`relative w-full h-42 sm:h-72 border-b-2 ${
          darkMode ? "border-yellow-400" : "border-gray-300"
        }`}
      >
        <Image
          src={product?.image || "/unsplashImage1.jpg"}
          alt={product?.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Title + Price + Icon */}
      <div
        className={`p-2 sm:p-4 flex flex-col gap-2 transition-colors duration-300 border-b-2 border-l-2 border-r-2 rounded-b-2xl
          ${darkMode ? "border-yellow-100/35" : "border-gray-100"}`}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="sm:text-lg text-sm font-semibold mb-2 sm:m-0">
              {product?.title}
            </h3>
            <p className="sm:text-sm text-xs font-medium">
              From {product?.price}
            </p>
          </div>
          <FontAwesomeIcon
            icon={faCircleArrowRight}
            className={`transition-opacity duration-300 
              ${darkMode ? "text-yellow-400" : "text-gray-600"}
              sm:opacity-0 sm:group-hover:opacity-100 opacity-100`}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
