"use client";

import { useState } from "react";
import "swiper/css";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { TestimonialData } from "./TestimonialData";

import Image from "next/image";
import {
  FaAngleLeft,
  FaAngleRight,
  FaStar,
  FaStarHalfAlt,
} from "react-icons/fa";

export default function TestimonialSlider() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const handleSlideChange = (swiper: any) => {
    setActiveSlideIndex(swiper.activeIndex);
  };

  const slideNext = () => {
    setActiveSlideIndex((prevIndex) => prevIndex + 1);
    console.log("clicked");
  };

  const slidePrev = () => {
    console.log("clicked");
    setActiveSlideIndex((prevIndex) => prevIndex - 1);
  };

  return (
    <div className="relative px-3">
      <Swiper
        modules={[Autoplay, Navigation]}
        grabCursor={true}
        spaceBetween={100}
        autoplay={{
          pauseOnMouseEnter: false,
          disableOnInteraction: false,
          delay: 4000,
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 60,
          },
          768: {
            slidesPerView: 2.2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3.2,
            spaceBetween: 50,
          },
        }}
        centeredSlides={true}
        className="mt-12 w-full"
        onSlideChange={handleSlideChange}
        centerInsufficientSlides={true}
        initialSlide={activeSlideIndex}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
      >
        {TestimonialData.map((slide, index) => (
          <SwiperSlide
            key={index}
            className="border h-96 w-1/3 border-gray-800 p-4"
          >
            <div className="flex justify-between">
              <div className="flex flex-col gap-2">
                <span className="font-bold text-xl">{slide.name}</span>
                <span className="text-gray-400">{slide.title}</span>
              </div>
              <Image
                src={slide.image}
                alt=""
                className="h-16 w-16 rounded-full object-cover"
              />
            </div>
            {slide.star === 4.5 ? (
              <div
                className="flex gap-2 my-4 items-center justify-center text-xl text-orange-600
          "
              >
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalfAlt />
              </div>
            ) : (
              <div
                className="flex gap-2 my-4 items-center justify-center text-xl text-orange-600
          "
              >
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
            )}

            <div className="text-gray-300">{slide.details}</div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="text-3xl font-bold flex items-center justify-center gap-20 my-10">
        <button
          onClick={slidePrev}
          className="swiper-button-prev flex items-center justify-center h-16 w-16 border-2 rounded-full transition-transform transform hover:scale-110 focus:scale-110 border-primary-200 text-primary-100"
        >
          <FaAngleLeft className="text-xl" />
        </button>

        <button
          onClick={slideNext}
          className="swiper-button-next flex items-center justify-center h-16 w-16 border-2 rounded-full transition-transform transform hover:scale-110 focus:scale-110 border-primary-200 text-primary-100"
        >
          <FaAngleRight className="text-xl" />
        </button>
      </div>
    </div>
  );
}
