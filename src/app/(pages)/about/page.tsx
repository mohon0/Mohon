import AboutMeCard from "@/components/page/about/AboutMeCard";
import WorkCategory from "@/components/page/about/WorkCategory";
import Contact from "@/components/page/contact/Contract";
import Cta from "@/components/page/home/Cta";
import Projects from "@/components/page/home/Projects";
import Team from "@/components/page/home/Team";
import { Button } from "@/components/ui/button";
import img1 from "@/images/hero/img1.jpeg";
import { Metadata } from "next";
import Image from "next/image";

const siteurl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  title: "About Me",
  description: "All you need to know about me",
  alternates: {
    canonical: `/blog/category/about`,
  },
  openGraph: {
    title: "About Me",
    description: "All you need to know about me",
    type: "profile",
    url: `${siteurl}/about`,

    images: [
      {
        url: process.env.NEXT_PUBLIC_SITE_URL + img1.src,
        alt: "profile image",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Me",
    description: "All you need to know about me",
  },
};

export default function AboutMe() {
  return (
    <>
      <div className="mx-1 mt-10 flex flex-col-reverse gap-4 md:mx-4 md:flex-row lg:mx-20 lg:gap-16">
        <div className="md:w-11/12 lg:w-9/12">
          <AboutMeCard />
        </div>
        <div className="flex flex-col gap-10">
          <Image
            src={img1}
            alt=""
            className="rounded-xl object-cover md:h-60 lg:h-80"
            priority
          />
          <a
            href="/cv.pdf"
            download="cv"
            className="flex w-full items-center justify-center"
          >
            <Button size="lg" className="flex w-full">
              Download Cv
            </Button>
          </a>
        </div>
      </div>
      <WorkCategory />
      <Team />
      <Projects />
      <Cta />
      <Contact />
    </>
  );
}
