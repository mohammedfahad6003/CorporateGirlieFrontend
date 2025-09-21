"use client";

import { RootState } from "@/store/store";
import { ChildMenu, menuForDesktopItems, Menus } from "@/utils/commonJson";
import {
  faCircleArrowRight,
  faTimes,
  faEnvelope,
  faChevronDown,
  faChevronRight,
  faBagShopping,
} from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faYoutube,
  faThreads,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import ThemeToggleButton from "../ThemeToggleButton/ThemeToggleButton";
import { COMMON_VARIABLES } from "@/utils/commonVariables";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface MobileNavigationProps {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileNavigation = ({ menuOpen, setMenuOpen }: MobileNavigationProps) => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const pathName = usePathname();
  const router = useRouter();

  const paneRef = useRef<HTMLDivElement>(null);

  const [categoriesOpen, setCategoriesOpen] = useState<Menus["id"] | null>(
    null
  );

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
        className={`fixed top-0 left-0 h-screen w-full z-50 sm:hidden transform transition-transform duration-300 ease-in-out overflow-y-auto flex flex-col mobile-drawer ${
          darkMode ? "bg-black text-white" : "bg-gray-50 text-black"
        } ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className="p-4 relative">
          <header className="flex items-center lg:p-4 sm:px-6 px-0 pb-3 md:pt-6 pt-8 relative sm:justify-around justify-between transition-colors duration-300 flex-row-reverse">
            {/* Wishlist Icon */}
            <div className="cursor-pointer text-xl sm:text-2xl md:text-3xl">
              <FontAwesomeIcon
                icon={faBagShopping}
                className={darkMode ? "text-yellow-400" : "text-gray-800"}
              />
            </div>

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

              <h1 className="font-dancing lg:text-5xl sm:text-3xl text-2xl font-bold text-yellow-400 text-center">
                <Link href="/">The Corporate Girlie Arts</Link>
              </h1>
            </div>

            <button
              onClick={() => setMenuOpen(false)}
              className={`cursor-pointer ${
                darkMode ? "text-white" : "text-gray-800"
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
          {menuForDesktopItems?.map((item: Menus) => {
            const hasChildren = item.childMenus && item.childMenus.length > 0;
            const isActive =
              pathName === item.navigation || // parent exact match
              (hasChildren &&
                item.childMenus?.some(
                  (submenu) => pathName === submenu.navigation
                )); // child active
            const isExpanded = categoriesOpen === item.id;

            return (
              <React.Fragment key={item.id}>
                <button
                  onClick={() => {
                    if (hasChildren) {
                      setCategoriesOpen(isExpanded ? null : item.id);
                    } else {
                      setMenuOpen(false);
                      if (typeof window !== undefined) {
                        router.push(item.navigation);
                      }
                    }
                  }}
                  className={`flex items-center justify-between px-6 py-4 border-b transition-colors duration-200 w-full text-left ${
                    isActive
                      ? "text-yellow-400 font-medium border-gray-200"
                      : "hover:text-yellow-400 border-gray-200"
                  }`}
                >
                  <span
                    className={
                      isActive ? `underline decoration-yellow-400` : ""
                    }
                  >
                    {item.title}
                  </span>

                  {/* If has children → toggle icon, else normal arrow */}
                  {hasChildren ? (
                    <FontAwesomeIcon
                      icon={isExpanded ? faChevronDown : faChevronRight}
                      className={`${
                        !darkMode ? "text-yellow-400" : "text-yellow-400"
                      } transition-transform duration-300`}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faCircleArrowRight}
                      className={`${
                        !darkMode ? "text-yellow-400" : "text-yellow-400"
                      }`}
                    />
                  )}
                </button>

                {/* Child Menus */}
                {hasChildren && isExpanded && (
                  <div
                    className={`pl-10 pr-10 py-2 space-y-2 ${
                      darkMode ? "bg-black" : "bg-gray-50"
                    }`}
                  >
                    {item.childMenus &&
                      item.childMenus.map(
                        (submenu: ChildMenu, index: number) => (
                          <Link
                            key={submenu.id}
                            href={submenu.navigation}
                            onClick={() => setMenuOpen(false)}
                            className={`block pt-2 text-sm  ${
                              pathName === submenu.navigation
                                ? "text-yellow-400 font-medium"
                                : "hover:text-yellow-400"
                            }
                        `}
                            prefetch={true}
                          >
                            <span
                              className={
                                pathName === submenu.navigation
                                  ? `underline decoration-yellow-400`
                                  : ""
                              }
                            >
                              {submenu.title}
                            </span>
                            {index !== (item.childMenus?.length ?? 0) - 1 && (
                              <div className="border-b border-gray-300 my-2" />
                            )}
                          </Link>
                        )
                      )}
                  </div>
                )}
              </React.Fragment>
            );
          })}

          {/* Mini Footer Section */}
          <div className={`mt-auto p-6 border-t ${borderColor}`}>
            {/* Quick Contact */}
            <h3 className="text-sm font-semibold mb-2">Quick Contact</h3>
            <a
              href={`mailto:${COMMON_VARIABLES.emailId}?subject=Inquiry Message to Corporate Girlie Arts&cc=${COMMON_VARIABLES.ccId}`}
              className="flex items-center gap-2 text-sm mb-4 "
            >
              <FontAwesomeIcon icon={faEnvelope} className="text-yellow-400" />
              {COMMON_VARIABLES.emailId}
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
                className="hover:text-yellow-400"
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
