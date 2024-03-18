"use client";
import Loading from "@/components/common/loading/Loading";
import { FetchHomePageRecentProject } from "@/components/fetch/get/blog/FetchHomepageRecentProject";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface Post {
  id: number;
  coverImage: string;
  title: string;
  content: string;
  author: {
    name: string;
  };
  createdAt: string;
  updatedAt: string;
  category: string;
}

export default function ProjectSlider() {
  const { isLoading, isError, data } = FetchHomePageRecentProject();

  const encodeForUrl = (str: string) => {
    return encodeURIComponent(str).replace(/%20/g, "_");
  };

  return (
    <div className="w-full px-3 md:px-0">
      {isLoading ? (
        <div className="m-3">
          <Loading />
        </div>
      ) : isError ? (
        <p>Error loading posts. Please try again later.</p>
      ) : (
        <div>
          {data.posts.length > 0 ? (
            <Swiper
              modules={[Autoplay, FreeMode, Pagination]}
              grabCursor={true}
              autoplay={{
                pauseOnMouseEnter: false,
                disableOnInteraction: false,
              }}
              breakpoints={{
                480: {
                  slidesPerView: 1,
                  spaceBetween: 60,
                },
                540: {
                  slidesPerView: 1.6,
                  spaceBetween: 60,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 2.2,
                  spaceBetween: 50,
                },
                1224: {
                  slidesPerView: 2.6,
                  spaceBetween: 50,
                },
              }}
              centeredSlides={true}
              className="my-12 w-full "
              centerInsufficientSlides={true}
              freeMode={true}
              pagination={{
                dynamicBullets: true,
              }}
            >
              {data.posts.map((post: Post) => {
                const encodedTitle = post.title ? encodeForUrl(post.title) : "";

                return (
                  <SwiperSlide
                    key={post.id}
                    className="group relative mb-16 h-60 w-full overflow-hidden rounded-2xl md:h-96 md:w-1/3 lg:w-1/4"
                  >
                    <Link href={`/blog/${post.category}/${encodedTitle}`}>
                      <Image
                        src={post.coverImage}
                        alt=""
                        className=" h-60 w-full rounded-2xl object-cover md:h-96"
                        height={500}
                        width={500}
                      />
                      <div className=" absolute bottom-0 left-0 flex w-full bg-slate-950 bg-opacity-25  px-2 py-3 text-xl backdrop-blur-md">
                        {post.title}
                      </div>
                    </Link>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          ) : (
            <p className="flex items-center justify-center text-xl font-bold">
              No content to display.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
