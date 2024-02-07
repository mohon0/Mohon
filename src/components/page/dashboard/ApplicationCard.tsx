import { Card } from "@/components/ui/card";
import { FaUsers } from "react-icons/fa";

export default function ApplicationCard() {
  return (
    <Card className="p-3">
      <div className="flex items-center gap-6">
        <div className="flex flex-col gap-2">
          <div className="text-4xl font-bold">10</div>
          <div>Total Application</div>
          <div>0.4% More Then Last Month</div>
        </div>
        <div className="mx-auto flex items-center justify-center text-primary-200">
          <FaUsers size={60} />
        </div>
      </div>
    </Card>
  );
}
