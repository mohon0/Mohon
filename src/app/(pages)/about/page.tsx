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

export const metadata: Metadata = {
  title: "About Me",
};

export default function AboutMe() {
  return (
    <div className="">
      <div className="flex items-center justify-center">
        <Button size="lg">About Me</Button>
      </div>
      <div className="mx-1 mt-10 flex flex-col-reverse gap-4 md:mx-4 md:flex-row lg:mx-20 lg:gap-16">
        <AboutMeCard />
        <div className="flex flex-col gap-10">
          <Image
            src={img1}
            alt=""
            className="rounded-xl object-cover lg:h-80"
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
    </div>
  );
}
