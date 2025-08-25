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

const LandingPage = () => {
  const images = ["/unsplashImage1.jpg", "/unsplashImage2.jpg"];
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

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
    <div className="w-full">
      {/* Image Slider */}
      <div className="relative w-full h-[400px] overflow-hidden rounded-xl shadow-lg">
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
          className=""
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        {/* Dots */}
        <div className="flex gap-2">
          {images.map((_, index) => (
            <span
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                current === index ? "bg-yellow-400" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Right Button */}
        <button
          onClick={handleNext}
          className=""
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>

        {/* Play / Pause Button */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className=""
        >
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
        </button>
      </div>

      {/* Overlay Button Below Image */}
      <div className="flex justify-center mt-4">
        <button className="bg-black/60 text-white px-6 py-2 rounded-full text-lg font-semibold shadow-md hover:bg-black/80 transition">
          ART and CRAFT
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
