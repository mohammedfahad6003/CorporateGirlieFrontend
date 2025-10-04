import { RootState } from "@/store/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import FloatingInputBox from "../InputBox/FloatingInputBox";
import { updateUserDetails } from "@/store/checkoutSlice";

const ContactInfo = () => {
  const dispatch = useDispatch();

  const { userDetails } = useSelector((state: RootState) => state.checkout);

  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  return (
    <>
      <h2 className="text-base sm:text-xl font-semibold mb-4 leading-5 sm:leading-7">
        Contact Information
      </h2>

      <div
        className={`flex flex-col gap-4 sm:gap-6 p-0 sm:px-4 sm:py-6 rounded-lg border-0 sm:border-1 mb-8 ${
          darkMode
            ? " border-yellow-400 bg-black"
            : "border-gray-800 bg-white sm:bg-gray-50"
        }`}
      >
        <FloatingInputBox
          label="Email"
          value={userDetails.email}
          onChange={(val: string) =>
            dispatch(updateUserDetails({ email: val }))
          }
        />
        <FloatingInputBox
          label="Phone Number"
          value={userDetails.phone}
          onChange={(val: string) =>
            dispatch(updateUserDetails({ phone: val }))
          }
        />
      </div>
    </>
  );
};

export default ContactInfo;
