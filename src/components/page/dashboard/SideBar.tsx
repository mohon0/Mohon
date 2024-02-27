"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BsGridFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FaClipboardList, FaUserEdit, FaUsers } from "react-icons/fa";
import { FaPenToSquare, FaPowerOff } from "react-icons/fa6";

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
          <div className="mx-2 mt-6 flex flex-col gap-5">
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
            <Link href="application-list">
              <Button
                className="flex w-full items-center justify-start gap-4"
                variant={
                  pathname === "/application-list" ? "default" : "outline"
                }
              >
                <FaClipboardList />
                <span>Application</span>
              </Button>
            </Link>
            <Link href="/user">
              <Button
                className="flex w-full items-center justify-start gap-4"
                variant={pathname === "/user" ? "default" : "outline"}
              >
                <FaUsers />
                <span>User</span>
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
            <Button
              variant="destructive"
              className="mx-4 flex items-center gap-4"
              onClick={handleDelete}
            >
              <FaPowerOff />
              <span>Logout</span>
            </Button>
          </div>
          {showConfirmation && (
            <div className="fixed inset-0 z-50  flex h-screen w-screen items-center justify-center bg-black bg-opacity-50  backdrop-blur-sm">
              <div className="w-11/12 rounded-lg bg-blue-950 p-6 shadow-md lg:w-2/6">
                <p className="text-xl">Are you sure you want to Log Out</p>
                <div className="mt-8 flex justify-end">
                  <button
                    onClick={() => setShowConfirmation(false)}
                    className="mr-4 rounded bg-gray-600 px-4 py-2 hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleLogout}
                    className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                  >
                    Log Out
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
