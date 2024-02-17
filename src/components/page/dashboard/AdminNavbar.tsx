"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import AdminNavbarMenu from "./AdminNavbarMenu";
import NavigationMenuUi from "./NavigationMenu";

export default function AdminNavbar() {
  const { data: session } = useSession();

  const name = session?.user?.name || "MOHON";
  const fallback = name.slice(0, 2);
  const image = session?.user?.image;

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
    <div>
      <div className="hidden h-16 items-center justify-between border-b px-10 md:flex">
        <NavigationMenuUi />
        <>
          {session && (
            <Avatar className="cursor-pointer">
              {image && <AvatarImage src={image} />}
              <AvatarFallback>{fallback}</AvatarFallback>
            </Avatar>
          )}
        </>
      </div>
      <div className="md:hidden">
        <div
          className={`z-50 flex h-14 w-full justify-between ${
            visible ? " translate-y-0 backdrop-blur-md" : " -translate-y-20"
          } fixed left-0 top-0 items-center   px-2 transition-transform duration-500 ease-in-out lg:px-7`}
        >
          <Link href="/" className="text-2xl font-bold text-primary-200">
            MOHON
          </Link>
          <AdminNavbarMenu />
        </div>
      </div>
    </div>
  );
}
