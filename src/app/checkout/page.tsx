"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  updateUserDetails,
  updateBillingDetails,
  setBillingSameAsShipping,
  setSubscribeNewsletter,
} from "@/store/checkoutSlice";
import CheckBox from "@/components/CheckBox/CheckBox";
import RadioButton from "@/components/RadioButton/RadioButton";
import { CartItem } from "@/store/addCartSlice";
import { smoothScrollToTop } from "@/utils/helperFunctions";
import CheckoutHeadDetailsContainer from "../../components/CheckOutContainer/CheckoutHeadDetailsContainer";
import FloatingInpuxBox from "@/components/InputBox/FloatingInpuxBox";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const {
    userDetails,
    billingSameAsShipping,
    billingDetails,
    subscribeNewsletter,
  } = useSelector((state: RootState) => state.checkout);

  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const getDiscountedPrice = (item: CartItem) => {
    if (!item.isSale || !item.discount) return Math.round(Number(item.price));
    const discounted = item.price - (item.price * item.discount) / 100;
    return Math.round(discounted);
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + getDiscountedPrice(item) * item.quantity,
    0
  );

  const totalDiscount = cartItems.reduce(
    (acc, item) =>
      item.isSale && item.discount
        ? acc + Math.round((item.price * item.discount) / 100) * item.quantity
        : acc,
    0
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      smoothScrollToTop();
    }
  }, []);

  return (
    <div
      className={`select-none min-h-screen ${
        darkMode ? "bg-black text-white" : "text-black bg-white"
      }`}
    >
      {/* Head Styles */}
      <CheckoutHeadDetailsContainer />

      {/* User & Payment Section */}
      <div className="max-w-full px-6 py-6 sm:px-8 md:px-16 2xl:px-48 space-y-6 select-none">
        <div className="flex flex-col sm:flex-row gap-8">
          {/* Left - User Details */}
          <div className={`flex-1 space-y-2`}>
            <h2 className="text-base sm:text-xl font-semibold mb-4 leading-5 sm:leading-7">
              Contact Information
            </h2>

            <div
              className={`flex flex-col gap-4 sm:gap-6 p-0 sm:p-4 rounded-lg border-0 sm:border-1 mb-8 ${
                darkMode
                  ? " border-yellow-400 bg-black"
                  : "border-gray-800 bg-gray-50"
              }`}
            >
              <FloatingInpuxBox
                label="Email"
                value={userDetails.email}
                onChange={(val: string) =>
                  dispatch(updateUserDetails({ email: val }))
                }
              />
              <FloatingInpuxBox
                label="Phone Number"
                value={userDetails.phone}
                onChange={(val: string) =>
                  dispatch(updateUserDetails({ phone: val }))
                }
              />
            </div>

            <h2 className="text-base sm:text-xl font-semibold mb-4 leading-5 sm:leading-7">
              Shipping Information
            </h2>

            <div
              className={`flex flex-col gap-4 sm:gap-6 p-0 sm:p-4 rounded-lg border-0 sm:border-1 ${
                darkMode
                  ? " border-yellow-400 bg-black"
                  : "border-gray-800 bg-gray-50"
              }`}
            >
              <FloatingInpuxBox
                label="Country"
                value={userDetails.country}
                onChange={(val: string) =>
                  dispatch(updateUserDetails({ country: val }))
                }
              />
              <FloatingInpuxBox
                label="First Name"
                value={userDetails.firstName}
                onChange={(val: string) =>
                  dispatch(updateUserDetails({ firstName: val }))
                }
              />
              <FloatingInpuxBox
                label="Last Name"
                value={userDetails.lastName}
                onChange={(val: string) =>
                  dispatch(updateUserDetails({ lastName: val }))
                }
              />
              <FloatingInpuxBox
                label="Address"
                value={userDetails.address1}
                onChange={(val: string) =>
                  dispatch(updateUserDetails({ address1: val }))
                }
              />
              <FloatingInpuxBox
                label="Apartment, suite, etc. (optional)"
                value={userDetails.address2 ?? ""}
                onChange={(val: string) =>
                  dispatch(updateUserDetails({ address2: val }))
                }
              />
              <FloatingInpuxBox
                label="City"
                value={userDetails.city ?? ""}
                onChange={(val: string) =>
                  dispatch(updateUserDetails({ city: val }))
                }
              />
              <FloatingInpuxBox
                label="State"
                value={userDetails.state}
                onChange={(val: string) =>
                  dispatch(updateUserDetails({ state: val }))
                }
              />
              <FloatingInpuxBox
                label="Zipcode"
                value={userDetails.zipcode}
                onChange={(val: string) =>
                  dispatch(updateUserDetails({ zipcode: val }))
                }
              />
            </div>

            <CheckBox
              label="Subscribe to news and updates"
              checked={subscribeNewsletter}
              onChange={(val: boolean) => dispatch(setSubscribeNewsletter(val))}
              className="mt-4"
            />
          </div>

          {/* Right - Payment Details */}
          <div className="flex-1 space-y-4 border p-4 rounded-md">
            <h2 className="text-xl font-semibold">Payment Method</h2>
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
              <div className="mt-4 space-y-2">
                <h3 className="text-lg font-semibold">Billing Address</h3>
                <FloatingInpuxBox
                  label="Billing Address Line 1"
                  value={billingDetails?.address1 ?? ""}
                  onChange={(val: string) =>
                    dispatch(updateBillingDetails({ address1: val }))
                  }
                />
                <FloatingInpuxBox
                  label="Billing Address Line 2"
                  value={billingDetails?.address2 ?? ""}
                  onChange={(val: string) =>
                    dispatch(updateBillingDetails({ address2: val }))
                  }
                />
                <FloatingInpuxBox
                  label="Billing Zipcode"
                  value={billingDetails?.zipcode ?? ""}
                  onChange={(val: string) =>
                    dispatch(updateBillingDetails({ zipcode: val }))
                  }
                />
              </div>
            )}

            <div className="mt-6 space-y-1">
              <h3 className="text-lg font-semibold">Cart Summary</h3>
              <p>Subtotal: ₹{subtotal}</p>
              <p>Discount: -₹{totalDiscount}</p>
              <p className="font-bold">Total: ₹{subtotal}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
