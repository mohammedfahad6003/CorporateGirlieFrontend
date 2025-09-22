"use client";

import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "../Button/Button";

const NotFound404Page = () => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  const [mounted, setMounted] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Prevent mismatch by returning nothing or a skeleton until client mounts
    return null;
  }

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-[60vh] text-center px-4 ${
        darkMode ? "bg-black text-gray-200" : "bg-white text-gray-800"
      }`}
    >
      <h1
        className={`text-2xl sm:text-4xl font-bold mb-3 ${
          darkMode ? "text-yellow-400" : ""
        }`}
      >
        404
      </h1>
      <h2
        className={`text-lg sm:text-xl font-semibold mb-2 ${
          darkMode ? "text-yellow-400" : ""
        }`}
      >
        Page Not Found
      </h2>
      <p className="text-xs sm:text-sm mb-6 opacity-80">
        Sorry, the page you are looking for does not exist.
      </p>
      <Button
        label="Back to Home Page"
        onClick={() => router.push("/")}
        className="transition-colors"
        variant="filled"
      />
    </div>
  );
};

export default NotFound404Page;
