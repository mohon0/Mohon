"use client";
import Loading from "@/components/common/loading/Loading";
import Login from "@/components/page/auth/Login";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
  const { status } = useSession();

  return (
    <>
      {status === "loading" ? (
        <Loading />
      ) : status === "authenticated" ? (
        <div className="flex h-60 flex-col items-center justify-center gap-8">
          <p>You are already logged in</p>
          <Link href="/">
            <Button className="flex items-center gap-2" size="lg">
              <FaHome />
              <span>Back to Home</span>
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex items-center justify-center md:mt-12 lg:mt-28 ">
          <Card className="grid w-11/12 grid-cols-1 justify-around rounded-2xl shadow-2xl md:max-w-4xl md:grid-cols-5">
            <Login />
            <div className="col-span-2 hidden flex-col items-center justify-center gap-4 bg-gray-900 p-4 md:flex">
              <span className="text-lightgray-100 text-3xl font-bold">
                Hi, There!
              </span>
              <span className="bg-lightgray-100 flex h-1 w-20 rounded-full"></span>
              <span className="text-darkgray-100 my-4">
                New Here? Let&#39;s create a free account to start your journey
                with us.
              </span>
              <Link href="/signup">
                <Button>Registration</Button>
              </Link>
            </div>
          </Card>
          <ToastContainer position="top-center" theme="dark" autoClose={3000} />
        </div>
      )}
    </>
  );
}
