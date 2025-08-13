import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

interface ToastHandlerProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

const ToastHandler: React.FC<ToastHandlerProps> = ({
  message,
  type,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const baseStyles =
    "fixed top-5 left-1/2 -translate-x-1/2 w-[100%] max-w-lg flex items-center gap-3 px-4 py-3 border-l-8 rounded-lg shadow-lg transition-opacity duration-300";

  const typeStyles =
    type === "success"
      ? "border-green-600 bg-green-100 text-black"
      : "border-red-600 bg-red-100 text-black";

  const icon = type === "success" ? faCheckCircle : faTimesCircle;

  return (
    <div className={`${baseStyles} ${typeStyles}`}>
      <FontAwesomeIcon
        icon={icon}
        size="lg"
        className={type === "success" ? "text-green-600" : "text-red-600"}
      />
      <span className="font-medium flex-1">{message}</span>
    </div>
  );
};

export default ToastHandler;
