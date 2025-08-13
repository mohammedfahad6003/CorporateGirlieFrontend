import { RootState } from "@/store/store";
import { menuItems, subMenusItems } from "@/utils/commonJson";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

interface MobileNavigationProps {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  categoriesOpenMobile: boolean;
  setCategoriesOpenMobile: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileNavigation = ({
  menuOpen,
  setMenuOpen,
  categoriesOpenMobile,
  setCategoriesOpenMobile,
}: MobileNavigationProps) => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const pathName = usePathname();

  return (
    <>
      {menuOpen && (
        <div
          className={`absolute top-full left-1/2 -translate-x-1/2 w-7/8 flex flex-col items-center py-4 sm:hidden transition-colors duration-300 cursor-pointer
    ${
      darkMode
        ? "bg-black text-white shadow-[0_4px_10px_rgba(255,255,255,0.5)]"
        : "bg-white text-black shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
    }`}
        >
          {menuItems?.map((item, index) => {
            const isActive = pathName === item.navigation;
            const isCategories = item.title === "Categories";

            return (
              <div key={item.id} className="w-full">
                <div
                  onClick={() => {
                    if (isCategories) {
                      setCategoriesOpenMobile((prev) => !prev);
                    } else {
                      setMenuOpen(false);
                    }
                  }}
                  className={`max-w-xs mx-auto flex items-center justify-between py-2 px-4 cursor-pointer relative
                    ${isActive ? "text-yellow-400" : "hover:text-yellow-400"}`}
                >
                  <Link
                    href={item.navigation}
                    onClick={(e) => {
                      if (isCategories) e.preventDefault();
                    }}
                    className="flex-1 text-center text-lg text-[1rem]"
                  >
                    {item.title}
                    {isCategories && (
                      <FontAwesomeIcon
                        icon={
                          categoriesOpenMobile ? faChevronUp : faChevronDown
                        }
                        className={`ml-2 text-xs ${
                          categoriesOpenMobile ? "text-yellow-400" : ""
                        }`}
                      />
                    )}
                  </Link>
                </div>

                {/* Animated Categories Submenu */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out px-5
                  ${
                    categoriesOpenMobile
                      ? "max-h-[1000px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  {isCategories &&
                    subMenusItems?.map((menu) => (
                      <React.Fragment key={menu?.id}>
                        <div className="my-3">
                          <h2 className="font-serif tracking-wide font-bold text-yellow-400 text-md">
                            {menu?.title}
                          </h2>
                          <ul className="pl-4 space-y-1 mt-2 mb-4 flex flex-row items-center flex-wrap">
                            {menu?.childMenus?.map((submenu, index) => (
                              <React.Fragment key={submenu?.id}>
                                <li className="px-2">
                                  <Link
                                    href={`/categories/${submenu.title
                                      .toLowerCase()
                                      .replace(/\s+/g, "-")}`}
                                    onClick={() => setMenuOpen(false)}
                                    className="text-medium text-sm relative inline-block hover:text-yellow-400 group"
                                  >
                                    {submenu?.title}
                                    <span className="absolute left-0 -bottom-0.5 w-full h-[2px] bg-yellow-400 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                                  </Link>
                                </li>

                                {index !== menu?.childMenus?.length - 1 && (
                                  <li className="flex items-center">
                                    <span className="mx-2 h-4 w-px bg-gray-950 dark:bg-gray-200"></span>
                                  </li>
                                )}
                              </React.Fragment>
                            ))}
                          </ul>
                        </div>

                        {subMenusItems?.length - 1 !== menu?.id && (
                          <div className="w-full h-px bg-gray-300 dark:bg-gray-700" />
                        )}
                      </React.Fragment>
                    ))}
                </div>

                {menuItems?.length - 1 !== index && (
                  <div className="w-full h-px bg-gray-300 dark:bg-gray-700" />
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default MobileNavigation;
