"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { COMMON_VARIABLES } from "@/utils/commonVariables";

const CustomizedInstructions: React.FC = () => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  return (
    <div
      className={`w-full p-4 rounded-md ${
        darkMode
          ? "bg-gray-950 text-white border-2 border-yellow-400"
          : "bg-gray-100 text-gray-800"
      }`}
    >
      <p className="text-xs sm:text-sm mb-2 leading-6">
        Please note that <strong>only selected products</strong> are eligible
        for customization. To request a customized product, email a clear,
        high-resolution image to{" "}
        <a
          href={`mailto:${COMMON_VARIABLES.emailId}?cc=${COMMON_VARIABLES.ccId}&subject=Customized%20Order`}
          className={`underline ${
            darkMode ? "text-yellow-400" : "text-gray-800"
          }`}
        >
          thecorporategirlie.arts03@gmail.com
        </a>{" "}
        , along with your <strong>order number</strong> and the{" "}
        <strong>product name</strong>
        after successfully placing your order and completing the payment.
      </p>

      <p className="text-xs sm:text-sm mb-2 leading-6">
        Ensure your image is{" "}
        <strong>sharp, well-lit, and accurately represents</strong> the design
        or artwork you wish to customize. This helps us create your product
        exactly as you envision.
      </p>

      <p className="text-xs sm:text-sm mb-2 leading-6">
        We can only start processing your customization request once both your
        <strong> email</strong> and <strong>payment confirmation</strong> are
        received.
      </p>

      <div className="text-xs sm:text-sm leading-6">
        <span className="underline font-medium">Kindly note:</span>
        <ul className="list-disc ml-6 sm:ml-8 mt-2 space-y-2 text-xs sm:text-sm">
          <li>
            Processing and crafting customized orders may take additional time
            depending on the complexity.
          </li>
          <li>
            Include all customization details in your email to avoid delays.
          </li>
          <li>Once customization is confirmed, changes cannot be made.</li>
          <li>
            We are unable to process requests without the required email and
            payment confirmation.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CustomizedInstructions;
