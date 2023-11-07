"use client";
import { TypeAnimation } from "react-type-animation";

export default function TypeEffect() {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        "I Am A Freelancer",
        2000, // wait 1s before replacing "Mice" with "Hamsters"
        "I Am A Graphics Designer",
        2000,
        "I Am An IT Teacher",
        2000,
      ]}
      wrapper="span"
      speed={20}
      repeat={Infinity}
      className="text-2xl"
    />
  );
}
