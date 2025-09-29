"use client";

import { RootState } from "@/store/store";
import { ChildMenu, menuForDesktopItems, Menus } from "@/utils/commonJson";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

type DesktopNavigationProps = {
  categoriesOpen: Menus["id"] | null;
  setCategoriesOpen: React.Dispatch<React.SetStateAction<Menus["id"] | null>>;
};

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({
  categoriesOpen,
  setCategoriesOpen,
}) => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const pathName = usePathname();

  return (
    <nav
      className={`mt-8 hidden sm:flex flex-row flex-wrap justify-center lg:gap-8 md:gap-8 gap-4 transition-colors duration-300 ${
        darkMode ? "text-white" : "text-black"
      }`}
    >
      {menuForDesktopItems
        ?.filter((val) => val.id !== 9) // Removed to display Entire collection from Menus
        ?.map((item: Menus) => {
          const hasChildren = item.childMenus && item.childMenus.length > 0;
          const isActive =
            pathName === item.navigation ||
            (hasChildren && pathName.startsWith(item.navigation));

          if (hasChildren) {
            return (
              <div
                key={item.id}
                className={`relative hover:text-yellow-400
                after:content-[''] after:absolute after:w-full after:h-[2px] after:bottom-0 after:left-0
                after:bg-yellow-400 after:transition-transform after:duration-300
                ${
                  isActive || categoriesOpen === item.id
                    ? "text-yellow-400 after:scale-x-100 after:origin-left"
                    : "after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left"
                }`}
                onMouseEnter={() => setCategoriesOpen(item?.id)}
                onMouseLeave={() => setCategoriesOpen(null)}
              >
                {/* Parent (no navigation) */}
                <button
                  className={`
                  md:text-[1rem] text-[0.75rem]
                  cursor-pointer relative
                  pb-2 flex items-center gap-2
                `}
                  onClick={(e) => {
                    e.preventDefault();
                    if (categoriesOpen === item.id) {
                      setCategoriesOpen(null);
                    } else {
                      setCategoriesOpen(item.id);
                    }
                  }}
                >
                  {item.title}
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`md:text-[0.75rem] transition-transform duration-300 ${
                      categoriesOpen === item.id ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown */}
                {categoriesOpen === item.id && (
                  <div
                    className={`
                    absolute top-full left-1/2 -translate-x-1/2
                    rounded-lg z-50 transition-opacity duration-200
                    opacity-100 visible pt-4
                    max-h-[70vh] overflow-y-auto submenu-container
                    w-[150px]
                  `}
                  >
                    <ul
                      className={`
                      flex flex-col gap-3
                      p-4 w-full
                      rounded-lg shadow-lg
                      scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-transparent
                      custom-scrollbar border-2
                      ${
                        darkMode
                          ? "bg-black border-yellow-400 text-white"
                          : "bg-white border-gray-400 text-black"
                      }
                    `}
                    >
                      {item?.childMenus?.map((submenu: ChildMenu) => {
                        const isSubActive = pathName === submenu.navigation;

                        return (
                          <li key={submenu.id} className="flex items-center">
                            <Link
                              href={submenu.navigation}
                              className={`
                              relative inline-block font-medium
                              text-base lg:text-sm md:text-xs group
                              ${
                                isSubActive
                                  ? "text-yellow-400"
                                  : "hover:text-yellow-400"
                              }
                            `}
                              prefetch={true}
                            >
                              {submenu.title}
                              <span
                                className={`absolute left-0 -bottom-1 w-full h-[2px] bg-yellow-400 origin-left transition-transform duration-300
                                ${
                                  isSubActive
                                    ? "scale-x-100"
                                    : "scale-x-0 group-hover:scale-x-100"
                                }
                              `}
                              />
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={item.id}
              href={item.navigation}
              prefetch={true}
              className={`
              md:text-[1rem] text-[0.75rem]
              cursor-pointer relative
              hover:text-yellow-400
              after:content-[''] after:absolute after:w-full after:h-[2px] after:bottom-0 after:left-0
              after:bg-yellow-400 after:transition-transform after:duration-300
              ${
                isActive
                  ? "text-yellow-400 after:scale-x-100 after:origin-left"
                  : "after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left"
              }
            `}
            >
              {item.title}
            </Link>
          );
        })}
    </nav>
  );
};

export default DesktopNavigation;
