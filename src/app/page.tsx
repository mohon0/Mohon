import StarsCanvas from "@/components/common/animation/Star";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Contact from "@/components/page/contact/Contract";
import Cta from "@/components/page/home/Cta";
import Hero from "@/components/page/home/Hero";
import Projects from "@/components/page/home/Projects";
import Services from "@/components/page/home/Services";
import Team from "@/components/page/home/Team";
import Testimonial from "@/components/page/home/Testimonial";
import Tools from "@/components/page/home/Tools";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <div className="fixed left-0 top-0 -z-50 h-screen">
        <StarsCanvas />
      </div>
      <div className="mt-20">
        <Hero />
      </div>
      <Services />
      <Tools />
      <Projects />
      <Team />
      <Cta />
      <Testimonial />
      <Contact />
      <Footer />
    </main>
  );
}
