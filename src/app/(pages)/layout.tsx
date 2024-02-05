import Navbar from "@/components/layout/Navbar";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="min-h-screen mt-20">{children}</div>
    </>
  );
}
