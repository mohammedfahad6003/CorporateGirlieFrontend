"use client";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function ThemeSync() {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    if (darkMode) {
      // Dark Mode = Full Black
      root.style.setProperty("--background", "#000000");
      root.style.setProperty("--foreground", "#000000");
      root.style.setProperty("--scrollbar-thumb", "#000000");
      root.style.setProperty("--scrollbar-thumb-hover", "#000000");
      root.style.setProperty("--scrollbar-track", "#000000");
    } else {
      // Light Mode = Full Grey
      root.style.setProperty("--background", "#9ca3af");
      root.style.setProperty("--foreground", "#000000");
      root.style.setProperty("--scrollbar-thumb", "#9ca3af");
      root.style.setProperty("--scrollbar-thumb-hover", "#9ca3af");
      root.style.setProperty("--scrollbar-track", "#9ca3af");
    }

    // Universal scrollbar width
    root.style.setProperty("--scrollbar-width", "2px");
    root.style.setProperty("--scrollbar-radius", "4px");

    // Detect if mobile (hide scrollbar completely)
    const isMobile = window.innerWidth < 640;
    if (isMobile) {
      root.style.setProperty("--scrollbar-width", "0px");
    }

    // Mirror onto body
    [
      "--scrollbar-thumb",
      "--scrollbar-thumb-hover",
      "--scrollbar-track",
    ].forEach((v) => {
      body.style.setProperty(v, getComputedStyle(root).getPropertyValue(v));
    });

    void document.documentElement.offsetWidth; // force reflow
  }, [darkMode]);

  return null;
}
