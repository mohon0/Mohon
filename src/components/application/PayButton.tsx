import bkash from "@/images/tools/bkash.svg";
import { useFormikContext } from "formik";
import Image from "next/image";
import Link from "next/link";

interface SingleApplicationProps {
  firstName: string;
  lastName: string;
  fatherName: string;
  motherName: string;
  birthDay: string;
  bloodGroup: string;
  mobileNumber: string;
  guardianNumber: string;
  gender: string;
  gpa: string;
  nationality: string;
  nid: string;
  passingYear: string;
  regNumber: string;
  religion: string;
  rollNumber: string;
  image: string;
  fullAddress: string;
  district: string;
  courseName: string;
  duration: string;
  education: string;
  board: string;
  course: string;
  pc: string;
  email: string;
  transactionId: string;
  fatherOccupation: string;
  maritalStatus: string;
}

export default function PayButton() {
  const formik = useFormikContext<SingleApplicationProps>();
  const { values } = formik;

  return (
    <Link
      target="_blank"
      rel="noopener noreferrer"
      href={
        values.duration === "1 month"
          ? "https://shop.bkash.com/mia-store01779120023/pay/bdt600/2ODOyz"
          : "https://shop.bkash.com/mia-store01779120023/pay/bdt100/ZHHBE3"
      }
      className="border relative flex items-center gap-2 px-2 mt-2 bg-sky-600 rounded-lg w-fit"
    >
      <Image src={bkash} alt="bkash" className=" w-20" />
      <span>Pay with bkash</span>
      <div className="h-3 w-3 rounded-full bg-pink-600 animate-ping absolute top-0 -right-6"></div>
    </Link>
  );
}
