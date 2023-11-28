import logo from "@/images/hero/logo3.png";
import Image from "next/image";

export default function Header() {
  return (
    <div className="md:grid grid-cols-12">
      <div className="md:col-span-12 text-center flex flex-col gap-6 items-center justify-center mb-10 print:mb-0">
        <Image src={logo} alt="logo" className="h-16 w-16 md:h-20 md:w-20" />
        <div className="text-3xl lg:text-4xl font-bold">
          Best Computer Training Center, Jhenaidah
        </div>
        <div className="flex flex-col gap-2">
          <div>Rofi Tower, 4th Floor, Paira chattor, Jhenaidah</div>
          <div>Mobile: 01989491248</div>
          <div>Email: bestcomputer.jhenaidah@gmail.com</div>
        </div>
        <div className="border border-primary-200 py-3 px-6 rounded-2xl text-2xl mb-10 md:mb-0 md:text-4xl font-bold print:border-none">
          Application Form
        </div>
      </div>
    </div>
  );
}
