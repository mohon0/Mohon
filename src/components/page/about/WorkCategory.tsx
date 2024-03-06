import { Card } from "@/components/ui/card";
import { WorkData } from "./WorkData";

export default function WorkCategory() {
  return (
    <div className="mx-1 mt-10 md:mx-4">
      <div className="mb-10">
        <div className="text-center text-3xl font-bold">Work Category</div>
        <div className="mx-auto mt-2 h-1 w-60 bg-primary"></div>
      </div>
      <div className="flex flex-col justify-center gap-4 md:flex-row lg:gap-12">
        <Card className="h-fit p-6 lg:h-auto">
          <div className="text-center text-2xl font-bold">
            Extraordinary Experiences
          </div>
          <div className="mx-auto mb-12 mt-2 h-1 w-60 bg-primary"></div>
          <div className="flex flex-col gap-4 text-xl">
            <div className="flex items-center gap-4">
              <div className="h-3 w-3 rounded-full bg-primary"></div>
              <div>Adobe Illustrator</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-3 w-3 rounded-full bg-primary"></div>
              <div>Adobe Photoshop</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-3 w-3 rounded-full bg-primary"></div>
              <div>Adobe Lightroom</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-3 w-3 rounded-full bg-primary"></div>
              <div>Adobe After Effect</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-3 w-3 rounded-full bg-primary"></div>
              <div>Adobe Premiere-Pro</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-3 w-3 rounded-full bg-primary"></div>
              <div>Autodesk Maya</div>
            </div>
            <div className="mt-4 rounded border border-primary p-3 text-center text-xl">
              Python Programming
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 md:grid-cols-3 lg:gap-x-10">
            {WorkData.map((data, index) => (
              <>
                <div key={index}>{data}</div>
              </>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
