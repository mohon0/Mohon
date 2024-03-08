import Footer from "@/components/layout/Footer";
import AdminNavbar from "@/components/page/dashboard/AdminNavbar";
import Navbarui from "@/components/page/dashboard/Navbar";
import SideBar from "@/components/page/dashboard/SideBar";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <SideBar />
      <div className="min-h-screen md:ml-52">
        <div className="md:hidden">
          <AdminNavbar />
        </div>
        <div className="hidden md:block">
          <Navbarui />
        </div>
        <div className="mx-10 mt-20 md:mt-6">{children}</div>
        <Footer />
      </div>
    </div>
  );
}
