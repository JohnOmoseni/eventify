"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Header from "./_sections/Header";
import Menu from "@/components/Menu";
import Footer from "./_sections/Footer";

export default function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      <Header setOpenMenu={setOpenMenu} />
      <AnimatePresence>
        {openMenu && <Menu setOpenMenu={setOpenMenu} />}
      </AnimatePresence>
      {children}
      <Footer />
    </>
  );
}
