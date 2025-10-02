import { configureStore, combineReducers } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import cookieReducer from "./cookieSlice";
import viewModeReducer from "./viewModeSlice";
import cartReducer from "./addCartSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import discountReducer from "./discountSlice";
import checkOutSliceReducer from "./checkoutSlice";

// persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["theme", "cart", "discount"],
};

// combine reducers (so persist works correctly with multiple slices)
const rootReducer = combineReducers({
  theme: themeReducer,
  consent: cookieReducer,
  viewMode: viewModeReducer,
  cart: cartReducer,
  discount: discountReducer,
  checkout: checkOutSliceReducer,
});

// wrap with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
