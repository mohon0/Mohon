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
      <div className="flex w-full flex-col items-center justify-center gap-8">
        <div className="flex w-full flex-col gap-2">
          <div>Graphic Design</div>
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ amount: 0.8, once: false }}
            className="h-2 w-full overflow-hidden rounded-full bg-secondary"
          >
            <motion.div
              variants={lineVariants}
              className="h-2 w-[90%]  rounded-full bg-primary"
              title="90%"
            ></motion.div>
          </motion.div>
        </div>
        <div className="flex w-full flex-col gap-2">
          <div>Web Design</div>
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ amount: 0.8, once: false }}
            className="h-2 w-full overflow-hidden rounded-full bg-secondary"
          >
            <motion.div
              variants={lineVariants}
              className="h-2 w-[85%] rounded-full bg-primary"
              title="85%"
            ></motion.div>
          </motion.div>
        </div>
        <div className="flex w-full flex-col gap-2">
          <div>Adobe Muse</div>
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ amount: 0.8, once: false }}
            className="h-2 w-full overflow-hidden rounded-full bg-secondary"
          >
            <motion.div
              variants={lineVariants}
              className="h-2 w-[92%] rounded-full bg-primary"
              title="92%"
            ></motion.div>
          </motion.div>
        </div>
        <div className="flex w-full flex-col gap-2">
          <div>Illustrator</div>
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ amount: 0.8, once: false }}
            className="h-2 w-full overflow-hidden rounded-full bg-secondary"
          >
            <motion.div
              variants={lineVariants}
              className="h-2 w-[98%] rounded-full bg-primary"
              title="98%"
            ></motion.div>
          </motion.div>
        </div>
        <div className="flex w-full flex-col gap-2">
          <div>Photoshop</div>
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ amount: 0.8, once: false }}
            className="h-2 w-full overflow-hidden rounded-full bg-secondary"
          >
            <motion.div
              variants={lineVariants}
              className="h-2 w-[92%] rounded-full bg-primary"
              title="92%"
            ></motion.div>
          </motion.div>
        </div>
        <div className="flex w-full flex-col gap-2">
          <div>Video Editing</div>
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ amount: 0.8, once: false }}
            className="h-2 w-full overflow-hidden rounded-full bg-secondary"
          >
            <motion.div
              variants={lineVariants}
              className="h-2 w-[85%] rounded-full bg-primary"
              title="85%"
            ></motion.div>
          </motion.div>
        </div>
        <div className="flex w-full flex-col gap-2">
          <div>Communication</div>
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ amount: 0.8, once: false }}
            className="h-2 w-full overflow-hidden rounded-full bg-secondary"
          >
            <motion.div
              variants={lineVariants}
              className="h-2 w-[95%] rounded-full bg-primary"
              title="95%"
            ></motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
