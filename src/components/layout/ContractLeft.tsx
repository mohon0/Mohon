import { AiOutlinePhone } from "react-icons/ai";
import { IoLocationOutline } from "react-icons/io5";
import { TfiEmail } from "react-icons/tfi";

export default function ContractLeft() {
  return (
    <div className=" col-span-1 flex flex-col gap-4 p-2 md:gap-16">
      <div className="flex flex-col gap-2">
        <span className="text-3xl font-bold text-primary-200">
          Get In Touch
        </span>
        <span className="h-1 w-20 bg-primary-300"></span>
        <span className=" text-gray-300 mt-4">
          Feel free to get in touch with me for any inquiries, feedback or
          assistance. I am dedicated to providing excellent service and are
          eager to hear from you.
        </span>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-8 font-semibold">
          <IoLocationOutline color="#09f1b8" size="32" />

          <div>
            Rofi Tower 4th Floor Paira Chattra, Jhenaidah, Dhaka, Bangladesh
          </div>
        </div>
        <div className="flex items-center gap-8 font-semibold">
          <TfiEmail color="#09f1b8" size="20" />

          <div className="overflow-x-scroll">freelancermohon01@gmail.com</div>
        </div>
        <div className="flex items-center gap-8 font-semibold">
          <AiOutlinePhone color="#09f1b8" size="24" />

          <div>+8801989-491248</div>
        </div>
      </div>
    </div>
  );
}
