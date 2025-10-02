// store/checkoutSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Address {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address1: string;
  address2?: string;
  city?: string;
  country: string;
  state: string;
  zipcode: string;
}

interface CheckoutState {
  userDetails: Address;
  billingSameAsShipping: boolean;
  billingDetails?: Address;
  subscribeNewsletter: boolean;
  paymentMethod: string;
}

const initialState: CheckoutState = {
  userDetails: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    country: "India",
    state: "",
    zipcode: "",
    city: "",
  },
  billingSameAsShipping: true,
  billingDetails: undefined,
  subscribeNewsletter: false,
  paymentMethod: "card",
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    updateUserDetails: (state, action: PayloadAction<Partial<Address>>) => {
      state.userDetails = { ...state.userDetails, ...action.payload };
    },
    updateBillingDetails: (state, action: PayloadAction<Partial<Address>>) => {
      state.billingDetails = {
        country: "India",
        ...state.billingDetails,
        ...action.payload,
      } as Address;
    },
    setBillingSameAsShipping: (state, action: PayloadAction<boolean>) => {
      state.billingSameAsShipping = action.payload;
      if (action.payload) state.billingDetails = state.userDetails;
    },
    setSubscribeNewsletter: (state, action: PayloadAction<boolean>) => {
      state.subscribeNewsletter = action.payload;
    },
    setPaymentMethod: (state, action: PayloadAction<string>) => {
      state.paymentMethod = action.payload;
    },
  },
});

export const {
  updateUserDetails,
  updateBillingDetails,
  setBillingSameAsShipping,
  setSubscribeNewsletter,
  setPaymentMethod,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
