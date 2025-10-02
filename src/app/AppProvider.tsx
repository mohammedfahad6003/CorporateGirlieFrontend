"use client";

import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { persistor, store } from "@/store/store";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import ThemeSync from "./ThemeSync";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  return (
    <div
      className={`flex flex-col min-h-screen ${
        darkMode ? "bg-black" : "bg-white"
      }`}
    >
      <ThemeSync />
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppWrapper>{children}</AppWrapper>
      </PersistGate>
    </Provider>
  );
};

export default AppProvider;
