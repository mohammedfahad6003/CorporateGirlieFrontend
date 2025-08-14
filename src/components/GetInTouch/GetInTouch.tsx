import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import InputBox from "../InputBox/InputBox";
import TextArea from "../TextArea/TextArea";
import emailjs from "emailjs-com";
import ToastHandler from "../ToastHandler/ToastHandler";

const GetInTouch = () => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  const initialData = {
    name: "",
    email: "",
    phoneNumber: "",
    description: "",
  };

  const [getInTouch, setGetInTouch] = useState(initialData);

  const [errors, setErrors] = useState({
    email: "",
    phoneNumber: "",
  });

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const handleChange = (field: keyof typeof getInTouch, value: string) => {
    setGetInTouch((prev) => ({
      ...prev,
      [field]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const newErrors = { email: "", phoneNumber: "" };
    let hasError = false;

    if (!getInTouch.email.trim()) {
      newErrors.email = "Email is required";
      hasError = true;
    }
    if (!getInTouch.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
      hasError = true;
    }

    setErrors(newErrors);
    setGetInTouch(initialData);

    if (hasError) return;

    emailjs
      .send(
        "service_l1lim6c",
        "template_4ywbyf9",
        {
          name: getInTouch.name,
          email: getInTouch.email,
          phoneNumber: getInTouch.phoneNumber,
          message: getInTouch.description,
        },
        "xWPnbc_u0McpZz0tG"
      )
      .then(
        () => {
          setToast({
            message: "Message sent successfully!",
            type: "success",
          });
          setGetInTouch(initialData);
        },
        (err) => {
          console.error("FAILED...", err);
          setToast({
            message: "Failed to send message. Please try again.",
            type: "error",
          });
        }
      );
  };

  return (
    <div
      className={`
        sm:p-8 p-6 flex flex-col items-center justify-center gap-6
        ${
          darkMode
            ? "bg-black border-1 border-y-yellow-300"
            : "bg-yellow-300 border-1 border-yellow-300"
        }
      `}
    >
      <h2
        className={`
          sm:text-2xl font-bold text-lg
          ${darkMode ? "text-yellow-400" : "text-gray-900"}
        `}
      >
        {`We’d Love to Hear from You!`}
      </h2>

      <div className="w-full max-w-3xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <InputBox
            type="text"
            placeholder="Name"
            value={getInTouch.name}
            onChange={(value) => handleChange("name", value)}
          />
          <div>
            <InputBox
              type="number"
              placeholder="Phone Number*"
              value={getInTouch.phoneNumber}
              onChange={(value) => handleChange("phoneNumber", value)}
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
            )}
          </div>
        </div>

        <div className="mb-4">
          <div>
            <InputBox
              type="text"
              placeholder="Email*"
              value={getInTouch.email}
              onChange={(value) => handleChange("email", value)}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
        </div>

        <div className="mb-4">
          <TextArea
            placeholder="Your message..."
            value={getInTouch.description}
            onChange={(val) => handleChange("description", val)}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            onClick={(e) => handleSubmit(e)}
            className={`
              font-semibold px-6 py-2 rounded-md transition-all cursor-pointer sm:text-lg text-sm 
              ${
                darkMode
                  ? "bg-yellow-400 text-white hover:bg-yellow-300"
                  : "bg-gray-900 text-white hover:bg-gray-800"
              }
            `}
          >
            Send Message
          </button>
        </div>
      </div>
      {toast && (
        <ToastHandler
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default GetInTouch;
