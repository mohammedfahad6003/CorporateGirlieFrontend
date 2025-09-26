"use client";

import ProductsContainer from "@/components/ContainerStyles/ProductsContainer";
import { products } from "@/utils/commonJson";
import Image from "next/image";
import React, { use, useEffect, useState } from "react";
import NotFound from "./not-found";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faClipboardList,
  faPalette,
  faShieldHeart,
  faTruck,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import QuantitySelector from "@/components/QuantitySelector/QuantitySelector";
import { useRouter } from "next/navigation";
import Button from "@/components/Button/Button";
import Collapse from "@/components/CollapseExpand/CollapseExpand";
import { addToCart } from "@/store/addCartSlice";

// Props type for dynamic route slug
interface Props {
  params: Promise<{ slug: string[] }>;
}

// Product type definition
interface Product {
  id: number;
  title: string;
  price: string;
  image: string;
  description?: string;
  isSale?: boolean;
  saleDiscount?: number | 0;
  customizationAllowed?: boolean;
  details?: Array<string>;
}

const ProductsPage = ({ params }: Props) => {
  const { slug } = use(params);
  const [id] = slug;

  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const [data, setData] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      const product = products.find((item) => item.id === Number(id)) || null;
      setData(product);
    }
  }, [id]);

  if (!data) {
    return <NotFound />;
  }

  const filledClass = darkMode
    ? "bg-yellow-400 text-black border-2 border-yellow-400 hover:bg-yellow-500 hover:shadow-lg"
    : "bg-gray-900 text-white border-2 border-gray-800 hover:bg-gray-800 hover:shadow-lg";

  const handleAddToCart = () => {
    const calculatedPrice = data?.isSale
      ? Math.round(
          Number(data.price.replace(/,/g, "")) *
            (1 - (data.saleDiscount ?? 0) / 100)
        )
      : Number(data?.price?.replace(/,/g, "") || 0);

    const addToCartData = {
      id: data?.id,
      title: data?.title,
      price: calculatedPrice,
      quantity: quantity,
      image: data?.image,
    };

    dispatch(addToCart(addToCartData));

    return "";
  };

  //   import { useDispatch, useSelector } from "react-redux";
  // import { addToCart, removeFromCart, updateQuantity } from "@/store/slices/cartSlice";
  // import { RootState } from "@/store/store";

  // const dispatch = useDispatch();
  // const cartItems = useSelector((state: RootState) => state.cart.items);

  // // Add item to cart
  // dispatch(addToCart({ id: 1, title: "Product 1", price: 1000, quantity: 1, image: "/img.jpg" }));

  // // Remove item
  // dispatch(removeFromCart(1));

  // // Update quantity
  // dispatch(updateQuantity({ id: 1, quantity: 3 }));

  // // Clear cart
  // dispatch(clearCart());

  return (
    <ProductsContainer>
      {/* Back Button */}
      <button
        className={`flex items-center gap-2 mb-4 text-xs sm:text-sm font-medium 
          cursor-pointer rounded-lg px-3 py-2 ${filledClass}
           ${
             darkMode
               ? "hover:shadow-[0_4px_10px_rgba(250,204,21,0.5)]"
               : "hover:shadow-lg"
           } transition-shadow duration-200`}
        onClick={() => router.back()}
      >
        <FontAwesomeIcon icon={faArrowLeft} className="text-xs sm:text-sm" />
        Back
      </button>

      <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start sm:items-start relative">
        {/* ---------------- LEFT SIDE : PRODUCT IMAGE ---------------- */}
        <div className="w-full sm:w-1/2 relative aspect-square">
          <Image
            src={data?.image || "/unsplashImage1.jpg"}
            alt={data?.title || "Product"}
            fill
            className="object-cover rounded-xl border border-gray-200"
            priority
          />
        </div>

        {/* ---------------- RIGHT SIDE : PRODUCT DETAILS ---------------- */}
        <div className="w-full sm:w-1/2 flex flex-col gap-4">
          <h1 className="text-2xl sm:text-4xl font-bold">{data?.title}</h1>

          {data?.description && (
            <p className="text-sm sm:text-base text-gray-600 leading-5">
              {data.description}
            </p>
          )}

          {data?.isSale ? (
            <div className="flex items-center gap-3">
              {/* Original price (striked) */}
              <span className="text-base sm:text-xl line-through text-gray-500">
                <span className="font-serif">₹</span>
                {Number(data.price ?? 0).toLocaleString()}
              </span>
              {/* Discounted price */}
              <span className="text-base sm:text-xl font-bold">
                <span className="font-serif">₹</span>
                {Math.round(
                  Number(data.price.replace(/,/g, "")) *
                    (1 - (data.saleDiscount ?? 0) / 100)
                ).toLocaleString()}
              </span>
              {/* Discount badge */}
              <span className="text-xs sm:text-sm font-medium text-white py-1 px-2 bg-[#C10E21] rounded-lg">
                {data?.saleDiscount}% OFF
              </span>
            </div>
          ) : (
            // Regular price
            <p className="text-lg sm:text-xl font-semibold">
              <span className="font-serif">₹</span>
              {Number(data?.price ?? 0).toLocaleString()}
            </p>
          )}

          <div className="text-gray-400 text-xs sm:text-sm">
            <Link
              href="/policies/shipping-policy"
              target="_blank"
              rel="noopener noreferrer"
              className={`underline cursor-pointer ${
                darkMode ? "hover:text-gray-200" : "hover:text-gray-800"
              }`}
            >
              Shipping fee
            </Link>{" "}
            applied at checkout.
          </div>

          <QuantitySelector
            quantity={quantity}
            onChange={(newQty) => setQuantity(newQty)}
          />

          <div className="flex sm:flex-row flex-col gap-2 sm:gap-6">
            <Button
              label="Add To Cart"
              isAnimationRequired={true}
              className="w-full"
              onClick={handleAddToCart}
            />
            <Button
              label="Buy Now"
              variant="filled"
              isAnimationRequired={true}
              className="w-full"
            />
          </div>

          {/* ---------------- COLLAPSIBLE SECTIONS ---------------- */}
          <div className="flex flex-col">
            {/* Divider */}
            <div
              className={
                darkMode
                  ? "border-1 border-yellow-400"
                  : "border-1 border-gray-800"
              }
            ></div>

            <Collapse
              title={"Product Details"}
              description={
                Array.isArray(data?.details)
                  ? data.details
                  : data?.details
                  ? [data.details]
                  : undefined
              }
              icon={faClipboardList}
            />
            <Collapse title={"Care Instructions"} icon={faShieldHeart} />
            <Collapse title={"Customized Instructions"} icon={faPalette} />
            <Collapse title={"Shipping Instructions"} icon={faTruck} />
          </div>

          {/* Share Button */}
          <div>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator
                    .share({
                      title: data?.title,
                      text: "Check out this product!",
                      url: window.location.href,
                    })
                    .catch((err) => console.error("Share failed:", err));
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Link copied to clipboard!");
                }
              }}
              className={`flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-medium rounded-lg transition-colors duration-200 cursor-pointer
      ${
        darkMode
          ? "bg-yellow-400 text-black hover:bg-yellow-500"
          : "bg-gray-900 text-white hover:bg-gray-800"
      }`}
            >
              <FontAwesomeIcon icon={faUpload} className="text-sm" />
              Share
            </button>
          </div>
        </div>
      </div>
    </ProductsContainer>
  );
};

export default ProductsPage;
