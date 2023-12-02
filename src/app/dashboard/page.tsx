"use client";
import ApplicationModel from "@/components/application/ApplicationModel";
import Loading from "@/components/common/loading/Loading";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { FaPowerOff, FaUserEdit } from "react-icons/fa";

type DashboardDataProps = {
  user: any;
  id: string;
};

export default function Dashboard() {
  const { status, data: session } = useSession();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [dashboardData, setDashboardData] = useState<DashboardDataProps>({
    user: {
      id: "",
      posts: [],
    },
    id: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (status !== "authenticated") {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    fetch(`/api/dashboard`)
      .then((response) => response.json())
      .then((data: DashboardDataProps) => {
        setDashboardData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
        setIsLoading(false);
      });
  }, [status]);

  const handleDelete = async () => {
    setShowConfirmation(true);
  };

  const handleLogout = () => {
    signOut({ redirect: true, callbackUrl: "/" });
  };

  const name = dashboardData.user.name;
  const email = dashboardData?.user?.email;
  const id = dashboardData.user.id;
  const image = dashboardData?.user?.image;
  const admin = process.env.NEXT_PUBLIC_ADMIN;

  return (
    <div className="flex flex-col md:gap-10">
      {!isLoading && status === "authenticated" ? (
        <>
          <div className="flex flex-col gap-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-6  w-full  bg-gray-900">
              <div className="flex items-center border justify-center col-span-3 md:col-span-1 h-full w-full">
                {image ? (
                  <Image
                    src={image}
                    alt=""
                    height={500}
                    width={500}
                    className=" object-cover h-60"
                  />
                ) : (
                  "No image found"
                )}
              </div>
              <div className="flex flex-col items-center text-center mx-auto w-full col-span-3 md:col-span-1 justify-center gap-6 px-4 md:px-0">
                <div className="text-4xl font-bold uppercase mx-auto">
                  {name}
                </div>
                <div className="text-xl">{email}</div>
              </div>
              <div className="flex items-center gap-2 justify-center lg:flex-col md:flex-row flex-col md:gap-6  col-span-3 lg:col-span-1">
                {admin === email ? (
                  <div className="flex items-center justify-center">
                    <Link href={"/newpost"}>
                      <button className="font-bold flex gap-4 items-center justify-center px-8 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-600  shadow-lg border">
                        New Post
                        <BiSolidEdit size={20} />
                      </button>
                    </Link>
                  </div>
                ) : (
                  ""
                )}
                {id && (
                  <div>
                    <Link href={`/editprofile`}>
                      <button className="font-bold flex gap-4 items-center justify-center px-6 py-2 rounded-lg bg-blue-950 hover:bg-gray-800 text-white border">
                        Edit Profile
                        <FaUserEdit size={20} />
                      </button>
                    </Link>
                  </div>
                )}

                <div className="flex items-center justify-center">
                  <button
                    onClick={handleDelete}
                    className="font-bold flex gap-4 items-center justify-center px-10 py-2 rounded-lg bg-red-600 text-white hover:bg-red-500"
                  >
                    Log Out
                    <FaPowerOff size={14} />
                  </button>
                </div>

                {showConfirmation && (
                  <div className="fixed w-screen inset-0  h-screen flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-50  z-50">
                    <div className="bg-blue-950 p-6 w-11/12 lg:w-2/6 rounded-lg shadow-md">
                      <p className="text-xl">
                        Are you sure you want to Log Out
                      </p>
                      <div className="flex justify-end mt-8">
                        <button
                          onClick={() => setShowConfirmation(false)}
                          className="px-4 py-2 mr-4 bg-gray-600 hover:bg-gray-700 rounded"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleLogout}
                          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
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
          {admin === email ? (
            <div className="flex items-center justify-center">
              <Link
                href="/application-list"
                className="bg-primary-200 text-black px-6 py-2 rounded-lg hover:bg-primary-100"
              >
                Application List
              </Link>
            </div>
          ) : null}
          <ApplicationModel />
        </>
      ) : status !== "authenticated" ? (
        <div className="text-center font-bold flex flex-col gap-10 text-2xl">
          <p>You are not logged in. Log in to access this page.</p>
          <Link href="/signin" className="bg-blue-950 border px-8 py-2 rounded">
            Log in
          </Link>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
