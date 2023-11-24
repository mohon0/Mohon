import Image from "next/image";
import logo from '@/images/hero/logo3.png'

export default function Header() {
  return (
    <>
      <div>
        <Image src={logo} alt="" className="w-20" />
      </div>
      <div className="text-4xl font-bold text-center">
        Best Computer Training Center, Jhenaidah
      </div>
      <div className="border border-primary-200 text-primary-200 rounded-lg px-10 py-3 text-2xl font-bold">
        Application Form
      </div>
    </>
  );
}
