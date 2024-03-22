"use client";
import Loading from "@/components/common/loading/Loading";
import Registration from "@/components/page/auth/Registration";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RegistrationPage() {
  const { status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "authenticated") {
    router.push("/dashboard");
    return (
      <p>Your are already loged in. please wait while we redirect you..</p>
    );
  }

  return (
    <>
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
        <ToastContainer position="top-center" theme="dark" autoClose={3000} />
      </div>
    </>
  );
}
