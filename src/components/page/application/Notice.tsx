import React from "react";
import Marquee from "react-fast-marquee";

const Notice: React.FC = () => {
  return (
    <div className="mx-2 mt-20 border border-primary py-2 md:mx-10 lg:mx-20">
      <Marquee pauseOnHover={true}>
        সবাইকে দক্ষ করে গড়ে তোলায় আমাদের একমাত্র লক্ষ্য। ঝিনাইদহ শহরে একমাত্র
        আমরাই আপনাদের সার্বক্ষণিক পাশে আছি। আপনাদের যে কোন সমস্যা জানাতে সরাসরি
        চলে আসুন আমাদের অফিসে। ঠিকানাঃ রফি টাওয়ার (১০ তলা ভবনের ৪র্থ তলা) অথবা
        কল করুনঃ 01989-491248, Gmail: bestcomputer.jhenaidah@gmail.com সবাইকে
        দক্ষ করে গড়ে তোলায় আমাদের একমাত্র লক্ষ্য।
      </Marquee>
    </div>
  );
};

export default Notice;
