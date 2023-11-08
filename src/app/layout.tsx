import { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import Provider from "../../context/Provider";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FreeLancer MOHON",
  description: "Graphics Designer and video editor specialist",
  generator: "Next js",
  applicationName: "FreeLancer MOHON",
  keywords: ["Mohon", "graphics", "video", "Photoshop", "Illustration"],
  authors: [{ name: "Md Mohon", url: "https://freelancermohon.online" }],
  creator: "SEJAR PARVEZ",
  openGraph: {
    title: "FreeLancer MOHON",
    description: "Graphics Designer and video editor",
    url: "https://freelancermohon.online",
    siteName: "FreeLancer MOHON",
    images: [
      {
        url: "https://freelancermohon.online/home.jpeg",
        alt: "home page banner image",
      },
    ],
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "Freelancer Mohon",
    description: "Graphics Designer and video editor",
    creator: "@mohongraphics",
    images: ["https://freelancermohon.online/home.jpeg"],
  },
};

interface RootLayoutProps {
  children: ReactNode;
  session: any;
}

export default function RootLayout({ children, session }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider session={session}>
          <Navbar />
          <div className="min-h-screen mt-20 overflow-x-hidden">{children}</div>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
