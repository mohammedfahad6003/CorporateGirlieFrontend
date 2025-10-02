"use client";

import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { persistor, store } from "@/store/store";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import ThemeSync from "./ThemeSync";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="flex flex-col min-h-screen">
          <ThemeSync />
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </PersistGate>
    </Provider>
  );
};

export default AppProvider;
