import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="mt-20 min-h-screen">{children}</div>
      <Footer />
    </>
  );
}
