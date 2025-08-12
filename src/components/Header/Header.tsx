"use client";

import React, { useState } from "react";
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
  const [categoriesOpenMobile, setCategoriesOpenMobile] = useState(false);

  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  return (
    <header
      className={`flex items-center lg:p-4 md:px-6 px-2 pb-3 md:pt-6 pt-8 relative md:justify-around justify-between transition-colors duration-300 `}
    >
      <div className="flex items-center">
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
        {/* Header Name */}
        <h1 className="md:pl-4 pl-1 font-dancing lg:text-4xl md:text-3xl text-2xl font-bold text-yellow-400">
          The Corporate Girlie Arts
        </h1>
      </div>

      {/* Desktop Menu */}
      <DesktopNavigation />

      {/* Mobile Hamburger Icon */}
      <button
        className={`sm:hidden text-[1rem] transition-colors duration-300 ${
          darkMode ? "text-white" : "text-yellow-400"
        }`}
        onClick={() => {
          setMenuOpen(!menuOpen);
          if (!menuOpen) {
            setCategoriesOpenMobile(false);
          }
        }}
      >
        <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
      </button>

      {/* Mobile Menu */}
      <MobileNavigation
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        categoriesOpenMobile={categoriesOpenMobile}
        setCategoriesOpenMobile={setCategoriesOpenMobile}
      />

      {/* Toggle Button */}
      <ThemeToggleButton />
    </header>
  );
};

export default Header;
