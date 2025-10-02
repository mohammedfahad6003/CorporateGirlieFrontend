import Image from "next/image";
import React, { useState } from "react";
import { ShoppingCartQuantityContainer } from "./ShoppingCartQuantityContainer";
import { useDispatch, useSelector } from "react-redux";
import { CartItem, removeFromCart, updateQuantity } from "@/store/addCartSlice";
import {
  faTrashCan,
  faCheckCircle,
  faTimes,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RootState } from "@/store/store";
import ShoppingCartPriceContainer from "./ShoppingCartPriceContainer";
import { discountCodes } from "@/utils/commonJson";
import InputBox from "@/components/InputBox/InputBox";
import {
  applyDiscount,
  removeDiscount,
  setDiscountCode,
} from "@/store/discountSlice";
import { useRouter } from "next/navigation";
import Button from "@/components/Button/Button";
import { setConsent } from "@/store/cookieSlice";
import CookieConsentModal from "./CookieCartConsentModal";

const ShoppingCartContainer = () => {
  const dispatch = useDispatch();

  const router = useRouter();

  const cartItems = useSelector((state: RootState) => state.cart.items);

  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  const consent = useSelector((state: RootState) => state.consent.consent);

  const [showPopup, setShowPopup] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const handleCheckout = () => {
    if (consent === "accepted") {
      router.push("/checkout");
    } else {
      setShowPopup(true);
    }
  };

  const handleAcceptCookies = () => {
    dispatch(setConsent("accepted"));
    setShowPopup(false);
    router.push("/checkout");
  };

  const discountCode = useSelector(
    (state: RootState) => state.discount.discountCode
  );
  const appliedCode = useSelector(
    (state: RootState) => state.discount.appliedCode
  );
  const discountValue = useSelector(
    (state: RootState) => state.discount.discountValue
  );

  const handleApplyDiscount = () => {
    if (!discountCode) return;

    const code = discountCode.toUpperCase();
    if (discountCodes[code]) {
      dispatch(
        applyDiscount({ appliedCode: code, discountValue: discountCodes[code] })
      );
      setErrorMessage("");
    } else {
      dispatch(removeDiscount());
      setErrorMessage("Invalid Discount code");
    }
  };

  const handleRemoveDiscount = () => {
    dispatch(removeDiscount());
    setErrorMessage("");
  };

  const handleClickNavigate = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/products/${id}`);
  };

  const calculateDiscountedPrice = (item: CartItem) => {
    if (!item || typeof item.price !== "number")
      return Math.round(item?.price ?? 0);

    const discount = item.discount ?? 0;

    const total = item.price - (item.price * discount) / 100;

    return Math.round(total);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 sm:gap-6">
      {/* Left: Cart Items */}
      <div className="flex-[4] flex flex-col gap-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className={`flex flex-row gap-4 p-4 border rounded-lg ${
              darkMode ? "border-yellow-400" : "border-gray-400"
            }`}
          >
            {/* Product Image */}
            <div
              className={`mt-2 sm:m-0 relative w-[72px] h-[72px] sm:w-24 sm:h-24 flex-shrink-0 flex items-center justify-center border rounded-lg ${
                darkMode ? "border-yellow-400" : "border-gray-400"
              }`}
              onClick={(e) => handleClickNavigate(e, item?.id)}
            >
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover rounded-lg"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faImage}
                  className={`text-2xl sm:text-4xl ${
                    darkMode ? "text-yellow-400" : "text-gray-500"
                  }`}
                />
              )}
            </div>

            {/* Product Details */}
            <div className="flex-1 flex flex-col gap-1">
              <h3
                className="text-sm sm:text-lg font-medium"
                onClick={(e) => handleClickNavigate(e, item?.id)}
              >
                {item.title}
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm mb-3 flex items-center gap-2">
                Price:{" "}
                {item.discount && item.discount > 0 ? (
                  <>
                    {/* Discounted price */}
                    <span className="font-bold">
                      <span className="font-sans">₹ </span>
                      {Math.round(
                        calculateDiscountedPrice(item)
                      ).toLocaleString("en-IN")}
                    </span>
                  </>
                ) : (
                  <span className="font-bold">
                    <span className="font-sans">₹ </span>
                    {Math.round(Number(item.price)).toLocaleString("en-IN")}
                  </span>
                )}
              </p>

              <ShoppingCartQuantityContainer
                quantity={item.quantity}
                onChange={(newQty) =>
                  dispatch(
                    updateQuantity({
                      id: item.id,
                      quantity: newQty,
                    })
                  )
                }
                min={1}
                max={10}
              />
            </div>

            {/* Actions Column */}
            <div className="flex flex-col justify-between items-end ml-2 mt-2">
              {/* Top: Price */}
              <p className="text-sm sm:text-base font-semibold">
                <span className="font-sans">₹ </span>
                {Math.round(
                  calculateDiscountedPrice(item) * item?.quantity
                )?.toLocaleString("en-IN")}
              </p>

              {/* Spacer */}
              <div className="flex-1" />

              {/* Bottom: Trash button */}
              <button
                className="text-[#ca1325] transition-transform duration-300 ease-in-out
                 hover:text-[#c41037] hover:scale-110 hover:-rotate-12 cursor-pointer"
                onClick={() => dispatch(removeFromCart(item.id))}
              >
                <FontAwesomeIcon icon={faTrashCan} className="text-lg" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div
        className={`block sm:hidden border-1 ${
          darkMode ? "border-yellow-400" : "border-gray-400"
        }`}
      ></div>

      {/* Right: Price Breakdown */}
      <div className="flex-[2]">
        {/* Discount Code Input */}
        <div className="mb-3 sm:mb-8">
          <div className="flex gap-3 items-center mb-3">
            <InputBox
              type="text"
              placeholder="Discount code"
              value={discountCode}
              onChange={(value) => dispatch(setDiscountCode(value))}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleApplyDiscount();
                }
              }}
            />
            <button
              className={`px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer ${
                darkMode
                  ? "bg-yellow-400 text-black hover:bg-yellow-500"
                  : "bg-gray-900 text-white hover:bg-gray-800"
              }`}
              onClick={handleApplyDiscount}
            >
              Apply
            </button>
          </div>

          {/* Applied Discount Badge */}
          {appliedCode && discountValue && (
            <div
              className={`flex items-center justify-between mb-2 text-sm font-medium rounded-md px-3 py-2 ${
                darkMode
                  ? "bg-gray-800 border border-yellow-400 text-white"
                  : "bg-green-100 text-green-600"
              }`}
            >
              <div className="flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className={darkMode ? "text-yellow-400" : ""}
                />
                <span>
                  Code <strong>{appliedCode}</strong> applied:{" "}
                  {discountValue.includes("%") ? (
                    discountValue
                  ) : (
                    <>
                      <strong>
                        <span className="font-sans font-medium">₹ </span>
                        {Number(discountValue).toLocaleString("en-IN")}{" "}
                      </strong>
                    </>
                  )}
                </span>
              </div>
              <button
                onClick={handleRemoveDiscount}
                className={`transition cursor-pointer ${
                  darkMode ? "hover:text-yellow-300" : "hover:text-green-900"
                }`}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          )}

          {/* Error Badge */}
          {errorMessage && (
            <div
              className={`flex items-center gap-2 mb-2 text-sm font-medium rounded-md px-3 py-2 ${
                darkMode
                  ? "bg-gray-900 border border-yellow-400 text-white"
                  : "bg-red-100 text-red-600"
              }`}
            >
              <FontAwesomeIcon
                icon={faTimes}
                className={darkMode ? "text-yellow-400" : "text-red-600"}
              />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>

        <ShoppingCartPriceContainer discountValue={discountValue} />

        <div className="flex sm:flex-row flex-col mt-4 lg:mt-6 w-full lg:w-10/12 mx-auto">
          <Button
            label="Proceed To Checkout"
            variant="filled"
            className="w-full"
            onClick={handleCheckout}
          />
        </div>
      </div>

      {showPopup && (
        <CookieConsentModal
          isOpen={showPopup}
          onClose={() => setShowPopup(false)}
          onAccept={handleAcceptCookies}
          triggerShake={true} // 👈 makes modal shake for 3s
        />
      )}
    </div>
  );
};

export default ShoppingCartContainer;
