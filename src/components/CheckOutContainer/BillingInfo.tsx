import {
  setBillingSameAsShipping,
  updateBillingDetails,
} from "@/store/checkoutSlice";
import { RootState } from "@/store/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RadioButton from "../RadioButton/RadioButton";
import FloatingInputBox from "../InputBox/FloatingInputBox";
import FloatingSelectBox from "../Dropdown/Dropdown";
import { stateApi } from "@/utils/countryJson";
import ToastHandler from "../ToastHandler/ToastHandler";
import ReactDOM from "react-dom";

const BillingInfo = () => {
  const dispatch = useDispatch();

  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  const { billingDetails, billingSameAsShipping } = useSelector(
    (state: RootState) => state.checkout
  );

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
      (state) => state.state === billingDetails.state
    );

    if (!stateInfo) return;

    dispatch(updateBillingDetails({ zipcode: zip }));
    // Check if zip is in valid range
    if (stateInfo?.zipcode.includes(zip)) {
      setToast({
        message: `Zipcode is valid for the selected state - ${billingDetails?.state}.`,
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
    <div className="mb-4 mt-8">
      <h2 className="text-base sm:text-xl font-semibold leading-5 sm:leading-7 mb-4">
        Billing Address
      </h2>

      <div
        className={`border rounded-lg px-4 py-6 ${
          darkMode
            ? "bg-black border-yellow-400"
            : "bg-white sm:bg-gray-50 border-gray-300"
        }`}
      >
        <RadioButton
          value={billingSameAsShipping ? "same" : "different"}
          onChange={(val: string) =>
            dispatch(setBillingSameAsShipping(val === "same"))
          }
          options={[
            { label: "Same as shipping address", value: "same" },
            {
              label: "Use a different billing address",
              value: "different",
            },
          ]}
          className=""
        />

        {!billingSameAsShipping && (
          <div className="mt-8 flex flex-col gap-4 sm:gap-6 p-0 sm:px-1 sm:pb-2">
            <FloatingInputBox
              label="Country/Region"
              value={billingDetails?.country ?? ""}
              onChange={(val: string) =>
                dispatch(updateBillingDetails({ country: val }))
              }
              disabled={true}
            />
            <div className="flex flex-col sm:flex-row gap-4">
              <FloatingInputBox
                label="First Name"
                value={billingDetails.firstName}
                onChange={(val: string) =>
                  dispatch(updateBillingDetails({ firstName: val }))
                }
              />
              <FloatingInputBox
                label="Last Name"
                value={billingDetails.lastName}
                onChange={(val: string) =>
                  dispatch(updateBillingDetails({ lastName: val }))
                }
              />
            </div>

            <FloatingInputBox
              label="Address"
              value={billingDetails.address1}
              onChange={(val: string) =>
                dispatch(updateBillingDetails({ address1: val }))
              }
            />
            <FloatingInputBox
              label="Apartment, suite, etc. (optional)"
              value={billingDetails.address2 ?? ""}
              onChange={(val: string) =>
                dispatch(updateBillingDetails({ address2: val }))
              }
            />
            <FloatingInputBox
              label="City"
              value={billingDetails.city ?? ""}
              onChange={(val: string) =>
                dispatch(updateBillingDetails({ city: val }))
              }
            />
            <div className="flex flex-col sm:flex-row gap-4">
              <FloatingSelectBox
                label="State"
                value={billingDetails.state}
                options={statesOption}
                onChange={(val: string) => {
                  if (val === "") {
                    dispatch(updateBillingDetails({ zipcode: "" }));
                  }
                  dispatch(updateBillingDetails({ state: val }));
                }}
              />
              <div className="flex flex-col gap-2">
                <FloatingInputBox
                  label="Zipcode"
                  value={billingDetails.zipcode}
                  onChange={(val: string) => {
                    setToast(null);
                    if (val.length === 6) {
                      validateZipCodes(val);
                    } else {
                      dispatch(updateBillingDetails({ zipcode: val }));
                    }
                  }}
                  maxLength={6}
                  disabled={billingDetails?.state === "" ? true : false}
                />
                {billingDetails?.state === "" ? (
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
        )}
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
    </div>
  );
};

export default BillingInfo;
