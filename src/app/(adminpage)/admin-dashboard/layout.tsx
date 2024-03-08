import Footer from "@/components/layout/Footer";
import AdminNavbar from "@/components/page/dashboard/AdminNavbar";
import SideBar from "@/components/page/dashboard/SideBar";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <SideBar />
      <div className="min-h-screen md:ml-52">
        <AdminNavbar />
        <div className="mx-2 mt-20 md:mx-10 md:mt-6">{children}</div>
        <Footer />
      </div>
    </div>
  );
}
