import TestimonialSlider from "./TeestimonialSlider";
import TestimonialHeader from "./TestimonialHeader";

export default function Testimonial() {
  return (
    <div className="flex flex-col gap-10 mt-28" id="project">
      <TestimonialHeader />
      <TestimonialSlider />
    </div>
  );
}
