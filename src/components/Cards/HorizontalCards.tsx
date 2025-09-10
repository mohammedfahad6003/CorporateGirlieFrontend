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

interface HorizontalCardProps {
  product: Product;
}

const HorizontalCard: React.FC<HorizontalCardProps> = ({ product }) => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  return (
    <div
      className={`flex items-center rounded-2xl overflow-hidden cursor-pointer
        border-2 p-2 sm:p-3 transition-transform duration-300
        ${
          darkMode
            ? "border-yellow-400 bg-black text-white"
            : "border-gray-300 bg-white text-gray-900"
        }
        hover:scale-105 hover:shadow-md`}
    >
      {/* Image */}
      <div className="relative w-24 sm:w-32 h-24 sm:h-32 flex-shrink-0 rounded-lg overflow-hidden">
        <Image
          src={product?.image || "/unsplashImage1.jpg"}
          alt={product?.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex justify-between items-center px-3 sm:px-4">
        <div>
          <h3 className="text-sm sm:text-lg font-semibold">{product?.title}</h3>
          <p className="text-xs sm:text-sm font-medium mt-1">
            From {product?.price}
          </p>
        </div>

        {/* Arrow Icon */}
        <FontAwesomeIcon
          icon={faCircleArrowRight}
          className={`text-lg sm:text-xl ${
            darkMode ? "text-yellow-400" : "text-gray-600"
          }`}
        />
      </div>
    </div>
  );
};

export default HorizontalCard;
