"use client";
import { motion, Variants } from "framer-motion";

interface Props {
  data: {
    id: number;
    name: string;
    bg: string;
  };
}

const cardVariants: Variants = {
  offscreen: {
    y: 300,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,

    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 1.2,
    },
  },
};

export default function ServicesCardModel({ data }: Props) {
  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ amount: 0.8, once: true }}
    >
      <motion.div variants={cardVariants}>
        <div className="w-full rounded-lg overflow-hidden relative py-10 px-5 bg-black group">
          <div
            className={`h-32 w-32  z-[1] absolute top-[-75px] right-[-75px] transition-all duration-1000 ease-[ease] rounded-full group-hover:scale-[10]`}
            style={{ background: `${data.bg}` }}
          ></div>

          <div className="relative z-10 font-bold text-2xl md:text-3xl">{data.name}</div>
        </div>
      </motion.div>
    </motion.div>
  );
}
