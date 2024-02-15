"use client";
import Loading from "@/components/common/loading/Loading";
import Registration from "@/components/page/auth/Registration";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RegistrationPage() {
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
        <div className="flex items-center justify-center md:mt-12 lg:mt-28 ">
          <Card className="grid w-11/12 grid-cols-1 justify-around rounded-2xl shadow-2xl md:max-w-4xl md:grid-cols-5">
            <Registration />
            <div className="col-span-2 hidden flex-col items-center justify-center gap-4 bg-gray-900 md:flex">
              <span className="text-lightgray-100 text-3xl font-bold">
                Hi, There!
              </span>
              <span className="bg-lightgray-100 flex h-1 w-20 rounded-full"></span>
              <span className="text-darkgray-100 my-4">
                Already have an account?
              </span>
              <Link href="/signin">
                <Button>Login</Button>
              </Link>
            </div>
          </Card>
          <ToastContainer position="top-center" autoClose={3000} />
        </div>
      )}
    </>
  );
}
