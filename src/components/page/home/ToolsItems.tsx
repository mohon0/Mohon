"use client";
import Adobeae from "@/images/tools/adobe-after-effects.svg";
import Adobeai from "@/images/tools/adobe-illustrator.svg";
import Adobelr from "@/images/tools/adobe-lightroom.svg";
import Adobeps from "@/images/tools/adobe-photoshop.svg";
import Adobexd from "@/images/tools/adobe.svg";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function ToolsItems() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 80, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };
  return (
    <motion.div
      ref={ref}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ amount: 0.8 }}
      className="flex items-center mx-3 md:mx-20 justify-center flex-col gap-20"
    >
      <motion.div
        variants={container}
        initial={isInView ? "hidden" : "visible"}
        ref={ref}
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="flex transition-all duration-1000 hover:[&>*]:scale-110 flex-wrap items-baseline justify-center gap-6 md:gap-20">
          <motion.div
            variants={item}
            className="flex font-bold items-center justify-center flex-col gap-3"
          >
            <Image src={Adobeai} alt="" className="h-16 w-16 md:w-32 md:h-32" />
            Illustrator
          </motion.div>
          <motion.div
            variants={item}
            className="flex font-bold items-center justify-center flex-col gap-3"
          >
            <Image src={Adobeae} alt="" className="h-16 w-16 md:w-32 md:h-32" />
            AfterEffects
          </motion.div>
          <motion.div
            variants={item}
            className="flex font-bold items-center justify-center flex-col gap-3"
          >
            <Image src={Adobexd} alt="" className="h-16 w-16 md:w-32 md:h-32" />
            AdobeXd
          </motion.div>
          <motion.div
            variants={item}
            className="flex font-bold items-center justify-center flex-col gap-3"
          >
            <Image src={Adobelr} alt="" className="h-16 w-16 md:w-32 md:h-32" />
            LightRoom
          </motion.div>
          <motion.div
            variants={item}
            className="flex font-bold items-center justify-center flex-col gap-3"
          >
            <Image src={Adobeps} alt="" className="h-16 w-16 md:w-32 md:h-32" />
            PhotoShop
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
