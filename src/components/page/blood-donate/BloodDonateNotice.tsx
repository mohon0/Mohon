"use client";
import React, { useEffect } from "react";

const BloodDonateNotice: React.FC = () => {
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
    <div className="mx-2 mt-4 border border-primary py-2 md:mx-10 lg:mx-20">
      <div className="scroller overflow-hidden">
        <div className="scroller__inner text-accent-forground flex animate-scroll gap-4">
          <span>জরুরী প্রয়োজনে কল করুনঃ</span>
          <span>
            মোঃ মোহন (সভাপতি) ০১৯৮৯-৪৯১২৪৮, ০১৭৯৯-৫৭৪৫৭০ // মোঃ সুমন (সহ-সভাপতি)
            ০১৩০৩-৯৫৩৪৪১ //
          </span>
          <span>মোঃ হাবিুর রহমান (সাধারণ সম্পাদক) ০১৫৭১-২০৯১৭৮।।</span>
        </div>
      </div>
    </div>
  );
};

export default BloodDonateNotice;
