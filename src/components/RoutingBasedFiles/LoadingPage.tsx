"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function LoadingPage() {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-center justify-center min-h-[60vh] bg-white text-gray-800"
      >
        <div className="flex space-x-2 mb-6" aria-hidden="true">
          <span className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce"></span>
          <span className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce [animation-delay:-0.6s]"></span>
        </div>
        <h2 className="text-lg sm:text-xl font-semibold">Loading page...</h2>
        <p className="mt-2 text-sm opacity-80">
          Fetching the latest collections for you ✨
        </p>
      </div>
    );
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex flex-col items-center justify-center min-h-[60vh] ${
        darkMode ? "bg-black text-yellow-400" : "bg-white text-gray-800"
      }`}
    >
      <div className="flex space-x-2 mb-6" aria-hidden="true">
        <span className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce"></span>
        <span className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
        <span className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce [animation-delay:-0.6s]"></span>
      </div>
      <h2
        className={`text-lg sm:text-xl font-semibold ${
          darkMode ? "text-white" : "text-black"
        }`}
      >
        Loading page...
      </h2>
      <p className={`mt-2 text-sm opacity-80 `}>
        Fetching the latest collections for you ✨
      </p>
    </div>
  );
}
