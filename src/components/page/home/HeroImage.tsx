import HeroImg from "@/images/hero/logo1.png";
import Image from "next/image";

export default function HeroImage() {
  return (
    <>
      <div className="group relative">
        <div className="absolute inset-4 animate-spin rounded-full bg-gradient-to-bl from-primary  via-sky-600 to-pink-600  blur-2xl transition-all group-hover:-inset-0"></div>
        <div className="relative mx-auto flex h-[17rem] w-[17rem] items-center justify-center overflow-clip text-clip rounded-full bg-background leading-none md:h-80 md:w-80 lg:h-96 lg:w-96 ">
          <Image
            src={HeroImg}
            alt=""
            className=" mx-auto mt-12 object-cover"
            height="350"
            width="350"
            quality="70"
            priority={true}
          />
        </div>
      </div>
    </>
  );
}
