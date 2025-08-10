"use client";

import React, { useState } from "react";
import ThemeToggleButton from "../ThemeToggleButton/ThemeToggleButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Link from "next/link";
import { menuItems, MenuItems } from "@/utils/commonJson";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  return (
    <header
      className={`flex items-center lg:p-4 px-6 pb-3 md:pt-6 pt-8 relative md:justify-around justify-between transition-colors duration-300 `}
    >
      {/* Header Name */}
      <h1 className="font-dancing lg:text-4xl md:text-3xl text-2xl font-bold text-yellow-400">
        The Corporate Girlie Arts
      </h1>

      {/* Desktop Menu */}
      <nav
        className={`hidden sm:flex flex-row md:gap-12 gap-4 transition-colors duration-300 ${
          darkMode ? "text-white" : "text-black"
        }`}
      >
        {menuItems.map((item: MenuItems) => (
          <Link
            key={item.id}
            href={item.navigation}
            className={`
        md:text-[1.25rem]
        cursor-pointer relative
        hover:text-yellow-400
        after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[2px] after:bottom-0 after:left-0
        after:bg-yellow-400 after:origin-right after:transition-transform after:duration-300
        hover:after:scale-x-100 hover:after:origin-left
      `}
          >
            {item.title}
          </Link>
        ))}
      </nav>

      {/* Mobile Hamburger Icon */}
      <button
        className={`sm:hidden text-[1rem] transition-colors duration-300 ${
          darkMode ? "text-white" : "text-yellow-400"
        }`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className={`absolute top-full left-1/2 -translate-x-1/2 w-7/8 flex flex-col items-center py-4 sm:hidden transition-colors duration-300 cursor-pointer
      ${
        darkMode
          ? "bg-black text-white shadow-[0_4px_10px_rgba(255,255,255,0.5)]"
          : "bg-white text-black shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
      }`}
        >
          {menuItems.map((item, index) => (
            <Link
              key={item.id}
              href={item.navigation}
              className="w-full"
              onClick={() => setMenuOpen(false)}
            >
              <div
                className={`max-w-xs mx-auto text-center py-2 cursor-pointer
            text-[0.85rem]
            hover:text-yellow-400
            relative
            ${
              index !== menuItems.length - 1
                ? "border-b border-gray-300/50"
                : ""
            }
          `}
              >
                {item.title}
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Toggle Button */}
      <ThemeToggleButton />
    </header>
  );
};

export default Header;
