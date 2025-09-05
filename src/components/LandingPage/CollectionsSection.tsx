import { RootState } from "@/store/store";
import { LandingPageContent } from "@/utils/commonJson";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const CollectionsSection = () => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  return (
    <div
      className={`${
        darkMode ? "bg-black text-white" : "bg-gray-50 text-black"
      } w-full`}
    >
      <div className="lg:p-10 sm:p-8 p-6 lg:mx-12 mx-0">
        {/* Heading */}
        <h1 className="lg:text-5xl sm:text-3xl text-2xl font-medium mb-6">
          Catalog
        </h1>

        {/* Images grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">
          {LandingPageContent.map((item) => (
            <div
              key={item.id}
              className={`
                ${
                  darkMode
                    ? "bg-gray-900 border border-yellow-400"
                    : "bg-gray-100"
                } 
                rounded-md overflow-hidden flex flex-col cursor-pointer
                transform transition-transform duration-300 hover:scale-105
                ${
                  darkMode
                    ? "hover:shadow-[0_0_20px_3px_rgba(250,204,21,0.2)]"
                    : "hover:shadow-2xl"
                }
              `}
            >
              {/* Image */}
              <div className="relative w-full h-48">
                <Image
                  src={item.imageLink}
                  alt={item.imageTitle}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Title + Arrow */}
              <div
                className={`flex items-center justify-between p-4 sm:p-6 ${
                  darkMode
                    ? "bg-black text-white border-t border-yellow-400"
                    : "bg-white text-gray-800"
                }`}
              >
                <h3 className="text-lg font-semibold">{item.imageTitle}</h3>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className={`text-xl ${
                    darkMode ? "text-yellow-400" : "text-gray-700"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollectionsSection;
