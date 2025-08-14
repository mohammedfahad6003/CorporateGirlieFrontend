"use client";

import { RootState } from "@/store/store";
import { menuForMobileItems } from "@/utils/commonJson";
import {
  faCircleArrowRight,
  faTimes,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faYoutube,
  faThreads,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import ThemeToggleButton from "../ThemeToggleButton/ThemeToggleButton";

interface MobileNavigationProps {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileNavigation = ({ menuOpen, setMenuOpen }: MobileNavigationProps) => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const pathName = usePathname();

  const paneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen && paneRef.current) {
      paneRef.current.scrollTop = 0;
    }
  }, [menuOpen]);

  const borderColor = darkMode ? "border-gray-700" : "border-gray-200";

  return (
    <>
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 sm:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <div
        ref={paneRef}
        className={`fixed top-0 left-0 h-screen w-full z-50 sm:hidden transform transition-transform duration-300 ease-in-out overflow-y-auto flex flex-col ${
          darkMode ? "bg-black text-white" : "bg-gray-50 text-black"
        } ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className="p-4 relative">
          <header className="flex items-center lg:p-4 sm:px-6 px-0 pb-3 md:pt-6 pt-8 relative sm:justify-around justify-end transition-colors duration-300 flex-row-reverse">
            <h1 className="md:pl-4 pl-1 font-dancing lg:text-4xl sm:text-3xl text-2xl font-bold text-yellow-400 sm:ml-0 ml-3">
              <Link href={"/"} onClick={() => setMenuOpen(false)}>
                The Corporate Girlie Arts
              </Link>
            </h1>
            <button
              onClick={() => setMenuOpen(false)}
              className={`cursor-pointer ${
                darkMode ? "text-white" : "text-yellow-400"
              }`}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            {/* Theme Toggle Button inside left pane */}
            <ThemeToggleButton />
          </header>
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col flex-grow">
          {menuForMobileItems?.map((item) => {
            const isActive = pathName === item.navigation;
            return (
              <React.Fragment key={item.id}>
                <Link
                  href={item.navigation}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 transition-colors duration-200 ${
                    isActive
                      ? "text-yellow-400 font-medium"
                      : "hover:text-yellow-400"
                  }`}
                  prefetch={true}
                >
                  <span>{item.title}</span>
                  <FontAwesomeIcon
                    icon={faCircleArrowRight}
                    className={`${
                      !darkMode ? "text-gray-600" : "text-yellow-400"
                    }`}
                  />
                </Link>
              </React.Fragment>
            );
          })}

          {/* Mini Footer Section */}
          <div className={`mt-auto p-6 border-t ${borderColor}`}>
            {/* Quick Contact */}
            <h3 className="text-sm font-semibold mb-2">Quick Contact</h3>
            <a
              href="tel:+919876543210"
              className="flex items-center gap-2 text-sm mb-2 hover:text-green-500"
            >
              <FontAwesomeIcon icon={faPhone} />
              +91 98765-43210
            </a>
            <a
              href="mailto:contact@artcompany.com"
              className="flex items-center gap-2 text-sm mb-4 hover:text-blue-500"
            >
              <FontAwesomeIcon icon={faEnvelope} />
              contact@artcompany.com
            </a>

            {/* Social Media */}
            <div className="flex gap-4 mb-4">
              <a
                href="https://www.instagram.com/thecorporategirliearts/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500"
              >
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </a>
              <a
                href="https://www.youtube.com/@TheCorporateGirlieArts"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red-600"
              >
                <FontAwesomeIcon icon={faYoutube} size="lg" />
              </a>
              <a
                href="https://www.threads.com/@thecorporategirliearts"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-300 dark:hover:text-yellow-300"
              >
                <FontAwesomeIcon icon={faThreads} size="lg" />
              </a>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default MobileNavigation;
