import SectionHeader from "@/components/common/animation/SectionHeader";
import Skills from "./Skills";
import ToolsItems from "./ToolsItems";

export default function Tools() {
  return (
    <div
      className="mx-3  my-20 flex flex-col justify-center gap-16  md:mx-10 lg:mr-28"
      id="tools"
    >
      <SectionHeader text="What I Use" title="Tools & Skills" />
      <div className="grid place-content-center gap-16 lg:grid-cols-3 lg:gap-4">
        <div className="lg:col-span-2">
          <ToolsItems />
        </div>
        <div>
          <Skills />
        </div>
      </div>
    </div>
  );
}
