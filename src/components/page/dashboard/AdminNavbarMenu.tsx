"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiDonateBlood } from "react-icons/bi";
import { BsGridFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FaClipboardList, FaUserEdit, FaUsers } from "react-icons/fa";
import { FaPenToSquare, FaPowerOff } from "react-icons/fa6";
import { GiMoneyStack } from "react-icons/gi";
import { IoLocation } from "react-icons/io5";

export default function AdminNavbarMenu() {
  const [NavOpen, setNavOpen] = useState(false);
  const { data: session } = useSession();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const pathname = usePathname();

  const HandleClick = () => {
    setNavOpen((prev) => !prev);
  };

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
    <div className="relative lg:hidden">
      <div
        className={`z-40 flex flex-col gap-1 p-3 duration-300 ${
          NavOpen ? "rotate-[360deg]" : ""
        }`}
        onClick={HandleClick}
      >
        <span
          className={`h-0.5 w-6 bg-primary  duration-300 ${
            NavOpen ? " translate-y-1.5 rotate-45 " : ""
          } `}
        ></span>
        <span
          className={`h-0.5 w-6 bg-primary  duration-300  ${
            NavOpen ? "hidden" : ""
          } `}
        ></span>
        <span
          className={`h-0.5 w-6 bg-primary  duration-300 ${
            NavOpen ? "-rotate-45 duration-300 ease-in-out" : ""
          } `}
        ></span>
      </div>
      <div
        className={`fixed right-0 top-0 z-50 flex h-screen w-full transform justify-end  bg-slate-200 bg-opacity-5 backdrop-blur-sm transition duration-300 ease-out  ${
          NavOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="z-50 flex w-9/12 flex-col gap-4 bg-[#000119]">
          <div className="text-primary-200 flex items-center justify-between px-8 py-5 ">
            <Link href={"/"} className="text-xl font-bold">
              MOHON
            </Link>
            <AiOutlineClose size={24} onClick={HandleClick} />
          </div>
          <hr />
          <div className="my-4 flex flex-col gap-4 px-8 [&>*]:hover:font-semibold [&>*]:hover:underline">
            <Link href="/admin-dashboard" onClick={HandleClick}>
              <Button
                className="flex w-full items-center justify-start gap-4"
                variant={
                  pathname === "/admin-dashboard" ? "default" : "outline"
                }
              >
                <BsGridFill /> <span>Dashboard</span>
              </Button>
            </Link>
            <Link href="/dashboard" onClick={HandleClick}>
              <Button
                className="flex w-full items-center justify-start gap-4"
                variant={pathname === "/dashboard" ? "default" : "outline"}
              >
                <CgProfile />
                <span>Profile</span>
              </Button>
            </Link>
            <Link href="/newpost" onClick={HandleClick}>
              <Button
                className="flex w-full items-center justify-start gap-4"
                variant={pathname === "/newpost" ? "default" : "outline"}
              >
                <FaPenToSquare />
                <span>New Post</span>
              </Button>
            </Link>
            <Link href="/editprofile" onClick={HandleClick}>
              <Button
                className="flex w-full items-center justify-start gap-4"
                variant={pathname === "/editprofile" ? "default" : "outline"}
              >
                <FaUserEdit />
                <span>Edit Profile</span>
              </Button>
            </Link>
            <Link href="/application-list/page/1" onClick={HandleClick}>
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
            <Link href="/user/page/1" onClick={HandleClick}>
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
            <Link href="/application-list/payment-report/66437d0303f83ef132f17be9">
              <Button
                className="flex w-full items-center justify-start gap-4"
                variant={
                  pathname ===
                  "/application-list/payment-report/66437d0303f83ef132f17be9"
                    ? "default"
                    : "outline"
                }
              >
                <GiMoneyStack />
                <span>Office Cost</span>
              </Button>
            </Link>
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
      </div>
    </div>
  );
}
