"use client";
import Loading from "@/components/common/loading/Loading";
import Login from "@/components/page/auth/Login";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
  const { status } = useSession();

  return (
    <>
      {status === "loading" ? (
        <Loading />
      ) : status === "authenticated" ? (
        <div>
          You are already logged in. Go to{" "}
          <Link href={"/dashboard"} className="font-bold">
            Dashboard
          </Link>
        </div>
      ) : (
        <div className=" flex items-center justify-center ">
          <div className="grid w-11/12 grid-cols-1 justify-around rounded-2xl shadow-2xl md:w-10/12 md:grid-cols-5">
            <div className="col-span-3 bg-blue-950 p-6 md:rounded-l-2xl">
              <Login />
            </div>
            <div className="col-span-2 hidden flex-col items-center  justify-center gap-4 bg-gray-800 p-16 text-center md:flex md:rounded-r-2xl">
              <span className="text-lightgray-100 text-3xl font-bold">
                Hi, There!
              </span>
              <span className="bg-lightgray-100 flex h-1 w-20 rounded-full"></span>
              <span className="text-darkgray-100 my-4">
                New Here? Let&#39;s create a free account to start your journey
                with us.
              </span>
              <Link href="/signup">
                <button className="rounded-lg border border-primary-200 bg-black px-4 py-2 text-primary-200 hover:bg-gray-950">
                  Registration
                </button>
              </Link>
            </div>
          </div>
          <ToastContainer position="top-center" autoClose={3000} />
        </div>
      )}
    </>
  );
}
