"use client";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SectionHeader from "../../common/animation/SectionHeader";
import { TeamData } from "./TeamData";
import "./TeamStyle.css";

export default function Team() {
  return (
    <div className="flex  flex-col items-center justify-center md:my-10 md:gap-1">
      <SectionHeader text="Team Members" title="My Team" />
      <div className="w-full px-3 md:px-0">
        <Swiper
          modules={[Autoplay, FreeMode, Pagination]}
          grabCursor={true}
          autoplay={{
            pauseOnMouseEnter: false,
            disableOnInteraction: false,
            delay: 3000,
          }}
          breakpoints={{
            480: {
              slidesPerView: 1,
              spaceBetween: 60,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 60,
            },
            768: {
              slidesPerView: 2.8,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 4.2,
              spaceBetween: 50,
            },
          }}
          centeredSlides={true}
          className="my-12 w-full pb-10 "
          centerInsufficientSlides={true}
          freeMode={true}
          pagination={{
            dynamicBullets: true,
          }}
        >
          {TeamData.map((data) => (
            <SwiperSlide
              key={data.id}
              className="mb-16 w-full rounded-2xl border md:w-1/3 lg:w-1/4"
            >
              <div className=" flex w-full">
                <Image
                  src={data.img}
                  alt=""
                  className=" h-80 rounded-t-2xl object-cover"
                />
              </div>
              <div className="my-5 flex flex-col items-center justify-center gap-2">
                <div className="text-2xl font-bold text-primary">
                  {data.name}
                </div>
                <div className="text-secondary-foreground">{data.post}</div>
              </div>
              <div className="mb-4 flex justify-center gap-5 text-2xl text-slate-300">
                <Link
                  href={data.facebook}
                  target="_blank"
                  aria-label="Facebook"
                >
                  <span className="sr-only">Facebook</span>
                  <FaFacebook />
                </Link>
                <Link href={data.twitter} target="_blank" aria-label="Twitter">
                  <span className="sr-only">Twitter</span>
                  <FaTwitter />
                </Link>
                <Link
                  href={data.linkedin}
                  target="_blank"
                  aria-label="LinkedIn"
                >
                  <span className="sr-only">LinkedIn</span>
                  <FaLinkedin />
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
