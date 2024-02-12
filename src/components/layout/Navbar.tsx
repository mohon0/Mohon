"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import ActionButton from "./ActionButton";
import Menu from "./Menu";
import { NavigationMenuDemo } from "./NavigationMenu";

export default function Navbar() {
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
        visible ? " translate-y-0 backdrop-blur-md" : " -translate-y-20"
      } fixed left-0 top-0 items-center   px-2 transition-transform duration-500 ease-in-out lg:px-7`}
    >
      <Link href="/" className="text-2xl font-bold text-primary-200">
        MOHON
      </Link>
      <div className="flex items-center gap-10">
        <div className="hidden items-center gap-6 lg:flex [&>*]:cursor-pointer ">
          <NavigationMenuDemo />
        </div>
        <div className="flex items-center gap-10">
          <div className="hidden md:block">
            <ActionButton />
          </div>
          <div>
            <Menu />
          </div>
        </div>
      </div>
    </header>
  );
}
