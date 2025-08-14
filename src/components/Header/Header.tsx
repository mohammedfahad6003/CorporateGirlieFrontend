"use client";

import React, { useEffect, useState } from "react";
import ThemeToggleButton from "../ThemeToggleButton/ThemeToggleButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Image from "next/image";
import DesktopNavigation from "./DesktopNavigation";
import MobileNavigation from "./MobileNavigation";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);

  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      const threshold = 120;

      if (currentScrollY < lastScrollY) {
        setShowHeader(true);
      } else {
        if (currentScrollY > threshold) {
          setShowHeader(false);
        }
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`sticky p-4 sm:p-5 lg:p-8 w-full top-0 z-50 transition-transform duration-300 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      } ${darkMode ? "bg-black" : "bg-gray-50"}`}
    >
      <header
        className={`flex items-center lg:p-4 sm:px-6 px-0 pb-3 md:pt-6 pt-8 relative sm:justify-around justify-end transition-colors duration-300 flex-row-reverse sm:flex-row`}
      >
        <div className="flex items-center">
          <div className="hidden sm:block">
            <div className="w-8 sm:w-10 md:w-16">
              {darkMode ? (
                <Image
                  src="/DarkModeLogo.svg"
                  alt="Dark Mode Logo"
                  width={60}
                  height={60}
                  loading="eager"
                  style={{ width: "100%", height: "auto", borderRadius: "50%" }}
                />
              ) : (
                <Image
                  src="/LightModeLogo.svg"
                  alt="Light Mode Logo"
                  width={60}
                  height={60}
                  loading="eager"
                  style={{ width: "100%", height: "auto", borderRadius: "50%" }}
                />
              )}
            </div>
          </div>

          {/* Header Name */}
          <h1 className="md:pl-4 pl-1 font-dancing lg:text-4xl sm:text-3xl text-2xl font-bold text-yellow-400 sm:ml-0 ml-3">
            The Corporate Girlie Arts
          </h1>
        </div>

        {/* Desktop Menu */}
        <DesktopNavigation />

        {/* Mobile Menu */}
        <MobileNavigation
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          // categoriesOpenMobile={categoriesOpenMobile}
          // setCategoriesOpenMobile={setCategoriesOpenMobile}
        />

        {/* Mobile Hamburger Icon */}
        <button
          className={`sm:hidden text-[1.25rem] transition-colors duration-300 ${
            darkMode ? "text-white" : "text-yellow-400"
          }`}
          onClick={() => setMenuOpen(true)}
        >
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
        </button>

        {/* Toggle Button */}
        <ThemeToggleButton />
      </header>
    </div>
  );
};

export default Header;
