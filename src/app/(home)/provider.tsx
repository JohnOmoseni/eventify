"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Header from "./_sections/Header";
import Menu from "@/components/Menu";
import Footer from "./_sections/Footer";

import store from "@/redux/store";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const persistor = persistStore(store);
const queryClient = new QueryClient();

export default function ProviderWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Header setOpenMenu={setOpenMenu} />
          <AnimatePresence>
            {openMenu && <Menu setOpenMenu={setOpenMenu} />}
          </AnimatePresence>
          {children}
          <Footer />
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}
