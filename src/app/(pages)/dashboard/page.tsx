"use client";
import ApplicationModel from "@/components/application/ApplicationModel";
import Loading from "@/components/common/loading/Loading";
import { FetchActionDashboardData } from "@/components/fetch/get/dashboard/FetchDashboardData";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { FaPowerOff, FaUserEdit } from "react-icons/fa";

export default function Dashboard() {
  const { status, data: session } = useSession();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { isLoading, data, isError } = FetchActionDashboardData();

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return "Error loading Dashboard";
  }
  const handleDelete = async () => {
    setShowConfirmation(true);
  };

  const handleLogout = () => {
    signOut({ redirect: true, callbackUrl: "/" });
  };

  const admin = process.env.NEXT_PUBLIC_ADMIN;

  return (
    <div className="flex flex-col md:gap-10">
      {!isLoading && status === "authenticated" ? (
        <>
          <div className="flex flex-col gap-10">
            <div className="grid w-full grid-cols-1 gap-10 bg-gray-900 p-6  md:grid-cols-2  lg:grid-cols-3">
              <div className="col-span-3 flex h-full w-full items-center justify-center border md:col-span-1">
                {data.user.image ? (
                  <Image
                    src={data.user.image}
                    alt=""
                    height={500}
                    width={500}
                    className=" h-60 object-cover"
                  />
                ) : (
                  "No image found"
                )}
              </div>
              <div className="col-span-3 mx-auto flex w-full flex-col items-center justify-center gap-6 px-4 text-center md:col-span-1 md:px-0">
                <div className="mx-auto text-4xl font-bold uppercase">
                  {data.user.name}
                </div>
                <div className="text-xl">{data.user.email}</div>
              </div>
              <div className="col-span-3 flex flex-col items-center justify-center gap-2 md:flex-row md:gap-6  lg:col-span-1 lg:flex-col">
                {admin === data.user.email ? (
                  <div className="flex items-center justify-center">
                    <Link href={"/newpost"}>
                      <button className="flex items-center justify-center gap-4 rounded-lg border bg-cyan-500 px-8 py-2 font-bold  shadow-lg hover:bg-cyan-600">
                        New Post
                        <BiSolidEdit size={20} />
                      </button>
                    </Link>
                  </div>
                ) : (
                  ""
                )}
                {data.user.id && (
                  <div>
                    <Link href={`/editprofile`}>
                      <button className="flex items-center justify-center gap-4 rounded-lg border bg-blue-950 px-6 py-2 font-bold text-white hover:bg-gray-800">
                        Edit Profile
                        <FaUserEdit size={20} />
                      </button>
                    </Link>
                  </div>
                )}

                <div className="flex items-center justify-center">
                  <button
                    onClick={handleDelete}
                    className="flex items-center justify-center gap-4 rounded-lg bg-red-600 px-10 py-2 font-bold text-white hover:bg-red-500"
                  >
                    Log Out
                    <FaPowerOff size={14} />
                  </button>
                </div>

                {showConfirmation && (
                  <div className="fixed inset-0 z-50  flex h-screen w-screen items-center justify-center bg-black bg-opacity-50  backdrop-blur-sm">
                    <div className="w-11/12 rounded-lg bg-blue-950 p-6 shadow-md lg:w-2/6">
                      <p className="text-xl">
                        Are you sure you want to Log Out
                      </p>
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
              </div>
            </div>
          </div>

          <ApplicationModel />
        </>
      ) : status !== "authenticated" ? (
        <div className="flex flex-col gap-10 text-center text-2xl font-bold">
          <p>You are not logged in. Log in to access this page.</p>
          <Link href="/signin" className="rounded border bg-blue-950 px-8 py-2">
            Log in
          </Link>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
