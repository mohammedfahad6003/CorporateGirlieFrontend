import { RootState } from "@/store/store";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Button from "../Button/Button";

const ErrorPage = ({ error, reset }: { error: Error; reset: () => void }) => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  useEffect(() => {
    console.error("Category Page Error:", error);
  }, [error]);

  return (
    <div
      role="alert"
      className={`flex flex-col items-center justify-center min-h-[60vh] text-center px-4 ${
        darkMode ? "bg-black text-yellow-400" : "bg-white text-gray-800"
      }`}
    >
      <h2 className="text-2xl font-bold mb-2">Something went wrong 😔</h2>
      <p className="text-sm mb-6 opacity-80">
        We couldn’t load this page. Please try again.
      </p>

      <Button
        label="Retry"
        onClick={reset}
        className="transition-colors"
        variant="filled"
      />
    </div>
  );
};

export default ErrorPage;
