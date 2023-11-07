import ServiceCard from "./ServiceCard";
import ServicesHeader from "./ServicesHeader";

export default function Services() {
  return (
    <div
      className="md:mx-3 lg:mx-28 lg:my-10 overflow-clip flex items-center justify-center flex-col gap-20"
      id="service"
    >
      <ServicesHeader />
      <ServiceCard />
    </div>
  );
}
