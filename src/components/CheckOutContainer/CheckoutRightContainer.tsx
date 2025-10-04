import React from "react";
import RadioButton from "../RadioButton/RadioButton";
import { setBillingSameAsShipping, updateBillingDetails } from "@/store/checkoutSlice";
import FloatingInputBox from "../InputBox/FloatingInputBox";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { CartItem } from "@/store/addCartSlice";

const CheckoutRightContainer = () => {
  const dispatch = useDispatch();
  const { billingSameAsShipping, billingDetails } = useSelector(
    (state: RootState) => state.checkout
  );

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

  return (
    <div className={`flex-1 space-y-2`}>
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
          <FloatingInputBox
            label="Billing Address Line 1"
            value={billingDetails?.address1 ?? ""}
            onChange={(val: string) =>
              dispatch(updateBillingDetails({ address1: val }))
            }
          />
          <FloatingInputBox
            label="Billing Address Line 2"
            value={billingDetails?.address2 ?? ""}
            onChange={(val: string) =>
              dispatch(updateBillingDetails({ address2: val }))
            }
          />
          <FloatingInputBox
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
  );
};

export default CheckoutRightContainer;
