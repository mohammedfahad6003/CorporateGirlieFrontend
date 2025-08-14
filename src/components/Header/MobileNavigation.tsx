"use client";

import { RootState } from "@/store/store";
import { menuItems } from "@/utils/commonJson";
import { faChevronRight, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";

interface MobileNavigationProps {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileNavigation = ({ menuOpen, setMenuOpen }: MobileNavigationProps) => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const pathName = usePathname();

  // Prevent background scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  return (
    <>
      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 sm:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Left sliding pane */}
      <div
        className={`fixed top-0 left-0 h-full w-[80%] max-w-xs z-50 sm:hidden transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          darkMode ? "bg-black text-white" : "bg-white text-black"
        } ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Close icon */}
        <div className="flex items-center justify-between p-4 border-b border-gray-300 dark:border-gray-700">
          <h2 className="font-bold text-lg">Menu</h2>
          <button
            onClick={() => setMenuOpen(false)}
            className={`text-xl ${darkMode ? "text-white" : "text-gray-800"}`}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        {/* Menu items */}
        <nav className="flex flex-col">
          {menuItems?.map((item) => {
            const isActive = pathName === item.navigation;
            return (
              <Link
                key={item.id}
                href={item.navigation}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 transition-colors duration-200 ${
                  isActive
                    ? "text-yellow-400 font-semibold"
                    : "hover:text-yellow-400"
                }`}
              >
                <span>{item.title}</span>
                <FontAwesomeIcon icon={faChevronRight} />
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default MobileNavigation;
