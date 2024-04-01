import { Button } from "@/components/ui/button";
import Link from "next/link";

function Cta() {
  return (
    <div className="mx-3 lg:mx-10">
      <div className="flex flex-col items-center gap-10 rounded-2xl border-2 border-primary px-3 py-8 md:flex-row md:justify-between md:rounded-full md:px-10 lg:px-32">
        <div className="flex flex-col gap-4">
          <div className="text-3xl font-bold lg:text-4xl">
            Want To Be Join My Team
          </div>
          <div className="text-2xl lg:text-3xl">Lets Get Started...</div>
        </div>

        <Link href="#contact">
          <Button
            variant="outline"
            className="rounded-full border-primary px-12 py-6 text-xl font-bold"
          >
            Contact Me
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Cta;
