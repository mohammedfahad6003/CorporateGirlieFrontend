import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DiscountState {
  discountCode: string;
  appliedCode: string;
  discountValue: string;
}

const initialState: DiscountState = {
  discountCode: "",
  appliedCode: "",
  discountValue: "",
};

const discountSlice = createSlice({
  name: "discount",
  initialState,
  reducers: {
    setDiscountCode(state, action: PayloadAction<string>) {
      state.discountCode = action.payload;
    },
    applyDiscount(
      state,
      action: PayloadAction<{ appliedCode: string; discountValue: string }>
    ) {
      state.appliedCode = action.payload.appliedCode;
      state.discountValue = action.payload.discountValue;
    },
    removeDiscount(state) {
      state.discountCode = "";
      state.appliedCode = "";
      state.discountValue = "";
    },
  },
});

export const { setDiscountCode, applyDiscount, removeDiscount } =
  discountSlice.actions;
export default discountSlice.reducer;
