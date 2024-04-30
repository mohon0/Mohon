"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BiDonateBlood } from "react-icons/bi";
import { BsGridFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FaClipboardList, FaUserEdit, FaUsers } from "react-icons/fa";
import { FaPenToSquare, FaPowerOff } from "react-icons/fa6";
import { IoLocation } from "react-icons/io5";

export default function SideBar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const name = session?.user?.name || "MOHON";
  const fallback = name.slice(0, 2);
  const image = session?.user?.image;

  const handleDelete = async () => {
    setShowConfirmation(true);
  };

  const handleLogout = () => {
    signOut({ redirect: true, callbackUrl: "/" });
  };

  return (
    <div className="fixed hidden h-screen w-52 flex-col justify-between overflow-clip bg-gradient-to-tl from-primary via-black to-slate-900 md:flex">
      <div>
        <Link href="/">
          <p className="my-3 text-center text-2xl font-bold text-primary">
            MOHON
          </p>
        </Link>
        <div className="mx-4 mt-6">
          <div className="mx-2 mt-6 flex flex-col gap-4">
            <Link href="/admin-dashboard">
              <Button
                className="flex w-full items-center justify-start gap-4"
                variant={
                  pathname === "/admin-dashboard" ? "default" : "outline"
                }
              >
                <BsGridFill /> <span>Dashboard</span>
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button
                className="flex w-full items-center justify-start gap-4"
                variant={pathname === "/dashboard" ? "default" : "outline"}
              >
                <CgProfile />
                <span>Profile</span>
              </Button>
            </Link>
            <Link href="/newpost">
              <Button
                className="flex w-full items-center justify-start gap-4"
                variant={pathname === "/newpost" ? "default" : "outline"}
              >
                <FaPenToSquare />
                <span>New Post</span>
              </Button>
            </Link>
            <Link href="/editprofile">
              <Button
                className="flex w-full items-center justify-start gap-4"
                variant={pathname === "/editprofile" ? "default" : "outline"}
              >
                <FaUserEdit />
                <span>Edit Profile</span>
              </Button>
            </Link>
            <Link href="/application-list/page/1">
              <Button
                className="flex w-full items-center justify-start gap-4"
                variant={
                  /^\/application-list\/page\/\d+$/.test(pathname)
                    ? "default"
                    : "outline"
                }
              >
                <FaClipboardList />
                <span>Application</span>
              </Button>
            </Link>
            <Link href="/user/page/1">
              <Button
                className="flex w-full items-center justify-start gap-4"
                variant={
                  /^\/user\/page\/\d+$/.test(pathname) ? "default" : "outline"
                }
              >
                <FaUsers />
                <span>User</span>
              </Button>
            </Link>
            <Link href="/address/page/1">
              <Button
                className="flex w-full items-center justify-start gap-4"
                variant={
                  /^\/address\/page\/\d+$/.test(pathname)
                    ? "default"
                    : "outline"
                }
              >
                <IoLocation />
                <span>Address</span>
              </Button>
            </Link>
            <Link href="/blood-bank/page/1">
              <Button
                className="flex w-full items-center justify-start gap-4"
                variant={
                  /^\/blood-bank\/page\/\d+$/.test(pathname)
                    ? "default"
                    : "outline"
                }
              >
                <BiDonateBlood />
                <span>Blood Bank</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
      {session && (
        <>
          <div className="mx-2 my-10 flex flex-col gap-2">
            <div className="flex items-center justify-center gap-2">
              <Avatar className="cursor-pointer">
                {image && <AvatarImage src={image} />}
                <AvatarFallback>{fallback}</AvatarFallback>
              </Avatar>
              <div>{name}</div>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <span className="flex items-center gap-4">
                    Log Out <FaPowerOff />
                  </span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    You will be log out from this browser immediately.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleLogout}>
                    Log Out
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </>
      )}
    </div>
  );
}
