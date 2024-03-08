import DurationToggle from "@/components/common/toggle/DurationToggle";
import Toggle from "@/components/common/toggle/Toggle";
import { Card } from "@/components/ui/card";

export default function SwitchCard() {
  return (
    <Card className="flex flex-col items-center justify-center gap-6 p-5">
      <Toggle />
      <DurationToggle />
    </Card>
  );
}
