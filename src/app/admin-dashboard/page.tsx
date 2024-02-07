"use client";
import ApplicationCard from "@/components/page/dashboard/ApplicationCard";
import CommentCard from "@/components/page/dashboard/CommentCard";
import Navbar from "@/components/page/dashboard/Navbar";
import PostCard from "@/components/page/dashboard/PostCard";
import SideBar from "@/components/page/dashboard/SideBar";
import UserCard from "@/components/page/dashboard/UserCard";
import { Card } from "@/components/ui/card";

export default function AdminDashboard() {
  return (
    <>
      <div className="grid grid-cols-12">
        <SideBar />
        <div className="col-span-10">
          <Navbar />
          <div className="mx-10 mt-6">
            <div className="flex items-center justify-center">
              <p className="text-2xl font-extrabold">Dashboard</p>
            </div>
            <div className="mt-6">
              <div className="grid grid-cols-3 gap-8">
                <div className="col-span-2 grid grid-cols-2 gap-8">
                  <UserCard />
                  <ApplicationCard />
                  <PostCard />
                  <CommentCard />
                </div>
                <Card className="h-80 w-full border"></Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
