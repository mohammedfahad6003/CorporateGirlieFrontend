'use client';

import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { store } from "@/store/store";
import React from "react";
import { Provider } from "react-redux";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </Provider>
  );
};

export default AppProvider;
