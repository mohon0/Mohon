import Skills from "./Skills";
import ToolsHeader from "./ToolsHeader";
import ToolsItems from "./ToolsItems";

export default function Tools() {
  return (
    <div
      className="flex  justify-center flex-col gap-16 mx-3 md:mx-10  lg:mr-28 my-28"
      id="tools"
    >
      <ToolsHeader />
      <div className="grid gap-16 place-content-center lg:grid-cols-3 lg:gap-4">
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
