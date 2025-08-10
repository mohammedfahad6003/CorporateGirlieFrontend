"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTheme, toggleTheme } from "../../store/themeSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import type { RootState } from "../../store/store";

const ThemeToggleButton = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      dispatch(setTheme(true));
    } else {
      dispatch(setTheme(false));
    }
  }, [dispatch]);

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className={`absolute right-0 md:-top-4.5 -top-2 w-[3.75rem] h-[1.75rem] flex items-center rounded-full p-1 transition-colors duration-300 border-2 cursor-pointer ${
        !darkMode ? "bg-white border-yellow-400" : "bg-black border-yellow-400"
      }`}
    >
      {/* Circle */}
      <span
        className={`absolute w-[1.25rem] h-[1.25rem] rounded-full transform transition-transform duration-300 ${
          darkMode ? "bg-black" : "bg-white"
        } ${darkMode ? "translate-x-[1.9rem]" : "translate-x-0"}`}
      ></span>

      {/* Icons */}
      <FontAwesomeIcon
        icon={faSun}
        className="text-yellow-500 w-[0.9rem] h-[0.9rem] absolute left-1.5 transition-opacity duration-300"
        style={{ opacity: darkMode ? 0 : 1 }}
      />
      <FontAwesomeIcon
        icon={faMoon}
        className="text-white w-[0.9rem] h-[0.9rem] absolute right-0.5 transition-opacity duration-300"
        style={{ opacity: darkMode ? 1 : 0 }}
      />
    </button>
  );
};

export default ThemeToggleButton;
