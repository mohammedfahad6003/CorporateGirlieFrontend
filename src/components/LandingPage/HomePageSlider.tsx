import { RootState } from "@/store/store";
import { LandingPageContent } from "@/utils/commonJson";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "../Button/Button";
import { useRouter } from "next/navigation";

const HomePageSlider = () => {
  const [current, setCurrent] = useState(0);
  const router = useRouter();
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

  const borderColor = darkMode ? "border-yellow-400" : "border-gray-300";

  return (
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
                    } backdrop-blur-md px-6 py-4 rounded-lg shadow-lg text-center max-w-md
                    border-2 ${borderColor}`}
                  >
                    <h2 className="text-2xl font-bold mb-3">
                      {img.imageTitle}
                    </h2>
                    <p className="mb-5 text-sm">{img.imageDescription}</p>
                    <div className="flex justify-center">
                      <Button
                        label={img.imageButton}
                        variant="filled"
                        className={
                          "w-fit sm:text-lg text-sm px-5 py-2.5 sm:px-6 sm:py-3 transition font-normal"
                        }
                        onClick={() => router.push(`${img.imageNavigation}`)}
                      />
                    </div>
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
                <Button
                  label={img.imageButton}
                  variant="filled"
                  className={
                    "w-fit sm:text-lg text-sm px-5 py-2.5 sm:px-6 sm:py-3 transition font-normal"
                  }
                  onClick={() => router.push(`${img.imageNavigation}`)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageSlider;
