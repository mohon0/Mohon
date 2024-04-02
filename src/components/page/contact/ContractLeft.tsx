import { AiOutlinePhone } from "react-icons/ai";
import { IoLocationOutline } from "react-icons/io5";
import { TfiEmail } from "react-icons/tfi";

export default function ContractLeft() {
  return (
    <div className=" col-span-1 flex flex-col gap-4 p-2 md:gap-16">
      <div className="flex flex-col gap-2">
        <span className="text-3xl font-bold text-primary">Get In Touch</span>
        <span className="h-1 w-20 bg-primary"></span>
        <span className=" mt-4 text-secondary-foreground">
          Feel free to get in touch with me for any inquiries, feedback or
          assistance. I am dedicated to providing excellent service and are
          eager to hear from you.
        </span>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-3 font-semibold md:gap-8">
          <div className="text-primary">
            <IoLocationOutline size="24" />
          </div>

          <div>
            Rofi Tower 4th Floor Paira Chattra, Jhenaidah, Dhaka, Bangladesh
          </div>
        </div>
        <div className="flex items-center gap-3 font-semibold md:gap-8">
          <div className="text-primary">
            <TfiEmail size="20" />
          </div>

          <div>freelancermohon01@gmail.com</div>
        </div>
        <div className="flex items-center gap-3 font-semibold md:gap-8">
          <div className="text-primary">
            <AiOutlinePhone size="24" />
          </div>

          <div>+8801989-491248</div>
        </div>
      </div>
    </div>
  );
}
