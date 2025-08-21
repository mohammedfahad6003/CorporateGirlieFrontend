"use client";

import React, { useEffect, useState } from "react";
import ThemeToggleButton from "../ThemeToggleButton/ThemeToggleButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faBars,
  faMagnifyingGlass,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
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
      }  ${
        darkMode
          ? "bg-black border-b border-y-yellow-400"
          : "bg-gray-50 border-b border-gray-50"
      }`}
    >
      <header className="flex items-center lg:px-12 px-0 pb-3 md:pt-6 pt-8 relative sm:justify-around justify-between flex-row sm:flex-row transition-colors duration-300">
        {/* Mobile Hamburger Icon */}
        <button
          className={`sm:hidden text-[1.25rem] transition-colors duration-300 ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
        </button>

        <div className="hidden sm:block cursor-pointer text-xl sm:text-2xl md:text-3xl">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className={darkMode ? "text-yellow-400" : "text-black"}
          />
        </div>

        {/* Title */}
        <h1 className="font-dancing lg:text-5xl sm:text-3xl text-2xl font-bold text-yellow-400">
          <Link href="/">The Corporate Girlie Arts</Link>
        </h1>

        {/* Wishlist Icon */}
        <div className="cursor-pointer text-xl sm:text-2xl md:text-3xl">
          <FontAwesomeIcon
            icon={faBagShopping}
            className={darkMode ? "text-yellow-400" : "text-gray-800"}
          />
        </div>

        {/* Mobile Menu */}
        <MobileNavigation menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

        {/* Theme Toggle */}
        <ThemeToggleButton />
      </header>

      {/* Desktop Menu */}
      <DesktopNavigation />
    </div>
  );
};

export default Header;
