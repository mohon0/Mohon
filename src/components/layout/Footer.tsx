import Link from "next/link";
import { BiCopyright } from "react-icons/bi";
import { BsInstagram, BsLinkedin } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa6";
import { SiFreelancer, SiUpwork } from "react-icons/si";
import { TbBrandFiverr, TbBrandTwitter } from "react-icons/tb";

export default function Footer() {
  const time = new Date();
  const year = time.getFullYear();

  return (
    <div className="mt-10 flex flex-col gap-10 border-t pt-10">
      <div className="flex flex-wrap items-center justify-around px-3 text-xl md:text-3xl lg:px-20 lg:text-5xl">
        <Link
          href="https://facebook.com/md.freelancermohon"
          target="_blank"
          className="p-4 text-muted  hover:text-blue-600"
        >
          <FaFacebookF />
        </Link>
        <div className="block h-0.5 w-6 rotate-[120deg] bg-gray-600 md:w-10"></div>
        <Link
          href="https://twitter.com/mohongraphics"
          target="_blank"
          className="p-4 text-muted  hover:text-sky-600"
        >
          <TbBrandTwitter />
        </Link>
        <div className="block h-0.5 w-6 rotate-[120deg] bg-gray-600 md:w-10"></div>
        <Link
          href="https://instagram.com/mohongraphics"
          target="_blank"
          className="p-4 text-muted  hover:text-pink-600"
        >
          <BsInstagram />
        </Link>
        <div className="block h-0.5 w-6 rotate-[120deg] bg-gray-600 md:w-10"></div>
        <Link
          href="https://linkedin.com/in/md-mohon-794830291"
          target="_blank"
          className="p-4 text-muted  hover:text-sky-600"
        >
          <BsLinkedin />
        </Link>
        <div className="block h-0.5 w-6 rotate-[120deg] bg-gray-600 md:w-10"></div>
        <Link
          href="https://freelancer.com/demo"
          target="_blank"
          className="p-4 text-muted  hover:text-sky-600"
        >
          <SiFreelancer />
        </Link>
        <div className="block h-0.5 w-6 rotate-[120deg] bg-gray-600 md:w-10"></div>
        <Link
          href="https://upwork.com/demo"
          target="_blank"
          className="p-4 text-muted  hover:text-green-600"
        >
          <SiUpwork />
        </Link>
        <div className="block h-0.5 w-6 rotate-[120deg] bg-gray-600 md:w-10"></div>
        <Link
          href="https://fiverr.com/demo"
          target="_blank"
          className="p-4 text-muted  hover:text-green-600"
        >
          <TbBrandFiverr />
        </Link>
      </div>
      <div className="flex justify-center  bg-secondary px-3 py-3 lg:px-20">
        <div className="flex items-center justify-center gap-2">
          <BiCopyright />
          {year} all rights reserved
        </div>
      </div>
    </div>
  );
}
