import { RootState } from "@/store/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faYoutube,
  faThreads,
} from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
import { motivationalJson } from "@/utils/inspirationJson";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { COMMON_VARIABLES } from "@/utils/commonVariables";

const Footer = () => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  const textColor = darkMode ? "text-white" : "text-gray-800";
  const borderColor = darkMode ? "border-white/20" : "border-gray-300";

  const [quote, setQuote] = useState(motivationalJson[0]);

  useEffect(() => {
    const updateQuote = () => {
      const randomIndex = Math.floor(Math.random() * motivationalJson?.length);
      setQuote(motivationalJson[randomIndex]);
    };

    updateQuote(); // initial
    const interval = setInterval(updateQuote, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div
        className={`p-4 pt-6 sm:p-8 lg:p-10 ${
          darkMode
            ? "bg-black border-t border-y-yellow-400"
            : "bg-gray-50 border-t border-gray-50"
        }`}
      >
        <footer className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Brand & Identity */}
          <div>
            <h2
              className={`text-lg font-bold mb-3 ${textColor} flex items-center`}
            >
              {darkMode ? (
                <Image
                  width={25}
                  height={25}
                  src={"/DarkModeLogo.svg"}
                  alt={"Dark Mode Logo"}
                  className="mr-2 rounded-full"
                />
              ) : (
                <Image
                  width={25}
                  height={25}
                  src={"/LightModeLogo.svg"}
                  alt={"Light Mode Logo"}
                  className="mr-2 rounded-full"
                />
              )}{" "}
              The Corporate Girlie Arts
            </h2>
            <p className={`${textColor} text-sm`}>
              Bringing your imagination to life through vibrant colors and
              creative expression.
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className={`text-md font-semibold mb-3 ${textColor}`}>
              Contact
            </h3>
            <div className="space-y-2">
              {/* Email */}
              <a
                href={`mailto:${COMMON_VARIABLES.emailId}?subject=Inquiry Message to Corporate Girlie Arts&cc=${COMMON_VARIABLES.ccId}`}
                className={`flex items-center gap-2 text-sm transition ${
                  darkMode ? "text-white" : "text-black"
                } hover:text-blue-400`}
              >
                <FontAwesomeIcon icon={faEnvelope} />
                <span
                  className={`${
                    darkMode
                      ? "text-white hover:underline"
                      : "text-black hover:underline"
                  }`}
                >
                  {COMMON_VARIABLES.emailId}
                </span>
              </a>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className={`text-md font-semibold mb-3 ${textColor}`}>
              Follow Us
            </h3>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/thecorporategirliearts/"
                target="_blank"
                rel="noopener noreferrer"
                className={`${textColor} hover:text-pink-500 transition`}
              >
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </a>
              <a
                href="https://www.youtube.com/@TheCorporateGirlieArts"
                target="_blank"
                rel="noopener noreferrer"
                className={`${textColor} hover:text-red-600 transition`}
              >
                <FontAwesomeIcon icon={faYoutube} size="lg" />
              </a>
              <a
                href="https://www.threads.com/@thecorporategirliearts"
                target="_blank"
                rel="noopener noreferrer"
                className={`${textColor} transition ${
                  darkMode ? "hover:text-yellow-400" : "hover:text-black"
                }`}
              >
                <FontAwesomeIcon icon={faThreads} size="lg" />
              </a>
            </div>
          </div>

          {/* Quote */}
          <div>
            <h3 className={`text-md font-semibold mb-3 ${textColor}`}>Muse</h3>
            <p className={`${textColor} italic text-sm`}>
              {`"${quote?.quote}" - ${quote?.author}`}
            </p>
          </div>
        </footer>

        {/* Divider */}
        <div
          className={`border-t mt-8 pt-4 ${borderColor} flex flex-col md:flex-row justify-between text-sm`}
        >
          <div
            className={`${textColor} flex flex-wrap md:flex-row gap-3 md:gap-4`}
          >
            <Link
              href="/policies/terms-and-conditions"
              className="hover:underline"
            >
              Terms and Conditions
            </Link>
            <Link href="/policies/privacy-policy" className="hover:underline">
              Privacy Policy
            </Link>
            <Link href="/policies/shipping-policy" className="hover:underline">
              Shipping Policy
            </Link>
          </div>
          <p className={`${textColor} mt-4`}>
            © {new Date().getFullYear()}{" "}
            <Link href={"/"} className="hover:underline" prefetch={true}>
              The Corporate Girlie Arts.
            </Link>{" "}
            All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
