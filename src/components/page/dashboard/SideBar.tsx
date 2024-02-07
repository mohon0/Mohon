"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsGridFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FaPowerOff } from "react-icons/fa6";

export default function SideBar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const name = session?.user?.name || "MOHON";
  const fallback = name.slice(0, 2);
  const image = session?.user?.image;

  return (
    <div className="col-span-2 flex min-h-screen flex-col justify-between overflow-clip bg-gradient-to-tr from-gray-800 via-black to-slate-800">
      <div>
        <Link href="/">
          <p className="my-3 text-center text-2xl font-bold text-primary-200">
            MOHON
          </p>
        </Link>
        <div className="mx-4 mt-6">
          <p className="text-xs">Main Menu</p>
          <div className="mx-2 mt-6 flex flex-col gap-5">
            <Button
              className="relative flex items-center justify-start gap-4"
              variant={
                pathname === "/admin-dashboard" ? "default" : "secondary"
              }
            >
              <BsGridFill /> <span>Dashboard</span>
              <div
                className={
                  pathname === "/admin-dashboard"
                    ? " absolute -right-9 h-6 w-6 rotate-45 bg-white"
                    : "hidden"
                }
              ></div>
            </Button>
            <Button
              className="flex items-center justify-start gap-4"
              variant="outline"
            >
              <CgProfile />
              <span>Profile</span>
            </Button>
            <Button
              className="flex items-center justify-start gap-4"
              variant="outline"
            >
              <CgProfile />
              <span>New Post</span>
            </Button>
            <Button
              className="flex items-center justify-start gap-4"
              variant="outline"
            >
              <CgProfile />
              <span>Edit Profile</span>
            </Button>
            <Button
              className="flex items-center justify-start gap-4"
              variant="outline"
            >
              <CgProfile />
              <span>Application</span>
            </Button>
            <Button
              className="flex items-center justify-start gap-4"
              variant="outline"
            >
              <CgProfile />
              <span>User</span>
            </Button>
          </div>
        </div>
      </div>
      {session && (
        <div className="mx-2 my-10 flex flex-col gap-2">
          <div className="flex items-center justify-center gap-2">
            <Avatar className="cursor-pointer">
              {image && <AvatarImage src={image} />}
              <AvatarFallback>{fallback}</AvatarFallback>
            </Avatar>
            <div>{name}</div>
          </div>
          <Button
            variant="destructive"
            className="mx-4 flex items-center gap-4"
          >
            <FaPowerOff />
            <span>Logout</span>
          </Button>
        </div>
      )}
    </div>
  );
}
