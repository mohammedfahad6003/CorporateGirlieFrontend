'use client';

import Header from "@/components/Header/Header";
import { store } from "@/store/store";
import { Provider } from "react-redux";

export default function Home() {
  return (
    <Provider store={store}>
      <div className="block lg:p-8 sm:p-5 p-4">
        <Header />
      </div>
    </Provider>
  );
}
