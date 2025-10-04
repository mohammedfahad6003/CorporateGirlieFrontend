import { setSubscribeNewsletter } from "@/store/checkoutSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckBox from "../CheckBox/CheckBox";
import PaymentGatewayInfo from "./PaymentGatewayInfo";
import ContactInfo from "./ContactInfo";
import ShippingInfo from "./ShippingInfo";
import { RootState } from "@/store/store";

const CheckoutLeftContainer = () => {
  const dispatch = useDispatch();

  const { subscribeNewsletter } = useSelector(
    (state: RootState) => state.checkout
  );

  return (
    <div className={`flex-1 space-y-2`}>
      <ContactInfo />

      <ShippingInfo />

      <CheckBox
        label="Subscribe to news and updates"
        checked={subscribeNewsletter}
        onChange={(val: boolean) => dispatch(setSubscribeNewsletter(val))}
        className="mt-4 mb-8"
      />

      <PaymentGatewayInfo />
    </div>
  );
};

export default CheckoutLeftContainer;
