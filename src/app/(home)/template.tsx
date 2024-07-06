"use client";

import { animateFn, pageVariant } from "@/lib/animate";
import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div className="min-h-[70vh]" {...animateFn(pageVariant)}>
      {children}
    </motion.div>
  );
}
