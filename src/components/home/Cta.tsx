import Link from "next/link";

function Cta() {
  return (
    <div className="mx-3 lg:mx-10">
      <div className="rounded-2xl border-primary-200 md:rounded-full border-2 py-8 px-3 md:px-10 lg:px-32 flex flex-col md:flex-row gap-10 items-center md:justify-between">
        <div className="flex flex-col gap-4">
          <div className="text-3xl lg:text-4xl font-bold">
            Want To Be Join My Team
          </div>
          <div className="text-2xl lg:text-3xl">Lets Get Started...</div>
        </div>
        <div>
          <Link
            href="/contact"
            className="rounded-lg border border-primary-200 px-10 py-3 font-bold text-primary-200 hover:border-2"
          >
            Contact Me
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cta;
