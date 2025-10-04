"use client";

import * as Tooltip from "@radix-ui/react-tooltip";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

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

// Display first 3 icons, rest go in tooltip
const primaryIcons = allPaymentIcons.slice(0, 3);
const tooltipIcons = allPaymentIcons.slice(3);

const PaymentGatewayInfo = () => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

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
            : "bg-gray-100 border-gray-300"
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
              <Tooltip.Provider delayDuration={100}>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <button
                      aria-label="More payment options"
                      className={`w-10 h-6 p-1 rounded-sm cursor-pointer text-xs font-semibold flex items-center justify-center ${
                        darkMode ? "bg-gray-800" : "bg-gray-200 "
                      }`}
                    >
                      +{tooltipIcons.length}
                    </button>
                  </Tooltip.Trigger>

                  <Tooltip.Portal>
                    <Tooltip.Content
                      side="top"
                      className={`rounded-lg px-4 py-3 shadow-lg grid grid-cols-4 gap-3 z-50 border w-60 ${
                        darkMode
                          ? "bg-black border-yellow-400"
                          : "bg-white border-gray-100"
                      }`}
                      sideOffset={5}
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
                      <Tooltip.Arrow
                        width={10}
                        height={5}
                        className={`z-50 ${
                          darkMode ? "fill-gray-900" : "fill-white"
                        }`}
                      />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
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
