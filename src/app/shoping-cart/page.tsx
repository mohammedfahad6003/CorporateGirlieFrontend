"use client";

import ProductsContainer from "@/components/ContainerStyles/ProductsContainer";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faCircleArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import Button from "@/components/Button/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { removeFromCart } from "@/store/addCartSlice";

const ShoppingCart: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <ProductsContainer>
      {/* Header */}
      <div className="flex flex-row gap-2 sm:gap-4 items-center mb-6">
        <FontAwesomeIcon
          icon={faCircleArrowLeft}
          className={`cursor-pointer text-base sm:text-2xl ${
            darkMode ? "text-yellow-400" : "text-gray-800"
          }`}
          onClick={() => router.back()}
        />
        <h2 className="text-xl sm:text-3xl font-bold">Shopping Cart</h2>
      </div>

      {/* Empty Cart */}
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <FontAwesomeIcon icon={faBagShopping} className="text-6xl mb-4" />
          <p className="text-lg sm:text-xl">Your cart is empty</p>
          <p className="text-sm sm:text-base mt-1">
            Add items to see them here
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {/* Cart Items */}
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 p-4 border rounded-lg"
            >
              {/* Product Image */}
              <div className="w-full sm:w-1/8 relative aspect-square">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>

              {/* Product Details */}
              <div className="flex-1 flex flex-col gap-2">
                <h3 className="text-lg sm:text-xl font-medium">{item.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  Quantity: {item.quantity}
                </p>
                <p className="text-gray-800 text-base sm:text-lg font-semibold">
                  ₹{Number(item.price).toLocaleString()}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-2 sm:mt-0">
                <Button
                  label="Remove"
                  variant="filled"
                  className="px-4 py-2"
                  onClick={() => dispatch(removeFromCart(item.id))}
                />
              </div>
            </div>
          ))}

          {/* Cart Total */}
          <div className="flex justify-end mt-4">
            <p className="text-lg sm:text-xl font-bold">
              Total: ₹
              {cartItems
                .reduce(
                  (acc, item) => acc + Number(item.price) * item.quantity,
                  0
                )
                .toLocaleString()}
            </p>
          </div>

          {/* Checkout */}
          <div className="flex justify-end mt-2">
            <Button label="Proceed to Checkout" className="px-6 py-2" />
          </div>
        </div>
      )}
    </ProductsContainer>
  );
};

export default ShoppingCart;
