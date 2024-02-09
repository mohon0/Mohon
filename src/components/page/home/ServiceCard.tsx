import ServicesCardModel from "./ServiceCardModel";
import { ServicesData } from "./ServiceData";

export default function ServiceCard() {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-4 mx-2 md:gap-10">
      {ServicesData.map((data) => (
        <div key={data.id} className="col-span-1">
          <ServicesCardModel data={data} key={data.id} />
        </div>
      ))}
    </div>
  );
}
