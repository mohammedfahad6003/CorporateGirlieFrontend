"use client";

import ProductsContainer from "@/components/ContainerStyles/ProductsContainer";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faCircleArrowLeft,
  faSpinner,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import ShoppingCartContainer from "./ShoppingCartContainer";
import { clearCart } from "@/store/addCartSlice";
import { smoothScrollToTop } from "@/utils/helperFunctions";

const ShoppingCart: React.FC = () => {
  const dispatch = useDispatch();

  const router = useRouter();

  const cartItems = useSelector((state: RootState) => state.cart.items);

  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  const [loading, setLoading] = useState(false);

  const handleClearCart = () => {
    setLoading(true);
    setTimeout(() => {
      dispatch(clearCart());
      setLoading(false);
      router.refresh();
    }, 3000);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      smoothScrollToTop();
    }
  }, []);

  return (
    <ProductsContainer>
      {/* Header */}
      <div className="flex flex-row justify-between items-center mb-4 sm:mb-8">
        <div className="flex items-center gap-3">
          <FontAwesomeIcon
            icon={faCircleArrowLeft}
            className={`cursor-pointer text-base sm:text-2xl ${
              darkMode ? "text-yellow-400" : "text-gray-800"
            }`}
            onClick={() => router.back()}
          />
          <h2 className="text-xl sm:text-3xl font-bold">Shopping Cart</h2>
        </div>

        {cartItems.length > 0 && !loading && (
          <button
            onClick={handleClearCart}
            className={`group flex items-center text-xs sm:text-sm font-medium
                 cursor-pointer transition-colors duration-200
                 underline sm:no-underline sm:hover:underline sm:hover:underline-offset-2`}
          >
            <span>Clear Cart</span>
            <span>
              <FontAwesomeIcon
                icon={faTrashCan}
                className={`ml-1 sm:ml-3 hidden sm:group text-lg transform transition-transform duration-300
                   group-hover:-rotate-12 group-hover:-translate-y-0.5 group-hover:animate-bounce
                ${darkMode ? "text-yellow-400" : "text-gray-800"}`}
              />
            </span>
          </button>
        )}

        {/* Loading state */}
        {loading && (
          <div
            className={`flex items-center gap-2 text-xs sm:text-sm font-medium
               cursor-wait animate-pulse ${
                 darkMode ? "text-white" : "text-gray-800"
               }`}
          >
            <span>Clearing...</span>
            <FontAwesomeIcon
              icon={faSpinner}
              spin
              className={`text-lg ${
                darkMode ? "text-yellow-400" : "text-gray-800"
              }`}
            />
          </div>
        )}
      </div>

      {/* If loading, show overlay */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 animate-pulse">
          <FontAwesomeIcon
            icon={faSpinner}
            spin
            className={`text-6xl mb-4 ${
              darkMode ? "text-yellow-400" : "text-gray-800"
            }`}
          />
          <p className={`text-lg sm:text-xl`}>Clearing your cart...</p>
        </div>
      ) : cartItems.length === 0 ? (
        /* Empty Cart */
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <FontAwesomeIcon icon={faBagShopping} className="text-6xl mb-4" />
          <p className="text-lg sm:text-xl">Your cart is empty</p>
          <p className="text-sm sm:text-base mt-1">
            Add items to see them here
          </p>
        </div>
      ) : (
        /* Cart Items + Price Details */
        <ShoppingCartContainer />
      )}
    </ProductsContainer>
  );
};

export default ShoppingCart;
