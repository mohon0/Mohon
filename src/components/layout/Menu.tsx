"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Btn from "../common/button/Btn";

export default function Menu() {
  const [NavOpen, setNavOpen] = useState(false);
  const { data: session } = useSession();

  const HandleClick = () => {
    setNavOpen((prev) => !prev);
  };

  return (
    <div className="lg:hidden relative">
      <div
        className={`z-40 flex flex-col gap-1 p-3 duration-300 ${
          NavOpen ? "rotate-[360deg]" : ""
        }`}
        onClick={HandleClick}
      >
        <span
          className={`h-0.5 w-6 bg-primary-200  duration-300 ${
            NavOpen ? " translate-y-1.5 rotate-45 " : ""
          } `}
        ></span>
        <span
          className={`h-0.5 w-6 bg-primary-200  duration-300  ${
            NavOpen ? "hidden" : ""
          } `}
        ></span>
        <span
          className={`h-0.5 w-6 bg-primary-200  duration-300 ${
            NavOpen ? "-rotate-45 duration-300 ease-in-out" : ""
          } `}
        ></span>
      </div>
      <div
        className={`fixed top-0 right-0 z-50 flex h-screen w-full transform justify-end  bg-slate-200 bg-opacity-5 backdrop-blur-sm transition duration-300 ease-out  ${
          NavOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex w-9/12 flex-col gap-4 bg-[#000119] z-50">
          <div className="flex items-center justify-between px-8 py-5 text-primary-200 ">
            <Link href={"/"} className="font-bold text-xl">
              MOHON
            </Link>
            <AiOutlineClose size={24} onClick={HandleClick} />
          </div>
          <hr />
          <div className="my-4 flex flex-col gap-4 px-8 [&>*]:hover:underline [&>*]:hover:font-semibold">
            <Link href="/" onClick={HandleClick}>
              Home
            </Link>
            <Link href="/blog" onClick={HandleClick}>
              Blog & Design
            </Link>
            <Link href="/projects" onClick={HandleClick}>
              Projects
            </Link>
            <Link href="/course" onClick={HandleClick}>
              Our Course
            </Link>
            <Link href="/about" onClick={HandleClick}>
              About Me
            </Link>

            {session?.user ? (
              <Link href="/dashboard" onClick={HandleClick}>
                Dashboard
              </Link>
            ) : (
              <Link href="/signin" onClick={HandleClick}>
                LogIn
              </Link>
            )}
          </div>

          <hr />
          <Btn />
        </div>
      </div>
    </div>
  );
}
