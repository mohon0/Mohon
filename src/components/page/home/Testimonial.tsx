import SectionHeader from "@/components/common/animation/SectionHeader";
import TestimonialSlider from "./TeestimonialSlider";

export default function Testimonial() {
  return (
    <div className="mt-28 flex flex-col gap-10" id="project">
      <SectionHeader text="What They Say" title="Testimonials" />
      <TestimonialSlider />
    </div>
  );
}
