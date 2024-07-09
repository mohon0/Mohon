"use client";
import Loading from "@/components/common/loading/Loading";
import ApplicationCard from "@/components/page/dashboard/ApplicationCard";
import ApplicationChart from "@/components/page/dashboard/ApplicationChart";
import BlogChart from "@/components/page/dashboard/BlogChart";
import CommentCard from "@/components/page/dashboard/CommentCard";
import PostCard from "@/components/page/dashboard/PostCard";
import SwitchCard from "@/components/page/dashboard/SwitchCard";
import UserCard from "@/components/page/dashboard/UserCard";
import { useSession } from "next-auth/react";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const admin = process.env.NEXT_PUBLIC_ADMIN;

  return (
    <>
      {status === "loading" ? (
        <Loading />
      ) : status === "unauthenticated" ? (
        "Your are not authenticated"
      ) : status === "authenticated" && session.user?.email === admin ? (
        <div className="mt-20 space-y-20 md:mt-6">
          <div className="flex items-center justify-center">
            <p className="text-2xl font-extrabold md:text-4xl">Dashboard</p>
          </div>
          <div className="mt-6">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <UserCard />
              <ApplicationCard />
              <PostCard />
              <CommentCard />
              <SwitchCard />
            </div>
          </div>
          <div className="grid grid-cols-1 md:gap-20 lg:grid-cols-2">
            <ApplicationChart />
            <BlogChart />
          </div>
        </div>
      ) : (
        "Your are Not Authorized to access this page"
      )}
    </>
  );
}
