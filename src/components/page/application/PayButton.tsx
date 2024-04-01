import bkash from "@/images/tools/bkash.svg";
import { useFormikContext } from "formik";
import Image from "next/image";
import Link from "next/link";
import { SingleApplicationType } from "../../type/ApplicationType";

export default function PayButton() {
  const formik = useFormikContext<SingleApplicationType>();
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
      className="relative mt-2 flex w-fit items-center gap-2 rounded-lg border bg-sky-600 px-2"
    >
      <Image src={bkash} alt="bkash" className=" w-20" />
      <span>Pay with bkash</span>
      <div className="absolute -right-6 top-0 h-3 w-3 animate-ping rounded-full bg-pink-600"></div>
    </Link>
  );
}
