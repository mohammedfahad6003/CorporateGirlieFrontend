import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { getTestimonials } from "@/services/testimonials.service";

interface Testimonial {
  _id: string;
  name: string;
  location?: string;
  productName: string;
  message: string;
}

const TestimonialsDisplay = () => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [startIndex, setStartIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 640);

  const containerRef = useRef<HTMLDivElement>(null);

  // Update isDesktop on resize
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch testimonials
  useEffect(() => {
    getTestimonials()
      .then((res) => setTestimonials(res))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // Auto-scroll for desktop
  useEffect(() => {
    if (!isDesktop || testimonials.length <= 3) return;

    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials, isDesktop]);

  // Prepare displayed testimonials
  const displayedTestimonials = isDesktop
    ? [...testimonials, ...testimonials.slice(0, 3)] // duplicate for seamless loop
    : testimonials.slice(0, 3);

  // Width of each card for translateX calculation
  const cardWidthPercent = isDesktop ? 33.3 : 100;
  const translateX = -(startIndex * cardWidthPercent);

  return (
    <div
      className={`${
        darkMode
          ? "bg-black text-white border-t border-yellow-400"
          : "bg-gray-200 text-black"
      } sm:p-8 p-6`}
    >
      <h2
        className={`sm:text-2xl font-bold text-lg mb-6 text-center ${
          darkMode ? "text-yellow-400" : "text-gray-900"
        }`}
      >
        Voices of Our Customers
      </h2>

      {loading ? (
        <p className="text-center">Loading testimonials...</p>
      ) : testimonials.length === 0 ? (
        <p className="text-center">No testimonials found.</p>
      ) : (
        <div
          className={`overflow-hidden relative ${
            isDesktop ? "" : "flex flex-col gap-6"
          }`}
        >
          {isDesktop ? (
            <div
              ref={containerRef}
              className="flex gap-6 transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(${translateX}%)`,
              }}
            >
              {displayedTestimonials.map((t, idx) => (
                <div
                  key={t._id + idx}
                  className={`flex-shrink-0 w-full sm:w-[calc(33.333%-20px)] p-6 rounded-xl shadow-md flex flex-col justify-between h-auto sm:h-[220px]
                    ${
                      darkMode
                        ? "bg-black text-white border border-yellow-400"
                        : "bg-white text-black"
                    }`}
                >
                  <div className="break-words">
                    <h3
                      className={`font-semibold text-base sm:text-lg truncate ${
                        darkMode ? "text-yellow-400" : ""
                      }`}
                      title={t?.name ?? ""}
                    >
                      {t?.name ?? ""}
                    </h3>
                    {t?.location && (
                      <span
                        className="font-normal text-xs sm:text-base mb-2 block truncate"
                        title={t.location ?? ""}
                      >
                        {t.location ?? ""}
                      </span>
                    )}
                    <p
                      className="text-xs sm:text-sm italic mb-3 truncate"
                      title={t.productName ?? ""}
                    >
                      {t?.productName ?? ""}
                    </p>
                    <p className="text-xs sm:text-sm break-words">
                      {t.message ?? ""}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            testimonials.slice(0, 3).map((t) => (
              <div
                key={t._id}
                className={`w-full p-6 rounded-xl shadow-md flex flex-col justify-between h-auto mb-4
                ${
                  darkMode
                    ? "bg-black text-white border border-yellow-400"
                    : "bg-white text-black"
                }`}
              >
                <div className="break-words">
                  <h3
                    className={`font-semibold text-base sm:text-lg truncate ${
                      darkMode ? "text-yellow-400" : ""
                    }`}
                    title={t?.name ?? ""}
                  >
                    {t?.name ?? ""}
                  </h3>
                  {t?.location && (
                    <span
                      className="font-normal text-xs sm:text-sm mb-1 block truncate"
                      title={t.location ?? ""}
                    >
                      {t.location ?? ""}
                    </span>
                  )}
                  <p
                    className="text-xs sm:text-sm italic mb-3 truncate"
                    title={t.productName ?? ""}
                  >
                    {t?.productName ?? ""}
                  </p>
                  <p className="text-xs sm:text-sm break-words">
                    {t.message ?? ""}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default TestimonialsDisplay;
