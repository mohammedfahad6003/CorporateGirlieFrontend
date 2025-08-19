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
import Link from "next/link";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);

  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const threshold = 120;
    const scrollBuffer = 10;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (Math.abs(currentScrollY - lastScrollY) < scrollBuffer) return; // ignore small scrolls

      if (currentScrollY < lastScrollY || currentScrollY < threshold) {
        setShowHeader(true);
      } else {
        setShowHeader(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`sticky top-0 z-50 w-full p-4 sm:p-5 lg:p-8 transition-transform duration-300 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      } ${darkMode ? "bg-black" : "bg-gray-50"}`}
    >
      <header className="flex items-center lg:p-4 sm:px-6 px-0 pb-3 md:pt-6 pt-8 relative sm:justify-around justify-end flex-row-reverse sm:flex-row transition-colors duration-300">
        <div className="flex items-center">
          <div className="hidden sm:block">
            <div className="w-8 sm:w-10 md:w-16">
              <Image
                src={darkMode ? "/DarkModeLogo.svg" : "/LightModeLogo.svg"}
                alt={darkMode ? "Dark Mode Logo" : "Light Mode Logo"}
                width={60}
                height={60}
                loading="eager"
                style={{ width: "100%", height: "auto", borderRadius: "50%" }}
              />
            </div>
          </div>

          <h1 className="md:pl-4 pl-1 font-dancing lg:text-4xl sm:text-3xl text-2xl font-bold text-yellow-400 sm:ml-0 ml-3">
            <Link href="/">The Corporate Girlie Arts</Link>
          </h1>
        </div>

        {/* Desktop Menu */}
        <DesktopNavigation />

        {/* Mobile Menu */}
        <MobileNavigation menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

        {/* Mobile Hamburger Icon */}
        <button
          className={`sm:hidden text-[1.25rem] transition-colors duration-300 ${
            darkMode ? "text-white" : "text-yellow-400"
          }`}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
        </button>

        {/* Theme Toggle */}
        <ThemeToggleButton />
      </header>
    </div>
  );
};

export default Header;
