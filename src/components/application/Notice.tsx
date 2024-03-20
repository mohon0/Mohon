"use client";
import React, { useEffect } from "react";

const Notice: React.FC = () => {
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
    <div className="mx-2 mt-20 border border-primary py-2 md:mx-10 lg:mx-20">
      <div className="scroller overflow-hidden">
        <div className="scroller__inner text-accent-forground flex animate-scroll gap-4">
          <p>সবাইকে দক্ষ করে গড়ে তোলায় আমাদের একমাত্র লক্ষ্য।</p>
          <p>ঝিনাইদহ শহরে একমাত্র আমরাই আপনাদের সার্বক্ষণিক পাশে আছি।</p>
          <p>আপনাদের যে কোন সমস্যা জানাতে সরাসরি চলে আসুন আমাদের অফিসে।</p>
          <p>ঠিকানাঃ রফি টাওয়ার (১০ তলা ভবনের ৪র্থ তলা)</p>
          <p>অথবা কল করুনঃ 01989-491248, </p>
          <p>Gmail: bestcomputer.jhenaidah@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default Notice;
