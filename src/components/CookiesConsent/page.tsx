"use client";

import { loadConsentFromCookie, setConsent } from "@/store/cookieSlice";
import { AppDispatch, RootState } from "@/store/store";
import { faCookieBite } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function CookieConsent() {
  const consent = useSelector((state: RootState) => state.consent.consent);
  const dispatch = useDispatch<AppDispatch>();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    dispatch(loadConsentFromCookie());
  }, [dispatch]);

  useEffect(() => {
    if (consent === null || consent === undefined) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [consent]);

  return (
    <>
      {/* Full banner */}
      {visible && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[90%] sm:w-[70%] max-w-xl sm:max-w-3xl bg-white/95 backdrop-blur-lg text-gray-800 px-4 sm:px-6 py-3 sm:py-4 shadow-2xl rounded-2xl z-[1000] border border-pink-200">
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
            <div className="flex flex-wrap sm:flex-nowrap gap-2 sm:gap-3 justify-center">
              <button
                onClick={() => {
                  dispatch(setConsent("accepted"));
                  setVisible(false);
                }}
                className="px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm bg-gradient-to-r from-pink-400 to-yellow-400 text-white rounded-full shadow-md hover:opacity-90 transition cursor-pointer"
              >
                Accept
              </button>
              <button
                onClick={() => {
                  dispatch(setConsent("declined"));
                  setVisible(false);
                }}
                className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-full hover:bg-gray-100 transition cursor-pointer"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating button */}
      {!visible && consent && (
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
