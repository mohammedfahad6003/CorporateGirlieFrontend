"use client";

import React, { useState } from "react";
import InputBox from "@/components/InputBox/InputBox";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import TextArea from "@/components/TextArea/TextArea";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faMapMarkerAlt,
  faUser,
  faPhone,
  faHashtag,
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";
import PolicyContainer from "@/components/ContainerStyles/PolicyContainer";
import { COMMON_VARIABLES } from "@/utils/commonVariables";
import emailjs from "emailjs-com";
import ToastHandler from "@/components/ToastHandler/ToastHandler";
import Button from "@/components/Button/Button";

const ContactUs = () => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  const initialData = {
    name: "",
    email: "",
    phoneNumber: "",
    queryType: "no",
    orderNumber: "",
    message: "",
  };

  const [formData, setFormData] = useState(initialData);

  const [errors, setErrors] = useState({
    email: "",
    phoneNumber: "",
    orderNumber: "",
  });

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const handleSubmit = async () => {
    const newErrors = { email: "", phoneNumber: "", orderNumber: "" };
    let hasError = false;

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      hasError = true;
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) return;

    setLoading(true);

    let newDescription = formData.message;
    if (formData.queryType === "yes" && formData.orderNumber) {
      newDescription =
        `Order Number: ${formData.orderNumber} \n\n` + newDescription;
    }

    const serviceId = process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE_ID_CONTACT_US!;
    const templateId = process.env.NEXT_PUBLIC_EMAIL_JS_TEMPLATE_ID!;
    const publicKey = process.env.NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY;

    await emailjs
      .send(
        serviceId,
        templateId,
        {
          name: formData.name,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          message: newDescription,
        },
        publicKey
      )
      .then(
        () => {
          setToast({
            message:
              "Thank you! Your message has been sent. We’ll contact you shortly.",
            type: "success",
          });
          setFormData(initialData);
          setLoading(false);
        },
        (err: unknown) => {
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
      <PolicyContainer>
        <h1 className={`sm:text-3xl text-xl font-bold sm:mb-6 mb-4`}>
          Contact Us
        </h1>

        {/* Contact Info */}
        <div className="flex flex-col mb-4">
          <div className={`flex items-center gap-3 pb-2 sm:pb-4`}>
            <a
              href={`mailto:${COMMON_VARIABLES.emailId}?subject=Inquiry Message to Corporate Girlie Arts&cc=${COMMON_VARIABLES.ccId}`}
              className={`flex items-center gap-2 transition text-yellow-400 text-sm sm:text-lg`}
            >
              <FontAwesomeIcon icon={faEnvelope} />
              <span
                className={`cursor-pointer ${
                  darkMode
                    ? "text-yellow-400 hover:underline"
                    : "text-black hover:underline hover:text-yellow-400"
                }`}
              >
                {COMMON_VARIABLES.emailId}
              </span>
            </a>
          </div>

          <div
            className={`flex items-center gap-2 pb-2 sm:pb-4 text-sm sm:text-lg`}
          >
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              className="text-yellow-400"
            />
            <span
              className={`cursor-pointer ${
                darkMode
                  ? "text-yellow-400 hover:underline"
                  : "text-black hover:underline hover:text-yellow-400"
              }`}
            >
              Bangalore, India
            </span>
          </div>
        </div>

        <p
          className={`mb-8 sm:text-md text-sm ${
            darkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Have a question or need support? Use the form below to reach out. You
          can ask about our services, products, or provide feedback. If your
          query is order-related, please select &quot;Yes&quot; and provide your
          order number so we can assist you faster.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-0 sm:mb-6">
          {/* Name */}
          <div className="mb-3 sm:mb-0">
            <label className="flex items-center gap-2 font-semibold mb-2 text-sm sm:text-lg">
              <FontAwesomeIcon icon={faUser} className="text-yellow-400" />
              Name
            </label>
            <InputBox
              type="text"
              placeholder="Enter your Name"
              value={formData.name}
              onChange={(value) => handleChange("name", value)}
            />
          </div>

          {/* Phone Number */}
          <div className="mb-6 sm:mb-0">
            <label className="flex items-center gap-2 font-semibold mb-2 text-sm sm:text-lg">
              <FontAwesomeIcon icon={faPhone} className="text-yellow-400" />
              Phone Number
            </label>
            <InputBox
              type="number"
              placeholder="Enter your phone*"
              value={formData.phoneNumber}
              onChange={(value) => handleChange("phoneNumber", value)}
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="mb-6">
          <label className="flex items-center gap-2 font-semibold mb-2 text-sm sm:text-lg">
            <FontAwesomeIcon icon={faEnvelope} className="text-yellow-400" />
            Email
          </label>
          <InputBox
            type="text"
            placeholder="Enter your email*"
            value={formData.email}
            onChange={(value) => handleChange("email", value)}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Query Type */}
        <div className="mb-6">
          <label className="font-semibold block mb-2">
            Is this query order related?
          </label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer text-sm sm:text-lg">
              <input
                type="radio"
                name="queryType"
                value="yes"
                checked={formData.queryType === "yes"}
                onChange={() => handleChange("queryType", "yes")}
              />
              <span>Yes</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-sm sm:text-lg">
              <input
                type="radio"
                name="queryType"
                value="no"
                checked={formData.queryType === "no"}
                onChange={() => handleChange("queryType", "no")}
              />
              <span>No</span>
            </label>
          </div>
        </div>

        {/* Order Number */}
        {formData.queryType === "yes" && (
          <div className="mb-6">
            <label className="flex items-center gap-2 font-semibold mb-2 text-sm sm:text-lg">
              <FontAwesomeIcon icon={faHashtag} className="text-yellow-400" />
              Order Number
            </label>
            <InputBox
              type="text"
              placeholder="Enter your order number*"
              value={formData.orderNumber || ""}
              onChange={(value) => handleChange("orderNumber", value)}
            />
            {errors.orderNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.orderNumber}</p>
            )}
          </div>
        )}

        {/* Message */}
        <div className="mb-6">
          <label className="flex items-center gap-2 font-semibold mb-2 text-sm sm:text-lg">
            <FontAwesomeIcon icon={faCommentDots} className="text-yellow-400" />
            Message
          </label>
          <TextArea
            placeholder="Your message..."
            value={formData.message}
            onChange={(val) => handleChange("message", val)}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            variant="filled"
            label="Send Message"
            onClick={() => handleSubmit()}
            loading={loading}
          />
        </div>
      </PolicyContainer>
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

export default ContactUs;
