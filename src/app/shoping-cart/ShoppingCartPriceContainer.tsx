import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { CartItem } from "@/store/addCartSlice";
import {
  calculateDiscountAmount,
  calculateShipping,
} from "@/utils/helperFunctions";

const ShoppingCartPriceContainer = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  const discountValue = useSelector(
    (state: RootState) => state.discount.discountValue
  );

  // Helper: calculate discounted price
  const getDiscountedPrice = (item: CartItem) => {
    if (!item.isSale || !item.discount) return Math.round(Number(item.price));
    const discounted = item.price - (item.price * item.discount) / 100;
    return Math.round(discounted);
  };

  // Subtotal = sum of discounted price * quantity
  const subtotal = cartItems.reduce(
    (acc, item) => acc + getDiscountedPrice(item) * item.quantity,
    0
  );

  const finalTotal =
    subtotal +
    calculateShipping(subtotal) -
    calculateDiscountAmount(discountValue, subtotal);

  return (
    <div
      className={`p-4 rounded-lg border ${
        darkMode
          ? "bg-gray-950 text-white border-yellow-400"
          : "bg-gray-50 text-gray-800 border-gray-400"
      }`}
    >
      <h3 className="text-base sm:text-lg font-semibold mb-4">Price Details</h3>

      {/* Product-wise Breakdown */}
      <div className="mb-4 space-y-3 text-sm sm:text-base">
        {cartItems.map((item) => {
          const discountedPrice = getDiscountedPrice(item);
          return (
            <div key={item.id} className="flex flex-col gap-1">
              <div
                className={`font-medium text-sm sm:text-base truncate ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                {item.title}
              </div>
              <div className="flex justify-between">
                <span
                  className={`text-xs sm:text-sm ${
                    darkMode ? "text-gray-500" : "text-gray-700"
                  }`}
                >
                  (
                  {item.isSale && item.discount ? (
                    <>
                      <span className="font-sans">₹ </span>
                      {discountedPrice.toLocaleString("en-IN")}
                    </>
                  ) : (
                    <>
                      <span className="font-sans">₹ </span>
                      {Math.round(Number(item.price)).toLocaleString("en-IN")}
                    </>
                  )}{" "}
                  × {item.quantity} )
                </span>
                <span className="text-sm sm:text-base">
                  <span className="font-sans">₹ </span>
                  {(discountedPrice * item.quantity).toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t my-2"></div>

      {/* Subtotal */}
      <div className="flex justify-between mb-2 text-sm sm:text-base">
        <span>Subtotal</span>
        <span>
          <span className="font-sans">₹ </span>
          {subtotal.toLocaleString("en-IN")}
        </span>
      </div>

      {/* Discount Value */}
      {calculateDiscountAmount(discountValue ?? 0, subtotal ?? 0) > 0 && (
        <div className="flex justify-between mb-2 text-sm sm:text-base">
          <span>Discount</span>
          <span className="text-green-500">
            - <span className="font-sans">₹ </span>
            {calculateDiscountAmount(
              discountValue ?? 0,
              subtotal ?? 0
            )?.toLocaleString("en-IN")}
          </span>
        </div>
      )}

      {/* Shipping */}
      <div className="flex justify-between mb-2 text-sm sm:text-base">
        <span>Shipping</span>
        <span>
          <span className="font-sans">₹ </span>
          {calculateShipping(subtotal)}
        </span>
      </div>

      <div className="border-t my-2"></div>

      {/* Final Total */}
      <div className="flex justify-between text-base sm:text-lg font-bold">
        <span>Total</span>
        <span>
          <span className="font-sans">₹ </span>
          {finalTotal.toLocaleString("en-IN")}
        </span>
      </div>
    </div>
  );
};

export default ShoppingCartPriceContainer;
