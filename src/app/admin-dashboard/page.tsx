"use client";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import ApplicationCard from "@/components/page/dashboard/ApplicationCard";
import CommentCard from "@/components/page/dashboard/CommentCard";
import Navbarui from "@/components/page/dashboard/Navbar";
import PostCard from "@/components/page/dashboard/PostCard";
import SideBar from "@/components/page/dashboard/SideBar";
import SwitchCard from "@/components/page/dashboard/SwitchCard";
import UserCard from "@/components/page/dashboard/UserCard";

export default function AdminDashboard() {
  return (
    <>
      <div>
        <SideBar />
        <div className="min-h-screen md:ml-52">
          <div className="md:hidden">
            <Navbar />
          </div>
          <div className="hidden md:block">
            <Navbarui />
          </div>
          <div className="mx-10 md:mt-6 mt-20">
            <div className="flex items-center justify-center">
              <p className="text-2xl font-extrabold">Dashboard</p>
            </div>
            <div className="mt-6">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="col-span-2 grid grid-cols-1 gap-8 md:grid-cols-2">
                  <UserCard />
                  <ApplicationCard />
                  <PostCard />
                  <CommentCard />
                </div>
                <SwitchCard />
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}
