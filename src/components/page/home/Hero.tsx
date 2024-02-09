"use client";
import Time from "@/components/common/time/Time";
import { motion } from "framer-motion";
import Link from "next/link";
import { AiFillFacebook } from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa";
import { SiFreelancer, SiUpwork } from "react-icons/si";
import { TbBrandFiverr, TbBrandTwitter } from "react-icons/tb";
import AnimatedTextWord from "../../common/animation/AnimatedText";
import TypeEffect from "../../common/animation/TypeEffect";
import HeroImage from "./HeroImage";
import Intro from "./Intro";

export default function Hero() {
  return (
    <div className=" min-w-screen relative mx-3 mb-20 mt-12 flex flex-col items-center justify-center md:mx-4 lg:mx-28 lg:mt-12">
      <div className="flex flex-col-reverse justify-center gap-8 md:flex-row md:justify-between md:gap-0 ">
        <div className="flex flex-col justify-center gap-6 md:w-1/2">
          <div className="md:hidden">Hello, i am</div>
          <div className="hidden md:block">
            <AnimatedTextWord
              text={"Hello, it's me"}
              size="2"
              weight="normal"
              colour={"#94a3b8"}
            />
          </div>

          <Intro />
          <TypeEffect />
          <AnimatedTextWord
            text={
              "I'm  a certified graphic designer, working with multiple companies, and providing top-quality design services at competitive prices. My expertise covers various graphic design tasks, including brand identity, packaging, photo editing, and more. If you have design projects, don't hesitate to contact me, and we can discuss your needs."
            }
            size={"1"}
            weight={"normal"}
            colour={"#94a3b8"}
          />

          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            className="my-4 flex flex-wrap gap-10 text-slate-300"
          >
            <Link
              href="https://facebook.com/md.freelancermohon"
              target="_blank"
            >
              <AiFillFacebook size="40" />
            </Link>
            <Link href="https://twitter.com/mohongraphics" target="_blank">
              <TbBrandTwitter size="40" />
            </Link>{" "}
            <Link
              href="https://linkedin.com/in/md-mohon-794830291"
              target="_blank"
            >
              <FaLinkedin size="40" />
            </Link>
            <Link href="https://freelancer.com/demo" target="_blank">
              <SiFreelancer size="40" />
            </Link>
            <Link href="https://upwork.com/demo" target="_blank">
              <SiUpwork size="40" />
            </Link>
            <Link href="https://fiverr.com/demo" target="_blank">
              <TbBrandFiverr size="40" />
            </Link>
          </motion.div>
          <Time />
        </div>
        <div className="flex scale-90 items-center justify-center md:w-1/2 md:scale-100 md:justify-end">
          <HeroImage />
        </div>
      </div>
    </div>
  );
}
