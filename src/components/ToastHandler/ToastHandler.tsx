"use client";

import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface ToastHandlerProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
  default?: boolean;
}

const ToastHandler: React.FC<ToastHandlerProps> = ({
  message,
  type,
  onClose,
  default: isDefault = true,
}) => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const baseStyles =
    "text-xs sm:text-sm fixed z-50 flex items-start sm:items-center gap-2 sm:gap-3 p-2 sm:px-4 sm:py-3 border-l-8 rounded-lg shadow-lg transition-opacity duration-300";

  const positionStyles = isDefault
    ? "top-10 left-1/2 -translate-x-1/2 w-[100%] max-w-lg"
    : "top-10 sm:top-4 right-2 sm:right-4 w-[50%] sm:w-[350px]";

  const typeStyles = darkMode
    ? type === "success"
      ? "border-green-600 bg-black text-white"
      : "border-[#CA1325] bg-black text-white"
    : type === "success"
    ? "border-green-600 bg-gray-50 text-black"
    : "border-[#CA1325] bg-gray-50 text-black";

  const iconColor = darkMode
    ? type === "success"
      ? "text-green-600"
      : "text-[#CA1325]"
    : type === "success"
    ? "text-green-600"
    : "text-[#CA1325]";

  return (
    <div
      className={`${baseStyles} ${positionStyles} ${typeStyles} opacity-100`}
    >
      <FontAwesomeIcon
        icon={type === "success" ? faCheckCircle : faTimesCircle}
        size="lg"
        className={iconColor}
      />
      <span className="font-medium flex-1">{message}</span>
    </div>
  );
};

export default ToastHandler;
