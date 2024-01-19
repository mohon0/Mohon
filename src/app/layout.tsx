import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { ReactNode } from "react";
import Provider from "../../context/Provider";
import { ReactQueryClientProvider } from "../../context/ReactQueryClientProvider";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Freelancer Mohon",
  description:
    "Professional Graphics Desinger & IT Teacher. Jhenaidah, Khulna, Bangladesh.",
  generator: "Next js",
  applicationName: "FreeLancer MOHON",
  keywords: [
    "graphic,logo, anydesigne, mohon, freelancermohon, best_graphic_designe_in jhenaidah, best_graphic_designe_in_bangladesh, logodesigner, logo, logodesigne, bestlogodesign, mdmohon, freelancermohonjhenaidah, Graphic design portfolio, Poster and flyer design, Social media graphics, Vector graphics design, Creative branding agency, Affordable graphic design, Corporate identity design, UI/UX design services, Visual communication design, Typography specialists, Digital illustration, Print design services, Branding and identity design, Web graphics design, Logo design experts, Freelance graphic designer, Custom graphic design, Creative design solutions, Professional graphic designer, Graphic design services, freelancermohon",
  ],
  authors: [{ name: "freelancermohon", url: "https://freelancermohon.online" }],
  creator: "md mohon",
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
  verification: {
    google: "TMr7owx3VxtN03KJtxIgqV3NCg0z_CRhvq69_U1lB1Y",
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
  const queryClient = new QueryClient();
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-N6SRGXKBYL"
        ></Script>
        <Script
          id="google-analytics"
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-N6SRGXKBYL');
          `,
          }}
        />

        <body className={inter.className}>
          <Provider session={session}>
            <Navbar />
            <div className="min-h-screen mt-20">{children}</div>
            <Footer />
          </Provider>
          <ReactQueryDevtools initialIsOpen={false} />
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
