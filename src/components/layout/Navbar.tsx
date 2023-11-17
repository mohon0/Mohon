"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Btn from "../common/button/Btn";
import Menu from "./Menu";

export default function Navbar() {
  const { data: session } = useSession();
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isVisible =
        currentScrollPos < 200 || prevScrollPos > currentScrollPos;

      setPrevScrollPos(currentScrollPos);
      setVisible(isVisible);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <header
      className={`z-50 flex h-14 w-full justify-between ${
        visible ? " backdrop-blur-md translate-y-0" : " -translate-y-20"
      } transition-transform duration-500 ease-in-out items-center   lg:px-7 px-2 fixed top-0 left-0`}
    >
      <Link href="/" className="text-primary-200 font-bold text-2xl">
        MOHON
      </Link>
      <div className="flex gap-10 items-center">
        <div className="hidden lg:flex gap-10 items-center font-semibold hover:[&>*]:text-primary-200 [&>*]:cursor-pointer ">
          <Link href="/">Home</Link>
          <Link href="/blog">Blog & Design</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/course">Our Course</Link>
          <Link href="/about">About Me</Link>

          {session?.user ? (
            <Link href="/dashboard">Dashboard</Link>
          ) : (
            <Link href="/signin">LogIn</Link>
          )}
        </div>
        <div className="flex items-center gap-10">
          <div className="hidden md:block">
            <Btn />
          </div>
          <div>
            <Menu />
          </div>
        </div>
      </div>
    </header>
  );
}
