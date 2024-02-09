"use client";
import { motion } from "framer-motion";

export default function Intro() {
  return (
    <>
      <motion.h1
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-5xl md:text-5xl lg:text-7xl hero font-extrabold flex"
      >
        MD. MOHON
      </motion.h1>
    </>
  );
}
