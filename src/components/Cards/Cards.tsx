"use client";

import React from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  title: string;
  price: string;
  image: string;
  description?: string;
  isSale?: boolean;
  saleDiscount?: number | 0;
}

interface CardProps {
  product: Product;
}

const Card: React.FC<CardProps> = ({ product }) => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const router = useRouter();

  const borderColor = darkMode ? "border-yellow-400" : "border-gray-300";

  return (
    <div
      className={`group relative rounded-xl overflow-hidden cursor-pointer
        transition-transform duration-500 ease-out
        border-2 ${borderColor}
        ${darkMode ? "bg-black text-white" : "bg-white text-gray-900"}
        hover:z-10
        ${
          darkMode
            ? "hover:scale-105 hover:shadow-[0_0_25px_8px_rgba(250,204,21,0.1)]"
            : "hover:scale-105 hover:shadow-2xl"
        }`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        router.push(`/products/${product.id}`);
      }}
    >
      {/* Image */}
      <div
        className={`relative w-full h-36 sm:h-60 border-b-2 ${
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
        {product?.isSale && (
          <span className="sm:hidden absolute bottom-0 right-0 bg-[#C10E21] text-white text-xs font-semibold px-2 py-1 rounded-tl-md">
            {product?.saleDiscount}% OFF
          </span>
        )}
      </div>

      {/* Title + Price + Icon */}
      <div
        className={`p-2 sm:p-4 flex flex-col gap-2 transition-colors duration-300`}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="sm:text-lg text-sm font-medium mb-2 sm:mb-1 leading-5 sm:leading-6">
              {product?.title}
            </h3>
            {product?.isSale ? (
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-sm sm:text-base line-through text-gray-500">
                  <span className="font-sans">₹</span>
                  {Number(product?.price ?? 0).toLocaleString()}
                </span>
                <span className="text-sm sm:text-base font-bold">
                  <span className="font-sans">₹</span>
                  {Math.round(
                    Number(product.price.replace(/,/g, "")) *
                      (1 - (product.saleDiscount ?? 0) / 100)
                  ).toLocaleString()}
                </span>
                <span className="hidden sm:inline text-xs sm:text-sm font-medium text-[#C10E21]">
                  {product?.saleDiscount}% OFF
                </span>
              </div>
            ) : (
              <p className="text-sm sm:text-base font-bold">
                <span className="font-sans">₹</span>
                {Number(product?.price ?? 0).toLocaleString()}
              </p>
            )}
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
