import SectionHeader from "@/components/common/animation/SectionHeader";
import ServicesCardModel from "./ServiceCardModel";
import { ServicesData } from "./ServiceData";

export default function Services() {
  return (
    <div
      className="flex flex-col items-center justify-center gap-10 overflow-clip md:mx-3 md:gap-20 lg:mx-28 lg:my-10"
      id="service"
    >
      <SectionHeader text="What I Do" title="Services & Our Course" />
      <div className="mx-2 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-10 lg:grid-cols-3">
        {ServicesData.map((data) => (
          <div key={data.id} className="col-span-1">
            <ServicesCardModel data={data} key={data.id} />
          </div>
        ))}
      </div>
    </div>
  );
}
