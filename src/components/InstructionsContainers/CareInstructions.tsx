"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { careInstructionData } from "@/utils/commonJson";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStarOfLife } from "@fortawesome/free-solid-svg-icons";

const CareInstructions: React.FC = () => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  return (
    <div
      className={`w-full p-4 rounded-md ${
        darkMode
          ? "bg-gray-950 text-white border-2 border-yellow-400"
          : "bg-gray-100 text-gray-800"
      }`}
    >
      <div className="mb-4 text-xs sm:text-sm">
        Each piece is handcrafted – gentle handling ensures its longevity and
        vibrancy.
      </div>

      {careInstructionData.map((section, i) => (
        <div key={i} className="mb-5 last:mb-0">
          <h3
            className={`font-medium mb-2 flex items-center gap-2 text-sm sm:text-base underline underline-offset-4 ${
              darkMode ? "decoration-yellow-400" : "decoration-gray-800"
            }`}
          >
            <FontAwesomeIcon
              icon={faStarOfLife}
              className={`text-[10px] sm:text-xs ${
                darkMode ? "text-yellow-400" : "text-gray-800"
              }`}
            />
            {section.title}
          </h3>
          <ol className="list-decimal ml-8 sm:ml-10 space-y-1 text-[10px] sm:text-xs lg:text-sm">
            {section.items.map((item, j) => (
              <li key={j}>{item}</li>
            ))}
          </ol>
        </div>
      ))}

      <div className="mt-2 text-xs sm:text-sm">
        {`Each piece is uniquely hand-painted - handle with care to cherish it for years.`}
      </div>
    </div>
  );
};

export default CareInstructions;
