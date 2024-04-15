"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import ActionButton from "./ActionButton";
import Menu from "./Menu";
import { NavigationMenuDemo } from "./NavigationMenu";

export default function Navbar() {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const { data: session } = useSession();
  const admin = process.env.NEXT_PUBLIC_ADMIN;

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
      <Link href="/" className="text-2xl font-bold text-primary">
        MOHON
      </Link>
      <div className="flex items-center gap-2">
        <div className="hidden items-center gap-6 lg:flex [&>*]:cursor-pointer ">
          <NavigationMenuDemo />
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <ActionButton />
          </div>
          <div className="hidden md:block">
            {session?.user ? (
              <Link
                href={
                  session.user.email === admin
                    ? "/admin-dashboard"
                    : "/dashboard"
                }
                legacyBehavior
                passHref
              >
                <Button variant="ghost" className="bg-background">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link href="/signin" legacyBehavior passHref>
                <Button variant="ghost" className="bg-background">
                  LogIn
                </Button>
              </Link>
            )}
          </div>
          <div>
            <Menu />
          </div>
        </div>
      </div>
    </header>
  );
}
