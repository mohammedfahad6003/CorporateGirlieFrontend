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
interface HorizontalCardProps {
  product: Product;
}

const HorizontalCard: React.FC<HorizontalCardProps> = ({ product }) => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const router = useRouter();

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
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        router.push(`/products/${product.id}`);
      }}
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
          <h3 className="text-sm sm:text-lg font-semibold leading-6 mb-2 sm:mb-1">
            {product?.title}
          </h3>
          {product?.isSale ? (
            <div className="flex items-center gap-3">
              <span className="text-sm sm:text-base line-through text-gray-500">
                <span className="font-serif">₹</span>
                {Number(product?.price ?? 0).toLocaleString()}
              </span>
              <span className="text-sm sm:text-base font-bold">
                <span className="font-serif">₹</span>
                {Math.round(
                  Number(product.price.replace(/,/g, "")) *
                    (1 - (product.saleDiscount ?? 0) / 100)
                ).toLocaleString()}
              </span>
              <span className="text-xs sm:text-sm font-medium text-[#C10E21]">
                {product?.saleDiscount}% OFF
              </span>
            </div>
          ) : (
            <p className="text-sm sm:text-base font-semibold">
              <span className="font-serif">₹</span>
              {Number(product?.price ?? 0).toLocaleString()}
            </p>
          )}
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
