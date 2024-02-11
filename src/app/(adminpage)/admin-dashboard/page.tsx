"use client";
import ApplicationCard from "@/components/page/dashboard/ApplicationCard";
import ApplicationChart from "@/components/page/dashboard/ApplicationChart";
import BlogChart from "@/components/page/dashboard/BlogChart";
import CommentCard from "@/components/page/dashboard/CommentCard";
import PostCard from "@/components/page/dashboard/PostCard";
import SwitchCard from "@/components/page/dashboard/SwitchCard";
import UserCard from "@/components/page/dashboard/UserCard";

export default function AdminDashboard() {
  return (
    <div>
      <div className="mx-10 mt-20 md:mt-6">
        <div className="flex items-center justify-center">
          <p className="text-5xl font-extrabold">Dashboard</p>
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
        <div className="grid grid-cols-1 gap-20 lg:grid-cols-2">
          {/* <UserChart /> */}
          <ApplicationChart />
          <BlogChart />
          {/* <CommentChart /> */}
        </div>
      </div>
    </div>
  );
}
