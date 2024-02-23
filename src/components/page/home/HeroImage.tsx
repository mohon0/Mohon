"use client";
import HeroImg from "@/images/hero/logo1.png";
import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroImage() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        className="group relative"
      >
        <div className="absolute inset-4 animate-spin rounded-full bg-gradient-to-bl from-primary  via-sky-600 to-green-600  blur-2xl transition-all group-hover:-inset-0"></div>
        <div className="relative mx-auto flex h-[17rem] w-[17rem] items-center justify-center overflow-clip text-clip rounded-full bg-background leading-none md:h-80 md:w-80 lg:h-96 lg:w-96 ">
          <Image
            src={HeroImg}
            alt=""
            className=" mx-auto mt-12 scale-[0.91] object-cover"
          />
        </div>
      </motion.div>
    </>
  );
}
