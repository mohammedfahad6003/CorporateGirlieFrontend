import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { CartItem } from "@/store/addCartSlice";
import BillingInfo from "./BillingInfo";
import PaymentGatewayInfo from "./PaymentGatewayInfo";

const CheckoutRightContainer = () => {
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
      <PaymentGatewayInfo />
      <BillingInfo />
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
