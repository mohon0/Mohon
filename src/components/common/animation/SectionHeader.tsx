"use client";
import { Variants, motion } from "framer-motion";

export default function SectionHeader({
  text,
  title,
}: {
  text: string;
  title: string;
}) {
  const cardVariants: Variants = {
    offscreen: {
      x: 300,
      opacity: 0,
    },
    onscreen: {
      x: 0,
      opacity: 1,

      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 1.5,
      },
    },
  };
  const lineVariants: Variants = {
    offscreen: {
      x: -300,
      opacity: 0,
    },
    onscreen: {
      x: 0,
      opacity: 1,

      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 1.5,
      },
    },
  };
  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ amount: 0.8, once: true }}
      className="flex flex-col gap-6 items-center justify-center mx-3 text-center"
    >
      <motion.div
        variants={lineVariants}
        className="text-primary-200 font-bold"
      >
        {text}
      </motion.div>
      <div className="flex items-center justify-center flex-col gap-3">
        <motion.div
          variants={cardVariants}
          className="text-3xl md:text-5xl font-bold"
        >
          {title}
        </motion.div>
        <motion.div
          variants={lineVariants}
          className="h-1 w-40 bg-primary-200 "
        ></motion.div>
      </div>
    </motion.div>
  );
}
