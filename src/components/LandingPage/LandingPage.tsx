"use client";
import { RootState } from "@/store/store";
import { LandingPageContent } from "@/utils/commonJson";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CategorySection from "./CategorySection";

const LandingPage = () => {
  const [current, setCurrent] = useState(0);
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  const handleNext = React.useCallback(() => {
    setCurrent((prev) => (prev + 1) % LandingPageContent?.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [handleNext]);

  return (
    <>
      <div
        className={`flex items-center justify-center p-0 ${
          darkMode ? "bg-black" : "bg-gray-50"
        }`}
      >
        <div className="w-full">
          {/* Image Slider */}
          <div className="relative w-full h-[400px] sm:h-[500px] overflow-hidden shadow-lg">
            <div
              className="flex transition-transform duration-1000 ease-in-out h-full"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {LandingPageContent.map((img) => (
                <div
                  key={img.id}
                  className="w-full flex-shrink-0 h-full relative"
                >
                  <Image
                    src={img.imageLink}
                    alt={img.imageTitle}
                    fill
                    className="object-cover"
                    priority
                  />

                  {/* Desktop Overlay Content */}
                  <div className="hidden sm:flex absolute inset-0 items-center justify-center">
                    <div
                      className={`${
                        darkMode
                          ? "bg-gray-900/80 text-white"
                          : "bg-white/80 text-gray-900"
                      } backdrop-blur-md px-6 py-4 rounded-lg shadow-lg text-center max-w-md`}
                    >
                      <h2 className="text-2xl font-bold mb-3">
                        {img.imageTitle}
                      </h2>
                      <p className="mb-5 text-sm">{img.imageDescription}</p>
                      <button
                        className={`px-5 py-2 rounded-lg transition cursor-pointer ${
                          darkMode
                            ? "bg-yellow-400 text-white hover:bg-yellow-400 hover:font-medium"
                            : "bg-gray-900 text-white hover:bg-gray-800"
                        }`}
                      >
                        {img.imageButton}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Content (Outside image, below it) */}
          <div className={`sm:hidden overflow-hidden`}>
            <div
              className="flex transition-transform duration-1000 ease-in-out my-8"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {LandingPageContent?.map((img) => (
                <div
                  key={img.id}
                  className={`w-full flex-shrink-0 flex flex-col items-center justify-center text-center px-6 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  <h2 className="text-lg font-bold mb-2">{img.imageTitle}</h2>
                  <p className="mb-4 text-sm">{img.imageDescription}</p>
                  <button
                    className={`px-5 py-2 rounded-lg transition cursor-pointer ${
                      darkMode
                        ? "bg-yellow-400 text-white hover:bg-yellow-400 hover:font-medium"
                        : "bg-gray-900 text-white hover:bg-gray-800"
                    }`}
                  >
                    {img.imageButton}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <CategorySection />
    </>
  );
};

export default LandingPage;
