"use client";

import React, { useEffect } from "react";
import { RootState } from "@/store/store";

import { smoothScrollToTop } from "@/utils/helperFunctions";
import CheckoutHeadDetailsContainer from "../../components/CheckOutContainer/CheckoutHeadDetailsContainer";
import CheckoutLeftContainer from "@/components/CheckOutContainer/CheckoutLeftContainer";
import CheckoutRightContainer from "@/components/CheckOutContainer/CheckoutRightContainer";
import { useSelector } from "react-redux";

const CheckoutPage = () => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  useEffect(() => {
    if (typeof window !== "undefined") {
      smoothScrollToTop();
    }
  }, []);

  return (
    <div
      className={`select-none min-h-screen ${
        darkMode ? "bg-black text-white" : "text-black bg-white"
      }`}
    >
      {/* Head Styles */}
      <CheckoutHeadDetailsContainer />

      {/* User & Payment Section */}
      <div className="max-w-full p-6 sm:py-12 sm:px-8 md:px-16 2xl:px-48 space-y-6 select-none">
        <div className="flex flex-col sm:flex-row gap-8">
          {/* Left - User Details */}
          <CheckoutLeftContainer />

          {/* Right - Payment Details */}
          <CheckoutRightContainer />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
