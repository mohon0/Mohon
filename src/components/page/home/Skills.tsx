"use client";
import { Variants, motion } from "framer-motion";

export default function Skills() {
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
        type: "linear",
        bounce: 0.4,
        duration: 1.5,
      },
    },
  };

  return (
    <div>
      <div className="flex items-center w-full justify-center flex-col gap-8">
        <div className="flex flex-col gap-2 w-full">
          <div>Graphic Design</div>
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ amount: 0.8, once: false }}
            className="h-2 w-full bg-slate-800 rounded-full overflow-hidden"
          >
            <motion.div
              variants={lineVariants}
              className="h-2 w-[90%]  bg-primary-200 rounded-full"
              title="90%"
            ></motion.div>
          </motion.div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <div>Web Design</div>
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ amount: 0.8, once: false }}
            className="h-2 w-full bg-slate-800 rounded-full overflow-hidden"
          >
            <motion.div
              variants={lineVariants}
              className="h-2 w-[85%] bg-primary-200 rounded-full"
              title="85%"
            ></motion.div>
          </motion.div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <div>Adobe Muse</div>
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ amount: 0.8, once: false }}
            className="h-2 w-full bg-slate-800 rounded-full overflow-hidden"
          >
            <motion.div
              variants={lineVariants}
              className="h-2 w-[92%] bg-primary-200 rounded-full"
              title="92%"
            ></motion.div>
          </motion.div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <div>Illustrator</div>
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ amount: 0.8, once: false }}
            className="h-2 w-full bg-slate-800 rounded-full overflow-hidden"
          >
            <motion.div
              variants={lineVariants}
              className="h-2 w-[98%] bg-primary-200 rounded-full"
              title="98%"
            ></motion.div>
          </motion.div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <div>Photoshop</div>
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ amount: 0.8, once: false }}
            className="h-2 w-full bg-slate-800 rounded-full overflow-hidden"
          >
            <motion.div
              variants={lineVariants}
              className="h-2 w-[92%] bg-primary-200 rounded-full"
              title="92%"
            ></motion.div>
          </motion.div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <div>Video Editing</div>
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ amount: 0.8, once: false }}
            className="h-2 w-full bg-slate-800 rounded-full overflow-hidden"
          >
            <motion.div
              variants={lineVariants}
              className="h-2 w-[85%] bg-primary-200 rounded-full"
              title="85%"
            ></motion.div>
          </motion.div>
        </div>
        <div className="flex flex-col w-full gap-2">
          <div>Communication</div>
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ amount: 0.8, once: false }}
            className="h-2 w-full bg-slate-800 rounded-full overflow-hidden"
          >
            <motion.div
              variants={lineVariants}
              className="h-2 w-[95%] bg-primary-200 rounded-full"
              title="95%"
            ></motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
