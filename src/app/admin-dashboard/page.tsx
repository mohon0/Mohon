"use client";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { BsGridFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FaPowerOff } from "react-icons/fa6";

export default function AdminDashboard() {
  const pathname = usePathname();

  return (
    <>
      <div className="grid grid-cols-12">
        <div className="col-span-2 flex min-h-screen flex-col justify-between overflow-clip bg-gradient-to-tr from-violet-500 via-sky-600 to-fuchsia-600">
          <div>
            <p className="my-3 text-center text-2xl font-bold text-primary-200">
              MOHON
            </p>
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
          <div className="mx-4 mb-10 flex flex-col">
            <div></div>
            <Button variant="destructive" className="flex items-center gap-4">
              <FaPowerOff />
              <span>Logout</span>
            </Button>
          </div>
        </div>
        <div className="col-span-10">main</div>
      </div>
    </>
  );
}
