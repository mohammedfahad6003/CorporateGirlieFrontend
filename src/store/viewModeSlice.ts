import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ViewModeState {
  viewMode: "grid" | "list";
}

const initialState: ViewModeState = {
  viewMode: "grid", // default
};

const viewSlice = createSlice({
  name: "viewMode",
  initialState,
  reducers: {
    setViewMode: (state, action: PayloadAction<"grid" | "list">) => {
      state.viewMode = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("viewMode", state.viewMode);
      }
    },

    getViewMode: (state) => {
      if (typeof window !== "undefined") {
        const savedMode = localStorage.getItem("viewMode") as "grid" | "list" | null;
        if (savedMode) {
          state.viewMode = savedMode;
        }
      }
    },
  },
});

export const { setViewMode, getViewMode } = viewSlice.actions;
export default viewSlice.reducer;
