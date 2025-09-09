import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import InputBox from "../InputBox/InputBox";
import TextArea from "../TextArea/TextArea";
import emailjs from "emailjs-com";
import ToastHandler from "../ToastHandler/ToastHandler";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

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

  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
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

    if (hasError) return;

    setLoading(true);

    const serviceId = process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE_ID_GET_IN_TOUCH!;
    const templateId = process.env.NEXT_PUBLIC_EMAIL_JS_TEMPLATE_ID!;
    const publicKey = process.env.NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY;

    await emailjs
      .send(
        serviceId,
        templateId,
        {
          name: getInTouch.name,
          email: getInTouch.email,
          phoneNumber: getInTouch.phoneNumber,
          message: getInTouch.description,
        },
        publicKey
      )
      .then(
        () => {
          setToast({
            message:
              "Thank you for getting in touch! We value your time and will respond to you shortly.",
            type: "success",
          });
          setGetInTouch(initialData);
          setLoading(false);
        },
        (err) => {
          console.error("FAILED...", err);
          setToast({
            message: "Failed to send message. Please try again.",
            type: "error",
          });
          setLoading(false);
        }
      );
  };

  return (
    <>
      <div
        className={`
        sm:p-8 p-6 flex flex-col items-center justify-center gap-6
        ${
          darkMode
            ? "bg-black border-t border-y-yellow-400"
            : "bg-yellow-400 border-t border-yellow-400"
        }
      `}
      >
        <h2
          className={`
          sm:text-2xl font-bold text-lg
          ${darkMode ? "text-yellow-400" : "text-gray-900"}
        `}
        >
          {`Let's Get In Touch !!!`}
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
                <p className="text-red-500 text-sm mt-1">
                  {errors.phoneNumber}
                </p>
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
              disabled={loading}
              className={`
                font-semibold px-6 py-2 rounded-md transition-all cursor-pointer sm:text-lg text-sm flex items-center justify-center gap-2
                ${
                  darkMode
                    ? "bg-yellow-400 text-white hover:bg-yellow-400"
                    : "bg-gray-900 text-white hover:bg-gray-800"
                }
                ${loading ? "opacity-70 cursor-not-allowed" : ""}
              `}
            >
              {loading && (
                <FontAwesomeIcon icon={faSpinner} spin className="text-white" />
              )}
              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>
        </div>
      </div>
      {toast && (
        <ToastHandler
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
};

export default GetInTouch;
