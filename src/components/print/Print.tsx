"use client";
import logo2 from "@/images/hero/logo2.png";
import logo from "@/images/hero/logo3.png";
import Image from "next/image";
import { useRef } from "react";
import { IoMdPrint } from "react-icons/io";
import { useReactToPrint } from "react-to-print";
import { Button } from "../ui/button";
interface SingleApplicationProps {
  application: {
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
  };
}

export default function Print({ application }: SingleApplicationProps) {
  const duration =
    application.duration === "free"
      ? "Free (conditions applied)"
      : application.duration;
  const componentRef = useRef<HTMLDivElement | null>(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
    <div>
      <div ref={componentRef} className="">
        <div className="print:flex flex flex-col print:flex-row md:flex-row items-center justify-center gap-6 print:px-10 md:px-10 px-2 print:py-8 py-2 md:py-8 bg-cyan-500">
          <div className="print:w-2/12 md:w-2/12 w-4/12">
            <Image src={logo} alt="" />
          </div>
          <div className="print:w-8/12 w-11/12 text-center md:w-8/12 flex items-center justify-center flex-col">
            <div className="text-black text-center text-3xl font-bold">
              Best Computer Training Center
            </div>
            <div className="text-gray-900">
              Rofi Tower, 4th Floor, Paira chattor, Jhenaidah
            </div>
            <div className="text-gray-900">
              <span className="font-bold">Mobile: </span> 01989491248
            </div>
            <div className="text-gray-900">
              <span className="font-bold">Email: </span>{" "}
              bestcomputer.jhenaidah@gmail.com
            </div>
          </div>
          <div className="print:w-2/12 md:w-2/12">
            <Image
              src={application.image}
              alt=""
              width={200}
              height={200}
              className="w-full h-32 md:h-48 print:h-32 object-cover"
            />
          </div>
        </div>
        <div className="h-1 w-full bg-black mt-3"></div>
        <div className="flex items-center justify-center">
          <Button
            variant="secondary"
            size="lg"
            className="mx-auto my-8 bg-cyan-700 text-xl font-bold text-white"
          >
            Admission Form
          </Button>
        </div>
        <div className="relative mx-2 print:mx-10 md:mx-10 print:text-black ">
          <div className="flex items-center ml-3 print:ml-10 md:ml-10">
            <div className="col-span-1 p-2">
              <span className="font-bold">Student full Name: </span>
              <span>
                {capitalizeFirstLetter(application.firstName)}{" "}
                {application.lastName}
              </span>
            </div>
          </div>
          <div className="md:grid print:grid grid-cols-2 gap-10 ml-3 print:ml-10 md:ml-10">
            <div className="col-span-1 p-2">
              <span className="font-bold">Father Name: </span>
              <span>{capitalizeFirstLetter(application.fatherName)}</span>
            </div>
            <div className="col-span-1 p-2">
              <span className="font-bold">Mother Name: </span>
              <span>{capitalizeFirstLetter(application.motherName)}</span>
            </div>
          </div>
          <div className="md:grid print:grid grid-cols-2 gap-10 ml-3 print:ml-10 md:ml-10">
            <div className="col-span-1 p-2">
              <span className="font-bold">Date Of Birth: </span>
              <span>{application.birthDay}</span>
            </div>
            <div className="col-span-1 p-2">
              <span className="font-bold">Blood Group: </span>
              <span>{application.bloodGroup}</span>
            </div>
          </div>
          <div className="md:grid print:grid grid-cols-2 gap-10 ml-3 print:ml-10 md:ml-10">
            <div className="col-span-1 p-2">
              <span className="font-bold">Mobile Number: </span>
              <span>{application.mobileNumber}</span>
            </div>
            <div className="col-span-1 p-2">
              <span className="font-bold">Guardian Number: </span>
              <span>{application.guardianNumber}</span>
            </div>
          </div>
          <div className="md:grid print:grid grid-cols-2 gap-10 ml-3 print:ml-10 md:ml-10">
            <div className="col-span-1 p-2">
              <span className="font-bold">Gender: </span>
              <span>{capitalizeFirstLetter(application.gender)}</span>
            </div>
            <div className="col-span-1 p-2">
              <span className="font-bold">Religion: </span>
              <span>{capitalizeFirstLetter(application.religion)}</span>
            </div>
          </div>
          <div className="md:grid print:grid grid-cols-2 gap-10 ml-3 print:ml-10 md:ml-10">
            <div className="col-span-1 p-2">
              <span className="font-bold">Full Address: </span>
              <span>{capitalizeFirstLetter(application.fullAddress)}</span>
            </div>
            <div className="col-span-1 p-2">
              <span className="font-bold">District: </span>
              <span>{capitalizeFirstLetter(application.district)}</span>
            </div>
          </div>
          <div className="md:grid print:grid grid-cols-2 gap-10 ml-3 print:ml-10 md:ml-10">
            <div className="col-span-1 p-2">
              <span className="font-bold">Email Address: </span>
              <span>{application.email}</span>
            </div>
            <div className="col-span-1 p-2">
              <span className="font-bold">Computer: </span>
              <span>{application.pc}</span>
            </div>
          </div>
          <div className="md:grid print:grid grid-cols-2 gap-10 ml-3 print:ml-10 md:ml-10">
            <div className="col-span-1 p-2">
              <span className="font-bold">Education: </span>
              <span>{capitalizeFirstLetter(application.education)}</span>
            </div>
            <div className="col-span-1 p-2">
              <span className="font-bold">Board: </span>
              <span>{capitalizeFirstLetter(application.board)}</span>
            </div>
          </div>
          <div className="md:grid print:grid grid-cols-2 gap-10 ml-3 print:ml-10 md:ml-10">
            <div className="col-span-1 p-2">
              <span className="font-bold">Roll Number: </span>
              <span>{application.rollNumber}</span>
            </div>
            <div className="col-span-1 p-2">
              <span className="font-bold">Reg Number: </span>
              <span>{application.regNumber}</span>
            </div>
          </div>
          <div className="md:grid print:grid grid-cols-2 gap-10 ml-3 print:ml-10 md:ml-10">
            <div className="col-span-1 p-2">
              <span className="font-bold">Passing Year: </span>
              <span>{application.passingYear}</span>
            </div>
            <div className="col-span-1 p-2">
              <span className="font-bold">GPA/CGPA: </span>
              <span>{application.gpa}</span>
            </div>
          </div>
          <div className="md:grid print:grid grid-cols-2 gap-10 ml-3 print:ml-10 md:ml-10">
            <div className="col-span-1 p-2">
              <span className="font-bold">Birth Reg/NID: </span>
              <span>{application.nid}</span>
            </div>
            <div className="col-span-1 p-2">
              <span className="font-bold">Nationality: </span>
              <span>{capitalizeFirstLetter(application.nationality)}</span>
            </div>
          </div>
          <div className="md:grid print:grid grid-cols-2 gap-10 ml-3 print:ml-10 md:ml-10">
            <div className="col-span-1 p-2">
              <span className="font-bold">Course Name: </span>
              <span>{capitalizeFirstLetter(application.course)}</span>
            </div>
            <div className="col-span-1 p-2">
              <span className="font-bold">Course Duration: </span>
              <span>{duration}</span>
            </div>
          </div>
        </div>
        <div className="md:mx-12 lg:mx-20 mt-24 print:mx-20 print:mt-16 md:flex print:flex hidden justify-between print:text-black font-bold">
          <div>
            <div className="w-40 h-0.5 bg-cyan-700"></div>
            <div>Director Signature</div>
            <div>Date:</div>
          </div>
          <div>
            <div className="w-40 h-0.5 bg-cyan-700"></div>
            <div>Student Signature</div>
            <div>Date:</div>
          </div>
        </div>
        <div className="print:text-black text-sm md:ml-20 ml-3 print:ml-20 my-6">
          <p>ভর্তির জন্য প্রয়োজনীয় কাগজ পত্র ও শর্তাবলীঃ</p>
          <p>১. পাসপোর্ট সাইজের ২ কপি রঙিন ছবি</p>
          <p>২. এস.এস.সি/জে.এস.সি মার্কশীটের ফটোকপি (যে কোন একটা)</p>
          <p>৩. এন.আই.ডি/জন্ম নিবন্ধনের ফটোকপি (যে কোন একটা)</p>
          <p>
            ৪. ভর্তি হওয়ার পর, পরবর্তীতে ভর্তি বাতিল করতে চাইলে সে ক্ষেত্র কোন
            টাকা ফেরত দেওয়া হবে না।
          </p>
        </div>
        <div className="footer hidden print:block">
          <p>www.freelancermohon.online</p>
        </div>
        <Image
          src={logo2}
          alt=""
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 -z-50 opacity-10"
        />
      </div>
      <Button
        onClick={handlePrint}
        variant="secondary"
        className="flex gap-3 items-center mx-auto mt-10 print:hidden"
      >
        <IoMdPrint />
        Print
      </Button>
    </div>
  );
}
