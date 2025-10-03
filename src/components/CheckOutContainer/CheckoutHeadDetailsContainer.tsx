import { CartItem } from "@/store/addCartSlice";
import { RootState } from "@/store/store";
import {
  calculateDiscountAmount,
  calculateShipping,
} from "@/utils/helperFunctions";
import { faAngleDoubleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CheckoutHeadDetailsContainer = () => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const discountValue = useSelector(
    (state: RootState) => state.discount.discountValue
  );

  const [orderSummaryOpen, setOrderSummaryOpen] = useState(false);

  const getDiscountedPrice = (item: CartItem) => {
    if (!item.isSale || !item.discount) return Math.round(Number(item.price));
    const discounted = item.price - (item.price * item.discount) / 100;
    return Math.round(discounted);
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + getDiscountedPrice(item) * item.quantity,
    0
  );

  const total =
    subtotal +
    calculateShipping(subtotal) -
    calculateDiscountAmount(discountValue, subtotal);

  const calculateDiscountedPrice = (item: CartItem) => {
    if (!item || typeof item.price !== "number")
      return Math.round(item?.price ?? 0);

    const discount = item.discount ?? 0;

    const total = item.price - (item.price * discount) / 100;

    return Math.round(total);
  };

  const [height, setHeight] = useState("0px");
  const contentRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (orderSummaryOpen) {
      setHeight(`${contentRef.current?.scrollHeight}px`);
    } else {
      setHeight("0px");
    }
  }, [orderSummaryOpen]);

  return (
    <div
      className={`max-w-full py-4 px-6 sm:py-6 sm:px-8 md:px-16 2xl:px-48 select-none ${
        darkMode
          ? "border-l-2 border-r-2 border-b-2 border-black bg-yellow-400"
          : "border-l-2 border-r-2 border-b-2 border-gray-800 bg-gray-800"
      }`}
    >
      <div className="flex items-center justify-between">
        {/* Left - Order Summary with icon */}
        <div
          className={`cursor-pointer flex items-center gap-2 text-sm sm:text-lg font-medium ${
            darkMode ? "text-black" : "text-white"
          }`}
          onClick={() => setOrderSummaryOpen(!orderSummaryOpen)}
        >
          Order Summary
          <FontAwesomeIcon
            icon={faAngleDoubleDown}
            className={`transition duration-300 ${
              orderSummaryOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>

        {/* Right - Total Price */}
        <div
          className={`text-sm sm:text-lg font-semibold ${
            darkMode ? "text-black" : "text-white"
          }`}
        >
          <span className="font-sans">₹</span>{" "}
          {total?.toLocaleString("en-IN") ?? 0}
        </div>
      </div>

      {/* Order Details */}
      <div
        ref={contentRef}
        style={{ maxHeight: height }}
        className={`overflow-hidden transition-all duration-500 ease-in-out rounded-lg ${
          darkMode
            ? "border border-gray-700 bg-gray-950"
            : "border border-gray-200 bg-gray-50"
        } ${orderSummaryOpen ? "mt-4" : "border-none"}`}
      >
        {cartItems.length > 0 ? (
          <ul className="space-y-1.5 sm:space-y-3 p-2 sm:p-4">
            {cartItems.map((item, index) => {
              const discountedPrice = getDiscountedPrice(item);
              return (
                <li
                  key={index}
                  className="flex justify-between items-center p-2 border-b last:border-b-0 
                 border-gray-600/40 text-sm sm:text-base"
                >
                  {/* Left - Title + Quantity */}
                  <div className="flex items-center gap-3">
                    <div className="relative w-8 h-8 sm:w-12 sm:h-12">
                      <Image
                        src={item.image || "/unsplashImage1.png"}
                        alt={item.title}
                        fill
                        className="rounded-md object-cover"
                      />
                      <div
                        className="absolute bottom-0 w-full bg-black/50 text-white 
                                   text-[8px] sm:text-[10px] text-center py-0.5 sm:py-1 rounded-b-md"
                      >
                        {item?.quantity} unit{item?.quantity > 1 ? "s" : ""}
                      </div>
                    </div>

                    <div>
                      <p className="font-medium text-xs sm:text-base">
                        {item.title}
                      </p>
                      <p className="text-xs sm:text-sm opacity-70">
                        <span className="font-medium">
                          <span className="font-sans">₹ </span>
                          {Math.round(
                            calculateDiscountedPrice(item)
                          ).toLocaleString("en-IN")}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Right - Price */}
                  <div className="font-semibold text-right">
                    <span className="font-sans">₹</span>{" "}
                    {item.isSale && item.discount ? (
                      <>
                        <span className="font-medium">
                          {(discountedPrice * item.quantity)?.toLocaleString(
                            "en-IN"
                          )}
                        </span>
                      </>
                    ) : (
                      <span className="font-medium">
                        {(item.price * item.quantity)?.toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
            No items in your cart
          </p>
        )}
      </div>
    </div>
  );
};

export default CheckoutHeadDetailsContainer;
