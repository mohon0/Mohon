"use client";
import Loading from "@/components/common/loading/Loading";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
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
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPosts([]);
    setLoading(true);
    const apiUrl = `api/allpost?page=1&pageSize=5&category=projects`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.posts.length > 0) setPosts(data.posts);

        setLoading(false);
      })
      .catch(() => {
        console.log("error");
        setLoading(false);
      });
  }, []);

  const encodeForUrl = (str: string) => {
    return encodeURIComponent(str).replace(/%20/g, "_");
  };

  return (
    <div className="w-full px-3 md:px-0">
      {loading ? (
        <Loading />
      ) : (
        <div>
          {posts.length > 0 ? (
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
              {posts.map((post) => {
                const encodedTitle = post.title ? encodeForUrl(post.title) : "";

                return (
                  <SwiperSlide
                    key={post.id}
                    className="relative group w-full md:w-1/3 lg:w-1/4 h-60 md:h-96 mb-16 overflow-hidden rounded-2xl"
                  >
                    <Link href={`/blog/${post.category}/${encodedTitle}`}>
                      <Image
                        src={post.coverImage}
                        alt=""
                        className=" w-full h-60 md:h-96 object-cover rounded-2xl"
                        height={500}
                        width={500}
                      />
                      <div className=" absolute bottom-0 gradientbackground px-2 py-3 left-0 flex w-full  text-xl font-medium group-hover:text-primary-200">
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
