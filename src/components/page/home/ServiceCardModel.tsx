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
        <div className="group relative w-full overflow-hidden rounded-lg bg-secondary px-5 py-10">
          <div
            className={`ease-[ease] absolute  right-[-75px] top-[-75px] z-[1] h-32 w-32 rounded-full transition-all duration-1000 group-hover:scale-[10]`}
            style={{ background: `${data.bg}` }}
          ></div>

          <div className="relative z-10 text-2xl font-bold md:text-3xl">
            {data.name}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
