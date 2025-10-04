import { RootState } from "@/store/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FloatingInputBox from "../InputBox/FloatingInputBox";
import { updateUserDetails } from "@/store/checkoutSlice";
import FloatingSelectBox from "../Dropdown/Dropdown";
import { stateApi } from "@/utils/countryJson";
import ToastHandler from "../ToastHandler/ToastHandler";
import ReactDOM from "react-dom";

const ShippingInfo = () => {
  const dispatch = useDispatch();

  const { userDetails } = useSelector((state: RootState) => state.checkout);

  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  const [statesOption, setStatesOption] = useState<
    { label: string; value: string }[]
  >([]);

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stateData = stateApi ?? [];
      const getStateNames = stateData?.map((state) => {
        return {
          label: state.state,
          value: state.state,
        };
      });

      setStatesOption(getStateNames);
    }
  }, []);

  const validateZipCodes = (zip: string) => {
    const stateData = stateApi ?? [];
    const stateInfo = stateData.find(
      (state) => state.state === userDetails.state
    );

    if (!stateInfo) return;

    dispatch(updateUserDetails({ zipcode: zip }));
    // Check if zip is in valid range
    if (stateInfo?.zipcode.includes(zip)) {
      setToast({
        message: `Zipcode is valid for the selected state - ${userDetails?.state}.`,
        type: "success",
      });
    } else {
      setToast({
        message: `Zipcode does not match selected state`,
        type: "error",
      });
    }
  };

  return (
    <>
      <h2 className="text-base sm:text-xl font-semibold mb-4 leading-5 sm:leading-7">
        Shipping Information
      </h2>

      <div
        className={`flex flex-col gap-4 sm:gap-6 p-0 sm:px-4 sm:py-6 rounded-lg border-0 sm:border-1 ${
          darkMode
            ? " border-yellow-400 bg-black"
            : "border-gray-800 bg-gray-50"
        }`}
      >
        <FloatingInputBox
          label="Country/Region"
          value={userDetails.country}
          onChange={(val: string) =>
            dispatch(updateUserDetails({ country: val }))
          }
          disabled={true}
        />
        <FloatingInputBox
          label="First Name"
          value={userDetails.firstName}
          onChange={(val: string) =>
            dispatch(updateUserDetails({ firstName: val }))
          }
        />
        <FloatingInputBox
          label="Last Name"
          value={userDetails.lastName}
          onChange={(val: string) =>
            dispatch(updateUserDetails({ lastName: val }))
          }
        />
        <FloatingInputBox
          label="Address"
          value={userDetails.address1}
          onChange={(val: string) =>
            dispatch(updateUserDetails({ address1: val }))
          }
        />
        <FloatingInputBox
          label="Apartment, suite, etc. (optional)"
          value={userDetails.address2 ?? ""}
          onChange={(val: string) =>
            dispatch(updateUserDetails({ address2: val }))
          }
        />
        <FloatingInputBox
          label="City"
          value={userDetails.city ?? ""}
          onChange={(val: string) => dispatch(updateUserDetails({ city: val }))}
        />
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <FloatingSelectBox
            label="State"
            value={userDetails.state}
            options={statesOption}
            onChange={(val: string) => {
              if (val === "") {
                dispatch(updateUserDetails({ zipcode: "" }));
              }
              dispatch(updateUserDetails({ state: val }));
            }}
          />
          <div className="flex flex-col gap-2">
            <FloatingInputBox
              label="Zipcode"
              value={userDetails.zipcode}
              onChange={(val: string) => {
                setToast(null);
                if (val.length === 6) {
                  validateZipCodes(val);
                } else {
                  dispatch(updateUserDetails({ zipcode: val }));
                }
              }}
              maxLength={6}
              disabled={userDetails?.state === "" ? true : false}
            />
            {userDetails?.state === "" ? (
              <span
                className={`text-xs italic ${
                  darkMode ? "text-gray-400" : "text-[#ca1325]"
                }`}
              >
                Please select State first
              </span>
            ) : null}
          </div>
        </div>
      </div>

      {toast &&
        ReactDOM.createPortal(
          <ToastHandler
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
            default={false} // or true if default style
          />,
          document.body
        )}
    </>
  );
};

export default ShippingInfo;
