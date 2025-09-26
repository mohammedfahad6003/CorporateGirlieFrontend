import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface PriceCart {
  discountValue: string; // could be '50' or '10%'
}

const ShoppingCartPriceContainer: React.FC<PriceCart> = ({ discountValue }) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  );

  // Calculate discount
  let discountAmount = 0;
  if (discountValue) {
    if (discountValue.includes("%")) {
      const percent = parseFloat(discountValue.replace("%", ""));
      discountAmount = Math.floor((subtotal * percent) / 100);
    } else {
      discountAmount = Number(discountValue);
    }
  }

  // Shipping calculation
  let shipping = 250;
  if (subtotal < 300) shipping = 50;
  else if (subtotal < 600) shipping = 100;
  else if (subtotal < 1000) shipping = 150;
  else if (subtotal < 2000) shipping = 200;

  const finalTotal = subtotal - discountAmount + shipping;

  return (
    <div
      className={`p-6 rounded-lg border ${
        darkMode
          ? "bg-gray-950 text-white border-yellow-400"
          : "bg-gray-50 text-gray-800 border-gray-400"
      }`}
    >
      <h3 className="text-lg font-semibold mb-4">Price Details</h3>

      {/* Product-wise Breakdown */}
      <div className="mb-4 space-y-3 text-sm sm:text-base">
        {cartItems.map((item) => (
          <div key={item.id} className="flex flex-col gap-1">
            <div
              className={`font-medium text-sm sm:text-base truncate ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              {item.title}
            </div>
            <div className="flex justify-between">
              <span className={`text-xs sm:text-sm ${darkMode ? "text-gray-500" : "text-gray-700"}`}>
                ({item.quantity} × <span className="font-serif">₹ </span>
                {Number(item.price).toLocaleString()})
              </span>
              <span className="text-sm sm:text-base">
                <span className="font-serif">₹ </span>
                {(Number(item.price) * item.quantity).toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t my-2"></div>

      {/* Subtotal */}
      <div className="flex justify-between mb-2 text-sm sm:text-base">
        <span>Subtotal</span>
        <span>
          <span className="font-serif">₹ </span>
          {subtotal.toLocaleString()}
        </span>
      </div>

      {/* Shipping */}
      <div className="flex justify-between mb-2 text-sm sm:text-base">
        <span>Shipping</span>
        <span>
          <span className="font-serif">₹ </span>
          {shipping}
        </span>
      </div>

      {/* Discount Value */}
      {discountAmount > 0 && (
        <div className="flex justify-between mb-2 text-sm sm:text-base">
          <span>Discount</span>
          <span className="text-green-500">
            - <span className="font-serif">₹ </span>
            {discountAmount.toLocaleString()}
          </span>
        </div>
      )}

      <div className="border-t my-2"></div>

      {/* Final Total */}
      <div className="flex justify-between text-base sm:text-lg font-bold">
        <span>Total</span>
        <span>
          <span className="font-serif">₹</span>
          {finalTotal.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default ShoppingCartPriceContainer;
