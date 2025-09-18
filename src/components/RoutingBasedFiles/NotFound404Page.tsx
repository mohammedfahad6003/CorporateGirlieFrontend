import { RootState } from "@/store/store";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const NotFound404Page = () => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-[60vh] text-center px-4 ${
        darkMode ? "bg-black text-yellow-400" : "bg-white text-gray-800"
      }`}
    >
      <h1 className="text-2xl sm:text-4xl font-bold mb-3">404</h1>
      <h2 className="text-lg sm:text-xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-xs sm:text-sm mb-6 opacity-80">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
          darkMode
            ? "bg-yellow-400 text-black hover:bg-yellow-300"
            : "bg-gray-800 text-white hover:bg-gray-700"
        }`}
      >
        Back to Home Page
      </Link>
    </div>
  );
};

export default NotFound404Page;
