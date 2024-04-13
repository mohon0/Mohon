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
    <div className="ml-28 mr-16 grid grid-cols-12">
      <div className="col-span-2 flex items-center justify-center gap-2 rounded-md bg-cyan-600 p-1">
        <Image src={logo} alt="logo" className="h-16 w-16"></Image>
        <div className="animate-pulse text-lg font-bold text-fuchsia-900">
          <p>বেস্ট কম্পিউটার</p>
          <p>ট্রেনিং সেন্টার</p>
        </div>
      </div>
      <div className="col-span-10 flex items-center border-b-2 border-r-2 border-t-2 border-primary">
        <div className="scroller overflow-hidden">
          <div className="scroller__inner text-accent-forground flex animate-scroll gap-4 text-lg">
            <span>সবাইকে দক্ষ করে গড়ে তোলায় আমাদের একমাত্র লক্ষ্য।</span>
            <span>
              ঝিনাইদহ শহরে একমাত্র আমরাই আপনাদের সার্বক্ষণিক পাশে আছি।
            </span>
            <span>
              আপনাদের যে কোন সমস্যা জানাতে সরাসরি চলে আসুন আমাদের অফিসে।
            </span>
            <span>ঠিকানাঃ রফি টাওয়ার (১০ তলা ভবনের ৪র্থ তলা)</span>
            <span>অথবা কল করুনঃ 01989-491248, </span>
            <span>Gmail: bestcomputer.jhenaidah@gmail.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}
