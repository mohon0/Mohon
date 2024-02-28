"use client";
import pic1 from "@/images/hero/1.jpg";
import pic3 from "@/images/hero/2.jpg";
import pic2 from "@/images/hero/3.jpg";
import pic4 from "@/images/hero/4.jpg";
import pic5 from "@/images/hero/5.jpg";
import pic6 from "@/images/hero/6.jpg";
import pic7 from "@/images/hero/7.jpg";
import Image from "next/image";
import Link from "next/link";
import { SetStateAction, useState } from "react";

export default function ProjectHead() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleImageSelection = (index: SetStateAction<number>) => {
    setSelectedImageIndex(index);
  };

  return (
    <div className=" mx-2 mt-8 flex flex-col gap-10 md:mx-10">
      <div className="flex flex-col gap-10 md:flex-row">
        <div className="md:w-7/12">
          <Image
            src={
              selectedImageIndex === 0
                ? pic1
                : selectedImageIndex === 1
                  ? pic2
                  : selectedImageIndex === 2
                    ? pic3
                    : selectedImageIndex === 3
                      ? pic4
                      : pic5
            }
            alt=""
            loading="lazy"
            className="h-fit w-full rounded-2xl object-cover"
          />
        </div>
        <div className="flex flex-col gap-10 md:w-5/12 md:pl-6">
          <div className="text-4xl font-bold text-primary">About Me</div>
          <div className="flex flex-col gap-6">
            <div className="text-2xl font-medium">
              Hello, I&#39;m Md. Mohon,
            </div>
            <div className="text-slate-300 lg:text-xl">
              A passionate graphic designer based in Jhenaidah, Bangladesh. With
              a strong background in design principles and a keen eye for
              aesthetics, I create visually captivating and meaningful graphics
              that leave a lasting impact. My design journey is fueled by
              creativity, innovation, and a deep love for art.
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div>
        <div className="mt-4 flex h-[5rem] gap-2 overflow-clip md:h-[7rem] md:gap-4">
          <Image
            alt=""
            src={pic1}
            className={`h-full w-full rounded-xl object-cover ${
              selectedImageIndex === 0 ? "opacity-100" : "opacity-70"
            }`}
            onClick={() => handleImageSelection(0)}
          />
          <Image
            alt=""
            src={pic2}
            className={`h-full w-full rounded-xl object-cover ${
              selectedImageIndex === 1 ? "opacity-100" : "opacity-70"
            }`}
            onClick={() => handleImageSelection(1)}
          />
          <Image
            alt=""
            src={pic3}
            className={`h-full w-full rounded-xl object-cover ${
              selectedImageIndex === 2 ? "opacity-100" : "opacity-70"
            }`}
            onClick={() => handleImageSelection(2)}
          />
          <Image
            alt=""
            src={pic4}
            className={`h-full w-full rounded-xl object-cover ${
              selectedImageIndex === 3 ? "opacity-100" : "opacity-70"
            }`}
            onClick={() => handleImageSelection(3)}
          />
          <Image
            alt=""
            src={pic5}
            className={`h-full w-full rounded-xl object-cover ${
              selectedImageIndex === 4 ? "opacity-100" : "opacity-70"
            }`}
            onClick={() => handleImageSelection(4)}
          />
        </div>
      </div>
      <hr />
      <div className="flex flex-col-reverse gap-10 md:flex-row">
        <div className="flex flex-col gap-6 text-slate-300 md:w-1/2 lg:text-xl">
          <div>
            I specialize in bringing ideas to life through various design
            mediums, ensuring that each project I undertake is a unique
            masterpiece. My skill set includes a wide range of design tools and
            techniques to craft logos, branding materials, web graphics, and
            more. I believe that good design not only looks great but also
            communicates a story, and I strive to convey your message
            effectively through my work.
          </div>
          <div>
            As a graphic designer, I&#39;m dedicated to staying up-to-date with
            the latest design trends and technologies, ensuring that I can offer
            fresh and contemporary solutions to my clients.
          </div>
        </div>
        <div className="md:w-1/2">
          <Image src={pic6} alt="" className="h-fit w-full rounded-2xl" />
        </div>
      </div>
      <hr />
      <div className="flex flex-col gap-10 md:flex-row">
        <div className="md:w-1/2">
          <Image src={pic7} alt="" className="h-fit w-full rounded-2xl" />
        </div>
        <div className="flex flex-col gap-6 md:w-1/2 lg:text-xl">
          <div>
            Whether you&#39;re a business looking to establish a strong visual
            identity or an individual seeking personalized design, I&#39;m here
            to turn your vision into reality.
          </div>
          <div>
            Let&#39;s collaborate and transform your ideas into stunning visuals
            that speak volumes. Feel free to reach out and let&#39;s create
            something remarkable together.
          </div>
          <Link
            href="/contact"
            className="mt-10 flex items-center justify-center rounded-full bg-primary px-10 py-3 text-black transition-all duration-200 hover:font-bold hover:tracking-wider lg:text-xl"
          >
            Contact Me
          </Link>
        </div>
      </div>
    </div>
  );
}
