import SpeedTest from "@/components/speed/SpeedTest";

export default function STest() {
  return (
    <div className="flex flex-col my-32">
      <div className="flex flex-col gap-10 items-center justify-center">
        <div className="text-xl text-slate-300">Typing Speed Test</div>
        <div className="text-7xl font-extrabold">Test your typing skills</div>
      </div>
      <div className="mt-20">
        <SpeedTest />
      </div>
    </div>
  );
}
