import { StaticImageData } from "next/image";

export interface BloodMemberType {
  img: StaticImageData;
  name: string;
  title: string;
  number: string;
  number2: string | undefined;
}
