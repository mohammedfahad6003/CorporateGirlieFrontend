"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const DeliveryInstructions: React.FC = () => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  return (
    <div
      className={`w-full p-4 rounded-md ${
        darkMode
          ? "bg-gray-950 text-white border-2 border-yellow-400"
          : "bg-gray-100 text-gray-800"
      }`}
    >
      <div className="mb-4 text-sm">
        Please review our delivery timelines to know when to expect your order:
      </div>

      <div className="mb-5">
        <ul className="list-disc ml-6 sm:ml-8 space-y-2 text-xs sm:text-sm">
          <li>
            We generally require <strong>10–15 business days</strong> to process
            and dispatch your order.
          </li>
          <li>
            If the item is <strong>ready in stock</strong>, it will be
            dispatched within <strong>2 business days</strong>.
          </li>
          <li>
            Delivery timelines vary by location, typically{" "}
            <strong>5–7 business days</strong> after dispatch.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DeliveryInstructions;
