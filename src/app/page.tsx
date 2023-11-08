import StarsCanvas from "@/components/common/animation/Star";
import Cta from "@/components/home/Cta";
import Hero from "@/components/home/Hero";
import Projects from "@/components/home/Projects";
import Services from "@/components/home/Services";
import Team from "@/components/home/Team";
import Testimonial from "@/components/home/Testimonial";
import Tools from "@/components/home/Tools";
import { Contract } from "@/components/layout/Contract";

export default function Home() {
  return (
    <main>
      <div className="fixed h-screen -z-50 left-0 top-0">
        <StarsCanvas />
      </div>
      <Hero />
      <Services />
      <Tools />
      <Projects />
      <Team />
      <Cta />
      <Testimonial />
      <Contract />
    </main>
  );
}
