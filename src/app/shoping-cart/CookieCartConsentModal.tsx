"use client";

import { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCookieBite } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface CookieConsentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  triggerShake?: boolean; // 👈 new prop
}

const CookieConsentModal: React.FC<CookieConsentModalProps> = ({
  isOpen,
  onClose,
  onAccept,
  triggerShake = false,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    if (triggerShake) {
      setIsShaking(true);
      const timer = setTimeout(() => setIsShaking(false), 3000); // stop shake after 3s
      return () => clearTimeout(timer);
    }
  }, [triggerShake]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className={`relative w-[80%] sm:max-w-lg mx-auto transform transition-transform duration-300 ease-out
          ${
            darkMode
              ? "bg-gray-900 text-white border border-yellow-400"
              : "bg-white text-gray-900"
          }
          rounded-2xl shadow-2xl p-6 flex flex-col items-center gap-4 sm:gap-6 
          ${isShaking ? "animate-shake" : ""}`} // 👈 apply shake
      >
        {/* Close */}
        <button
          onClick={onClose}
          className={`absolute top-2 sm:top-4 right-2 sm:right-4 p-1 sm:p-2 rounded-full transition-colors cursor-pointer ${
            darkMode
              ? "text-yellow-400 hover:text-yellow-300"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <FontAwesomeIcon icon={faTimes} className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Icon */}
        <div
          className={`flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full shadow-md ${
            darkMode
              ? "bg-yellow-400 text-black"
              : "bg-yellow-100 text-yellow-600"
          }`}
        >
          <FontAwesomeIcon icon={faCookieBite} className="text-2xl" />
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-bold text-center">
          Please Accept Cookies
        </h2>

        {/* Body */}
        <p className="text-sm sm:text-base text-center leading-relaxed p-0 sm:px-2">
          To continue, we require your consent to temporarily use your{" "}
          <span className="font-semibold">name, email, phone, </span>&{" "}
          <span className="font-semibold">address</span> for generating payment
          details and completing your order. We do not keep this information
          after processing.
        </p>

        {/* Footer */}
        <div className="flex gap-4 w-full flex-col sm:flex-row justify-center mt-4">
          <button
            className={`flex-1 px-2 py-2 sm:px-4 sm:py-3 text-sm sm:text-base rounded-lg border transition-all duration-200 shadow-sm ${
              darkMode
                ? "border-yellow-400 bg-yellow-400 text-black hover:bg-yellow-300"
                : "border-gray-800 bg-gray-800 text-white hover:bg-gray-600"
            } cursor-pointer`}
            onClick={onAccept}
          >
            Accept & Continue
          </button>

          <button
            className={`flex-1 px-2 py-2 sm:px-4 sm:py-3 text-sm sm:text-base rounded-lg border transition-all duration-200 ${
              darkMode
                ? "border-gray-700 bg-gray-800 text-gray-200 hover:bg-gray-700"
                : "border-gray-400 bg-white text-gray-700 hover:bg-gray-100"
            } cursor-pointer`}
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentModal;
