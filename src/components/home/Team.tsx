"use client";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SectionHeader from "../common/animation/SectionHeader";
import { TeamData } from "./TeamData";
import "./TeamStyle.css";

export default function Team() {
  return (
    <div className="md:my-28  flex items-center justify-center flex-col md:gap-20">
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
          className="my-12 pb-10 w-full "
          centerInsufficientSlides={true}
          freeMode={true}
          pagination={{
            dynamicBullets: true,
          }}
        >
          {TeamData.map((data) => (
            <SwiperSlide
              key={data.id}
              className="w-full md:w-1/3 lg:w-1/4 border-gray-600 rounded-2xl border mb-16"
            >
              <div className=" flex w-full">
                <Image
                  src={data.img}
                  alt=""
                  className=" h-80 object-cover rounded-t-2xl"
                />
              </div>
              <div className="flex flex-col gap-2 my-5 items-center justify-center">
                <div className="text-primary-200 font-bold text-2xl">
                  {data.name}
                </div>
                <div className="text-slate-400">{data.post}</div>
              </div>
              <div className="flex justify-center gap-5 text-slate-300 text-2xl mb-4">
                <Link href={data.facebook} target="_blank">
                  <FaFacebook />
                </Link>
                <Link href={data.twitter} target="_blank">
                  <FaTwitter />
                </Link>
                <Link href={data.linkedin} target="_blank">
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
