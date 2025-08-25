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
import Image from "next/image";
import SearchableDropdown from "../SearchableDropdown/page";
import { DummySearchValues, Menus } from "@/utils/commonJson";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const [searchedValue, setSearchedValue] = useState("");
  const [categoriesOpen, setCategoriesOpen] = useState<Menus["id"] | null>(null);

  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const threshold = 120;
    const scrollBuffer = 10;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (Math.abs(currentScrollY - lastScrollY) < scrollBuffer) return;

      if (currentScrollY < lastScrollY || currentScrollY < threshold) {
        setShowHeader(true);
      } else {
        setShowHeader(false);
        setCategoriesOpen(null);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDropdown = (e: string) => {
    setSearchedValue(e);
  };

  return (
    <>
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

          {!showSearch ? (
            <div
              className="hidden sm:block cursor-pointer text-xl sm:text-2xl md:text-3xl"
              onClick={() => setShowSearch(true)}
            >
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className={`sm:text-2xl text-xl ${
                  darkMode ? "text-yellow-400" : "text-black"
                }`}
              />
            </div>
          ) : (
            <div className="hidden sm:block cursor-pointer text-xl sm:text-2xl md:text-3xl w-[30px]">
              {" "}
            </div>
          )}

          {/* Title */}
          <div className="flex flex-row items-center">
            <div className="w-8 md:w-10 mr-2">
              <Image
                src={darkMode ? "/DarkModeLogo.svg" : "/LightModeLogo.svg"}
                alt={darkMode ? "Dark Mode Logo" : "Light Mode Logo"}
                width={60}
                height={60}
                loading="eager"
                style={{ width: "100%", height: "auto", borderRadius: "50%" }}
              />
            </div>

            <h1 className="font-dancing lg:text-[36px] sm:text-3xl text-2xl font-bold text-yellow-400 text-center">
              <Link href="/">The Corporate Girlie Arts</Link>
            </h1>
          </div>

          {/* Wishlist Icon */}
          <div className="cursor-pointer text-xl sm:text-2xl md:text-3xl">
            <FontAwesomeIcon
              icon={faBagShopping}
              className={`sm:text-2xl text-xl ${
                darkMode
                  ? "text-yellow-400 hover:text-yellow-300"
                  : "text-gray-800 hover:text-gray-400"
              }`}
            />
          </div>

          {/* Theme Toggle */}
          <ThemeToggleButton />
        </header>

        {!menuOpen && (
          <div className="w-full mx-auto mt-3 sm:hidden transition-all duration-300 ease-in-out flex items-center">
            <div className="flex-grow">
              <SearchableDropdown
                value={searchedValue}
                options={DummySearchValues}
                onChange={(e) => handleDropdown(e)}
                required={true}
              />
            </div>
          </div>
        )}

        {/* Desktop Search Container */}
        {showSearch && (
          <div className="hidden sm:flex w-full sm:w-2/5 mx-auto sm:mt-5 lg:mt-6 transition-all duration-300 ease-in-out items-center">
            <div className="flex-grow">
              <SearchableDropdown
                value={searchedValue}
                options={DummySearchValues}
                onChange={(e) => handleDropdown(e)}
                required={true}
              />
            </div>

            <button
              type="button"
              onClick={() => setShowSearch(false)}
              className="ml-3 cursor-pointer text-[14px] sm:text-[16px]"
            >
              <FontAwesomeIcon icon={faTimes} className={"text-gray-600"} />
            </button>
          </div>
        )}

        {/* Desktop Menu */}
        {!showSearch && (
          <DesktopNavigation
            categoriesOpen={categoriesOpen}
            setCategoriesOpen={setCategoriesOpen}
          />
        )}
      </div>

      {/* ⬇️ Move mobile nav OUTSIDE header */}
      <MobileNavigation menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </>
  );
};

export default Header;
