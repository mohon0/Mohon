import Link from "next/link";
import { BiCopyright } from "react-icons/bi";
import { BsInstagram, BsLinkedin } from "react-icons/bs";
import { GrFacebook } from "react-icons/gr";
import { SiFreelancer, SiUpwork } from "react-icons/si";
import { TbBrandFiverr, TbBrandTwitter } from "react-icons/tb";

export default function Footer() {
  const time = new Date();
  const year = time.getFullYear();

  return (
    <div className="flex flex-col gap-10 mt-10 border-t border-gray-600 pt-10">
      <div className="px-3 lg:px-20 text-xl md:text-3xl lg:text-5xl flex-wrap flex items-center justify-around">
        <Link
          href="https://facebook.com/www.md.mohon"
          target="_blank"
          className="text-gray-500 hover:text-blue-600  p-4"
        >
          <GrFacebook />
        </Link>
        <div className="w-6 md:w-10 h-0.5 block bg-gray-600 rotate-[120deg]"></div>
        <Link
          href="https://twitter.com/mohongraphics"
          target="_blank"
          className="text-gray-500 hover:text-sky-600  p-4"
        >
          <TbBrandTwitter />
        </Link>
        <div className="w-6 md:w-10 h-0.5 block bg-gray-600 rotate-[120deg]"></div>
        <Link
          href="https://instagram.com/mohongraphics"
          target="_blank"
          className="text-gray-500 hover:text-pink-600  p-4"
        >
          <BsInstagram />
        </Link>
        <div className="w-6 md:w-10 h-0.5 block bg-gray-600 rotate-[120deg]"></div>
        <Link
          href="https://linkedin.com/in/md-mohon-794830291"
          target="_blank"
          className="text-gray-500 hover:text-sky-600  p-4"
        >
          <BsLinkedin />
        </Link>
        <div className="w-6 md:w-10 h-0.5 block bg-gray-600 rotate-[120deg]"></div>
        <Link
          href="https://freelancer.com/demo"
          target="_blank"
          className="text-gray-500 hover:text-sky-600  p-4"
        >
          <SiFreelancer />
        </Link>
        <div className="w-6 md:w-10 h-0.5 block bg-gray-600 rotate-[120deg]"></div>
        <Link
          href="https://upwork.com/demo"
          target="_blank"
          className="text-gray-500 hover:text-green-600  p-4"
        >
          <SiUpwork />
        </Link>
        <div className="w-6 md:w-10 h-0.5 block bg-gray-600 rotate-[120deg]"></div>
        <Link
          href="https://fiverr.com/demo"
          target="_blank"
          className="text-gray-500 hover:text-green-600  p-4"
        >
          <TbBrandFiverr />
        </Link>
      </div>
      <div className="flex justify-center md:justify-between bg-black py-3 px-3 lg:px-20">
        <div className="hidden md:flex items-center gap-10">
          <Link href="/blog" className="hover:text-primary-200">
            Blog
          </Link>
          <Link href="/project" className="hover:text-primary-200">
            Projects
          </Link>
        </div>
        <div className="flex items-center gap-2 justify-center">
          <BiCopyright />
          {year}
        </div>
        <div className="hidden md:flex items-center justify-center gap-10">
          <Link href="/blog" className="hover:text-primary-200">
            About Me
          </Link>
          <Link href="/project" className="hover:text-primary-200">
            Contact Me
          </Link>
        </div>
      </div>
    </div>
  );
}
