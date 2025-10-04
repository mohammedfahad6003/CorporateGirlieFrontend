"use client";

import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useEffect, useRef, useState } from "react";

const allPaymentIcons = [
  "/payments/upi.png",
  "/payments/visa.png",
  "/payments/mastercard.png",
  "/payments/amazon-pay.png",
  "/payments/amex.png",
  "/payments/bhim.png",
  "/payments/freecharge.png",
  "/payments/google-pay.png",
  "/payments/maestro.png",
  "/payments/mobikwik.png",
  "/payments/paytm.png",
  "/payments/payzapp.png",
  "/payments/phone-pe.png",
  "/payments/rupay.png",
];

const PaymentGatewayInfo = () => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const primaryIcons = isMobile
    ? allPaymentIcons.slice(0, 2)
    : allPaymentIcons.slice(0, 3);

  const tooltipIcons = allPaymentIcons.slice(primaryIcons.length);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        setTooltipOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="mb-4">
        <h2 className="text-base sm:text-xl font-semibold leading-5 sm:leading-7">
          Payment
        </h2>

        <p className="text-xs sm:text-sm text-gray-500 mt-2">
          All transactions are secure and encrypted.
        </p>
      </div>

      <div
        className={`border rounded-lg p-4 ${
          darkMode
            ? "bg-black border-yellow-400"
            : "bg-gray-100 border-gray-800"
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm sm:text-base font-semibold">
              Razorpay Secure
            </h3>
            <p className="text-[10px] sm:text-xs text-gray-500">
              UPI, Cards, Int&apos;l Cards, Wallets
            </p>
          </div>

          <div className="flex items-center space-x-2">
            {primaryIcons.map((icon, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-10 h-6 p-1 bg-white border border-gray-100 rounded flex items-center justify-center"
              >
                <Image
                  src={icon}
                  alt={`payment-${index}`}
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
            ))}

            {tooltipIcons.length > 0 && (
              <div
                className="relative"
                ref={tooltipRef}
                onMouseEnter={() => setTooltipOpen(true)}
                onMouseLeave={() => setTooltipOpen(false)}
              >
                <button
                  onClick={() => setTooltipOpen((prev) => !prev)}
                  className={`w-10 h-6 p-1 rounded-sm cursor-pointer text-xs font-semibold flex items-center justify-center ${
                    darkMode
                      ? "bg-gray-800"
                      : "bg-gray-200 border border-gray-800"
                  }`}
                >
                  +{tooltipIcons.length}
                </button>

                {tooltipOpen && (
                  <div
                    className={`absolute bottom-full mb-2 -right-1/6 sm:left-1/2 sm:-translate-x-1/2 z-50 w-60 grid grid-cols-4 gap-3 px-4 py-3 rounded-lg shadow-lg border ${
                      darkMode
                        ? "bg-black border-yellow-400 text-white"
                        : "bg-gray-100 border-gray-800 text-black"
                    }`}
                  >
                    {tooltipIcons.map((icon, index) => (
                      <div
                        key={index}
                        className="w-10 h-6 p-1 bg-white border border-gray-100 rounded flex items-center justify-center"
                      >
                        <Image
                          src={icon}
                          alt={`tooltip-icon-${index}`}
                          width={24}
                          height={24}
                          className="object-contain"
                        />
                      </div>
                    ))}
                    {/* Custom arrow */}
                    <div
                      className={`
                        absolute top-full right-1/12 sm:left-1/2 sm:-translate-x-1/2 
                        w-2 h-2 rotate-45 
                        border-b border-r 
                        ${
                          darkMode
                            ? "border-yellow-400 bg-black"
                            : "border-gray-800 bg-white"
                        } 
                        -mt-[3px]
                      `}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div
          className={`mt-4 border-t pt-4 flex flex-col items-center gap-2 text-xs sm:text-sm ${
            darkMode ? "text-gray-200" : "text-gray-700"
          }`}
        >
          <div className="w-64 sm:w-72 xl:w-80 aspect-[2/1] relative">
            <Image
              src="/redirectOut.svg"
              alt="Redirect icon"
              fill
              className="object-contain"
            />
          </div>

          <p className="text-center">
            After clicking “Pay now”, you will be redirected to Razorpay Secure
            to complete your purchase securely.
          </p>
        </div>
      </div>
    </>
  );
};

export default PaymentGatewayInfo;
