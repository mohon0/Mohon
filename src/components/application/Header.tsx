import logo from "@/images/hero/logo3.png";
import Image from "next/image";

export default function Header() {
  return (
    <div className="grid-cols-12 md:grid">
      <div className="mb-10 flex flex-col items-center justify-center gap-6 text-center md:col-span-10">
        <Image src={logo} alt="logo" className="h-16 w-16 md:h-20 md:w-20" />
        <div className="text-3xl font-bold lg:text-4xl">
          Best Computer Training Center, Jhenaidah
        </div>
        <div className="flex flex-col gap-2">
          <div>Rofi Tower, 4th Floor, Paira chattor, Jhenaidah</div>
          <div>Mobile: 01989491248</div>
          <div>Email: bestcomputer.jhenaidah@gmail.com</div>
        </div>
        <div className="mb-10 rounded-2xl border border-primary px-6 py-3 text-2xl font-bold md:mb-0 md:text-4xl">
          Application Form
        </div>
      </div>
    </div>
  );
}
