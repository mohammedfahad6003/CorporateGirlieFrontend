"use client";

import ProductsContainer from "@/components/ContainerStyles/ProductsContainer";
import { products } from "@/utils/commonJson";
import Image from "next/image";
import React, { use, useEffect, useState } from "react";
import NotFound from "./not-found";

interface Props {
  params: Promise<{ slug: string[] }>;
}

interface Product {
  id: number;
  title: string;
  price: string;
  image: string;
  description?: string;
  isSale?: boolean;
  saleDiscount?: number | 0;
}

const ProductsPage = ({ params }: Props) => {
  const { slug } = use(params);
  const [id] = slug;

  const [data, setData] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      const product = products.find((item) => item.id === Number(id)) || null;
      setData(product);
    }
  }, [id]);

  // if no product found → go to not-found.tsx
  if (!data) {
    <NotFound />;
  }

  return (
    <ProductsContainer>
      <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center py-10">
        {/* Left Side - Image */}
        <div className="w-full sm:w-1/2 relative aspect-square">
          <Image
            src={data?.image || "/unsplashImage1.jpg"}
            alt={data?.title || "Product"}
            fill
            className="object-cover rounded-xl border border-gray-200"
            priority
          />
        </div>

        {/* Right Side - Info */}
        <div className="w-full sm:w-1/2 flex flex-col gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold">{data?.title}</h1>

          {data?.description && (
            <p className="text-gray-600 leading-6">{data.description}</p>
          )}

          {data?.isSale ? (
            <div className="flex items-center gap-3">
              <span className="text-base sm:text-xl line-through text-gray-500">
                <span className="font-serif">₹</span>
                {Number(data.price ?? 0).toLocaleString()}
              </span>
              <span className="text-base sm:text-xl font-bold">
                <span className="font-serif">₹</span>
                {Math.round(
                  Number(data.price.replace(/,/g, "")) *
                    (1 - (data.saleDiscount ?? 0) / 100)
                ).toLocaleString()}
              </span>
              <span className="text-xs sm:text-sm font-medium text-[#C10E21]">
                {data?.saleDiscount}% OFF
              </span>
            </div>
          ) : (
            <p className="text-lg sm:text-xl font-semibold">
              <span className="font-serif">₹</span>
              {Number(data?.price ?? 0).toLocaleString()}
            </p>
          )}

          <button className="mt-4 px-6 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-lg transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </ProductsContainer>
  );
};

export default ProductsPage;
