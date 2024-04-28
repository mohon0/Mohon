import { BloodMemberType } from "@/components/type/BloodModelType";
import Image from "next/image";

export default function MemberModel({
  img,
  name,
  title,
  number,
  number2,
}: BloodMemberType) {
  return (
    <div className="flex gap-4">
      <Image src={img} alt="" width="100" />
      <div>
        <p className="text-xl font-bold text-primary">{name}</p>
        <p>{title}</p>
        <p>{number}</p>
        {number2 && <p>{number2}</p>}
      </div>
    </div>
  );
}
