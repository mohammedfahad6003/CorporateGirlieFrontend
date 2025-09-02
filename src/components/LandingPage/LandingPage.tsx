"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faPlay,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const LandingPage = () => {
  const images = ["/unsplashImage1.jpg", "/unsplashImage2.jpg"];
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  const handleNext = React.useCallback(() => {
    setCurrent((prev) => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, handleNext]);

  const handlePrev = React.useCallback(() => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  return (
    <div className="flex items-center justify-center p-0 mb-4 sm:mb-10">
      <div className="w-full">
        {/* Image Slider */}
        <div className="relative w-full h-[400px] sm:h-[500px] overflow-hidden shadow-lg">
          <div
            className="flex transition-transform duration-1000 ease-in-out h-full"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {images.map((img, index) => (
              <div key={index} className="w-full flex-shrink-0 h-full relative">
                <Image
                  src={img}
                  alt={`Slide ${index}`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            ))}
          </div>
        </div>

        {/* Buttons Container */}
        <div className="flex items-center justify-center gap-4 mt-4">
          {/* Left Button */}
          <button
            onClick={handlePrev}
            className={darkMode ? "text-gray-600" : "text-black"}
          >
            <FontAwesomeIcon icon={faChevronLeft} className="cursor-pointer" />
          </button>

          {/* Dots */}
          <div className="flex gap-4">
            {images.map((_, index) => (
              <span
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                  current === index ? "bg-yellow-400" : "bg-gray-300"
                }`}
              />
            ))}
          </div>

          {/* Right Button */}
          <button
            onClick={handleNext}
            className={darkMode ? "text-gray-600" : "text-black"}
          >
            <FontAwesomeIcon icon={faChevronRight} className="cursor-pointer" />
          </button>

          {/* Play / Pause Button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={darkMode ? "text-gray-600" : "text-black"}
          >
            <FontAwesomeIcon
              icon={isPlaying ? faPause : faPlay}
              className="cursor-pointer"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
