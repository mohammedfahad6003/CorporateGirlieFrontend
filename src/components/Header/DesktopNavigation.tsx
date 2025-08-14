import { RootState } from "@/store/store";
import { menuItems, MenuItems, subMenusItems } from "@/utils/commonJson";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const DesktopNavigation = () => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const pathName = usePathname();
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  return (
    <nav
      className={`hidden sm:flex flex-row md:gap-12 gap-4 transition-colors duration-300 ${
        darkMode ? "text-white" : "text-black"
      }`}
    >
      {menuItems.map((item: MenuItems) => {
        const isActive =
          item.title === "Categories"
            ? pathName.startsWith("/categories")
            : pathName === item.navigation;

        if (item.title === "Categories") {
          return (
            <div
              key={item.id}
              className={`relative hover:text-yellow-400
                  after:content-[''] after:absolute after:w-full after:h-[2px] after:bottom-0 after:left-0
                  after:bg-yellow-400 after:transition-transform after:duration-300
                  
                  ${
                    isActive
                      ? "text-yellow-400 after:scale-x-100 after:origin-left"
                      : "after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left"
                  }`}
              onMouseEnter={() => setCategoriesOpen(true)}
              onMouseLeave={() => setCategoriesOpen(false)}
            >
              {/* Parent link */}
              <Link
                href={item.navigation}
                className={`
                  md:text-[1.125rem]
                  cursor-pointer relative
                  mb-4
              `}
                prefetch={true}
              >
                {item.title}
              </Link>

              {/* Dropdown */}
              {categoriesOpen && (
                <div
                  className={`
                    absolute top-full -left-96 lg:-left-80 md:-left-40 sm:-left-20
                    rounded-lg shadow-lg z-50 transition-opacity duration-200
                    opacity-100 visible
                    pt-4
                  `}
                >
                  <ul
                    className={`
                      p-4 w-[800px] lg:w-[650px] md:w-[500px] sm:w-[350px]
                      rounded-lg shadow-lg border
                      ${
                        darkMode
                          ? "bg-black border-gray-700 text-white"
                          : "bg-white border-gray-200 text-black"
                      }
                    `}
                  >
                    {subMenusItems?.map((menu) => (
                      <div key={menu.id} className="mb-2">
                        <h2 className="tracking-widest text-xl lg:text-lg md:text-base font-serif text-yellow-400">
                          {menu.title}
                        </h2>
                        <ul className="flex flex-wrap py-3 items-center gap-y-2">
                          {menu?.childMenus?.map((submenu) => (
                            <li key={submenu.id} className="mb-2 px-3">
                              <Link
                                href={`/categories/${submenu.title
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")}`}
                                className={`
                                  relative inline-block font-medium
                                  text-base lg:text-sm md:text-xs
                                  hover:text-yellow-400 group
                                `}
                                prefetch={true}
                              >
                                {submenu.title}
                                <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-yellow-400 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
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
              md:text-[1.125rem]
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
