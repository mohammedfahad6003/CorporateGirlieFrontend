"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCookieBite } from "@fortawesome/free-solid-svg-icons";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [minimized, setMinimized] = useState(false);

  useEffect(() => {
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(";").shift();
    };

    const consent = getCookie("cookieConsent");

    if (!consent) {
      setVisible(true);
    } else {
      setMinimized(true);
    }
  }, []);

  const handleConsent = (choice: "accepted" | "declined") => {
    document.cookie = `cookieConsent=${choice}; path=/; max-age=${
      60 * 60 * 24 * 365
    }; SameSite=Lax`;

    setVisible(false);

    // small delay before showing minimized button
    setTimeout(() => {
      setMinimized(true);
    }, 300);
  };

  if (!visible && !minimized) return null;

  return (
    <>
      {/* Full banner */}
      {visible && (
        <div className="fixed bottom-20 sm:bottom-5 left-1/2 -translate-x-1/2 w-[90%] sm:w-[70%] max-w-xl bg-white/95 backdrop-blur-lg text-gray-800 px-4 sm:px-6 py-3 sm:py-4 shadow-2xl rounded-2xl z-[1000] border border-pink-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <p className="text-xs sm:text-sm leading-relaxed text-center sm:text-left">
              🍪 We use cookies to improve your browsing experience and analyze
              traffic. By clicking <span className="font-semibold">Accept</span>
              , you agree to our cookie policy.{" "}
              <a
                href="/policies/privacy-policy"
                className="text-pink-500 hover:underline"
              >
                Learn more
              </a>
              .
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
              <button
                onClick={() => handleConsent("accepted")}
                className="px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm bg-gradient-to-r from-pink-400 to-yellow-400 text-white rounded-full shadow-md hover:opacity-90 transition cursor-pointer"
              >
                Accept
              </button>
              <button
                onClick={() => handleConsent("declined")}
                className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-full hover:bg-gray-100 transition cursor-pointer"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating button */}
      {!visible && minimized && (
        <button
          onClick={() => setVisible(true)}
          className="cookie-btn fixed bottom-5 right-5 bg-gradient-to-r from-pink-400 to-yellow-400 text-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-full shadow-lg text-xs sm:text-sm hover:opacity-90 transition z-[999] flex items-center gap-2 cursor-pointer"
        >
          <FontAwesomeIcon icon={faCookieBite} />
          <span className="hidden md:inline">Cookies</span>
        </button>
      )}
    </>
  );
}