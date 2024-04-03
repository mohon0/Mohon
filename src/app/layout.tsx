import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import Provider from "../../context/Provider";
import { ReactQueryClientProvider } from "../../context/ReactQueryClientProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const siteurl = process.env.NEXT_PUBLIC_SITE_URL;
export const metadata: Metadata = {
  metadataBase: new URL(`${siteurl}`),
  title: {
    default: "Freelancer Mohon",
    template: "%s - Freelancer Mohon",
  },
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
  },
};

interface RootLayoutProps {
  children: ReactNode;
  session: any;
}

export default function RootLayout({ children, session }: RootLayoutProps) {
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <body className={inter.className}>
          <Provider session={session}>
            <div className="min-h-screen">{children}</div>
          </Provider>
          <ReactQueryDevtools initialIsOpen={false} />
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
