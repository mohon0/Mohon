"use client";
import Time from "@/components/page/home/Time";
import { motion } from "framer-motion";
import Link from "next/link";
import { AiFillFacebook } from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa";
import { SiFreelancer, SiUpwork } from "react-icons/si";
import { TbBrandFiverr, TbBrandTwitter } from "react-icons/tb";
import TypeEffect from "../../common/animation/TypeEffect";
import HeroImage from "./HeroImage";
import Intro from "./Intro";

export default function Hero() {
  return (
    <div className=" min-w-screen relative mx-3 mb-20 mt-12 flex flex-col items-center justify-center md:mx-4 lg:mx-28 lg:mt-12">
      <div className="flex flex-col-reverse justify-center gap-8 md:flex-row md:justify-between md:gap-0 ">
        <div className="flex flex-col justify-center gap-6 md:w-1/2">
          <p>Hello its me</p>
          <Intro />
          <TypeEffect />
          <p className="text-muted-foreground">
            I&#39;m a certified graphic designer, working with multiple
            companies, and providing top-quality design services at competitive
            prices. My expertise covers various graphic design tasks, including
            brand identity, packaging, photo editing, and more. If you have
            design projects, don&#39;t hesitate to contact me, and we can
            discuss your needs.
          </p>

          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            className="my-4 flex flex-wrap gap-10 text-xl text-slate-300 md:text-4xl"
          >
            <Link
              href="https://facebook.com/md.freelancermohon"
              target="_blank"
            >
              <AiFillFacebook />
            </Link>
            <Link href="https://twitter.com/mohongraphics" target="_blank">
              <TbBrandTwitter />
            </Link>{" "}
            <Link
              href="https://linkedin.com/in/freelancermohon"
              target="_blank"
            >
              <FaLinkedin />
            </Link>
            <Link href="https://freelancer.com/demo" target="_blank">
              <SiFreelancer />
            </Link>
            <Link href="https://upwork.com/demo" target="_blank">
              <SiUpwork />
            </Link>
            <Link href="https://fiverr.com/demo" target="_blank">
              <TbBrandFiverr />
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
