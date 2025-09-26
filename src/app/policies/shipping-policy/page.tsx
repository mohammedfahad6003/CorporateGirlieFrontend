"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Link from "next/link";
import PolicyContainer from "@/components/ContainerStyles/PolicyContainer";

const ShippingPolicy = () => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const textColor = darkMode ? "text-white" : "text-gray-900";

  return (
    <PolicyContainer>
      <h1 className={`text-3xl sm:text-4xl font-bold mb-6 ${textColor}`}>
        Shipping Policy
      </h1>

      <p className="mb-4">
        At <strong>The Corporate Girlie Arts</strong>, we are committed to
        delivering your orders promptly and securely across India. Please review
        our shipping policy to understand our processes and timelines.
      </p>

      {/* Sub-headings adjusted */}
      <h2 className={`text-lg sm:text-xl font-semibold mt-6 mb-2 ${textColor}`}>
        Order Processing Time
      </h2>
      <ul className="list-none space-y-2 mb-4">
        <li className="before:content-['-'] before:mr-2">
          Processing Time: All orders are processed within{" "}
          <strong>8–10 business days</strong>.
        </li>
        <li className="before:content-['-'] before:mr-2">
          Business Hours: Orders placed after <strong>6 PM IST</strong> will be
          processed on the next business day.
        </li>
        <li className="before:content-['-'] before:mr-2">
          Order Status: You will receive an email notification once your order
          has been dispatched.
        </li>
        <li className="before:content-['-'] before:mr-2">
          All orders are <strong>hand-painted</strong> and require time. If the
          ordered product is ready, it will be processed within{" "}
          <strong>2 working days</strong>. If not, please expect{" "}
          <strong>10–15 working days</strong> for completion & delivery.
        </li>
      </ul>

      <h2 className={`text-lg sm:text-xl font-semibold mt-6 mb-2 ${textColor}`}>
        Shipping Methods & Delivery Times
      </h2>
      <ul className="list-none space-y-2 mb-4">
        <li className="before:content-['-'] before:mr-2">
          Standard Shipping: Delivery within{" "}
          <strong>5–7 business days</strong>.
        </li>
        <li className="before:content-['-'] before:mr-2">
          <em>Note:</em> Delivery times are estimates and may vary based on the
          destination and courier service.
        </li>
      </ul>

      <h2 className={`text-lg sm:text-xl font-semibold mt-6 mb-2 ${textColor}`}>
        Shipping Charges
      </h2>
      <ul className="list-none space-y-2 mb-4">
        <li className="before:content-['-'] before:mr-2">
          Standard Shipping: <span className="font-sans">₹</span>100
        </li>
        <li className="before:content-['-'] before:mr-2">
          All charges are applied at checkout.
        </li>
      </ul>

      <h2 className={`text-lg sm:text-xl font-semibold mt-6 mb-2 ${textColor}`}>
        Order Tracking
      </h2>
      <ul className="list-none mb-4">
        <li className="before:content-['-'] before:mr-2">
          Once your order has been dispatched, you will receive an email with a
          tracking number and a link to track your shipment.
        </li>
      </ul>

      <h2 className={`text-lg sm:text-xl font-semibold mt-6 mb-2 ${textColor}`}>
        Shipping Restrictions
      </h2>
      <ul className="list-none space-y-2 mb-4">
        <li className="before:content-['-'] before:mr-2">
          P.O. Boxes: We do not ship to P.O. Box addresses.
        </li>
        <li className="before:content-['-'] before:mr-2">
          Remote Areas: Certain remote areas may take longer for delivery. We
          will notify you in case of any delays.
        </li>
      </ul>

      <h2 className={`text-lg sm:text-xl font-semibold mt-6 mb-2 ${textColor}`}>
        In-Store Pickup
      </h2>
      <p className="mb-4 before:content-['-'] before:mr-2">
        We currently do not offer in-store pickup options. All orders are
        shipped directly to the provided delivery address.
      </p>

      <h2 className={`text-lg sm:text-xl font-semibold mt-6 mb-2 ${textColor}`}>
        Contact Us
      </h2>
      <p className="mb-4 relative pl-4 before:content-['-'] before:absolute before:left-0">
        If you have any questions or need assistance with your order, please
        contact us at:{" "}
        <Link
          href="/contact-us"
          className={`text-yellow-400 hover:underline hover:text-yellow-400`}
        >
          Contact Us Page
        </Link>
      </p>
    </PolicyContainer>
  );
};

export default ShippingPolicy;
