import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import img1 from "@/images/hero/logo1.png";
import Image from "next/image";

export default function AboutMeCard() {
  return (
    <Card>
      <div>
        <CardHeader>
          <div className="flex flex-col-reverse items-center gap-6 md:flex-row md:justify-between">
            <div className="flex flex-col gap-2">
              <CardTitle className="text-2xl font-bold">
                Name: Md. Mohon
              </CardTitle>
              <CardDescription>Graphics Designer & IT Teacher</CardDescription>
              <CardDescription>BirthDay: 15-10-1998</CardDescription>
              <CardDescription>Mobile: +8801989-491248</CardDescription>
              <CardDescription>
                Email: freelancermohon01@gmail.com
              </CardDescription>
              <CardDescription>District: Jhenaidah, Khulna</CardDescription>
              <CardDescription>Country: Bangladesh</CardDescription>
            </div>
            <div>
              <Image src={img1} alt="" className="w-40 " />
            </div>
          </div>
        </CardHeader>
      </div>
      <div className="p-6">
        <CardDescription>
          Hello, my name is Mohon. I am a professional graphic designer with
          over 9 years of experience. I have much experience in designing
          Business cards, Letterheads, Logos, and Flyers. I use Adobe
          Illustrator and Adobe Photoshop to design the graphics for you. Not
          only that, but I will provide high-quality work that will happy all my
          clients. I also provide AI or PSD files. I will complete many projects
          with customer satisfaction. Furthermore, I completed my 2 year diploma
          in graphic design. If you have work related to my skills, then contact
          me.
        </CardDescription>
      </div>
    </Card>
  );
}
