import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import cookieReducer from "./cookieSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    consent: cookieReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
