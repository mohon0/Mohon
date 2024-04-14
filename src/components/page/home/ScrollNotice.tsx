"use client";
import logo from "@/images/hero/logo3.png";
import Image from "next/image";
import { useEffect } from "react";

export default function ScrollNotice() {
  useEffect(() => {
    const scrollers = document.querySelectorAll(".scroller");

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      addAnimation();
    }

    function addAnimation() {
      scrollers.forEach((scroller) => {
        scroller.setAttribute("data-animated", "true");

        const scrollerInner = scroller.querySelector(
          ".scroller__inner",
        ) as HTMLElement;
        const scrollerContent = Array.from(scrollerInner.children);

        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true) as HTMLElement;
          duplicatedItem.setAttribute("aria-hidden", "true");
          scrollerInner.appendChild(duplicatedItem);
        });
      });
    }
  }, []);
  return (
    <div className="mx-auto flex flex-col gap-4 lg:ml-28 lg:mr-16 lg:grid lg:grid-cols-12 lg:gap-0">
      <div className="col-span-2 mx-auto flex w-8/12 items-center justify-center gap-2 rounded-md bg-cyan-600 p-1 lg:w-full">
        <Image src={logo} alt="logo" className="h-16 w-16"></Image>
        <div className="animate-pulse text-lg font-bold text-fuchsia-900">
          <p>বেস্ট কম্পিউটার</p>
          <p>ট্রেনিং সেন্টার</p>
        </div>
      </div>
      <div className="col-span-10 flex items-center border-b-2 border-r-2 border-t-2 border-primary">
        <div className="scroller overflow-hidden">
          <div className="scroller__inner text-accent-forground flex animate-scroll gap-4 text-lg">
            <span>আসসালামু আলাইকুম</span>
            <span>বেস্ট কম্পিউটার ট্রেনিং সেন্টারের পক্ষ</span>
            <span>থেকে আপনাকে স্বাগতম।</span>
            <span>বেস্ট কম্পিউটার ট্রেনিং সেন্টারের</span>
            <span>সকল নোটিশ পেতে ও আবেদন করতে উপরে দেওয়া </span>
            <span>(Best Computer T.C) Navbar এ ক্লিক করুন।</span>
            <span>প্রয়োজনে সরাসরি যোগাযোগ করুনঃ-</span>
            <span>রফি টাওয়ার (১০ তলা ভবনো ৪র্থ তলা),</span>
            <span>পায়রা চত্ত্বর ঝিনাইদহ। মোবাইলঃ</span>
            <span>০১৯৮৯-৪৯১২৪৮, ০১৭৯৯-৫৭৪৫৭০</span>
            <span> ধন্যবাদ</span>
          </div>
        </div>
      </div>
    </div>
  );
}
