"use client";
import HeroImg from "@/images/hero/Hero.png";
import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroImage() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        className="relative group"
      >
        <div className="absolute inset-4 bg-gradient-to-bl from-primary-400 via-primary-200 to-primary-300  rounded-full blur-2xl  group-hover:-inset-0 transition-all duration-1000 group-hover:duration-200 animate-spin"></div>
        <div className="flex relative items-center justify-center text-clip rounded-full h-[17rem] w-[17rem] mx-auto md:h-80 lg:h-96 md:w-80 lg:w-96 overflow-clip leading-none ">
          <Image
            src={HeroImg}
            alt=""
            className=" scale-[0.83] mx-auto object-cover"
          />
        </div>
      </motion.div>
    </>
  );
}
