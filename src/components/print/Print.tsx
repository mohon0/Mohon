"use client";
import logo2 from "@/images/hero/logo2.png";
import logo from "@/images/hero/logo3.png";
import Image from "next/image";
import { useRef } from "react";
import { IoMdPrint } from "react-icons/io";
import { useReactToPrint } from "react-to-print";
import { Button } from "../ui/button";
import Model from "./Model";
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
    transactionId: string;
    fatherOccupation: string;
    maritalStatus: string;
  };
}

export default function Print({ application }: SingleApplicationProps) {
  const duration =
    application && application.duration === "free"
      ? "Free (conditions applied)"
      : application && application.duration;

  const componentRef = useRef<HTMLDivElement | null>(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <div ref={componentRef} className="">
        <div className="print:flex flex flex-col print:flex-row md:flex-row items-center justify-center gap-6 print:px-10 md:px-10 px-2 print:py-4 py-2 md:py-8 bg-cyan-500">
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
        <div className="h-0.5 w-full bg-black mt-2"></div>
        <div className="flex items-center justify-center">
          <Button
            variant="secondary"
            size="lg"
            className="mx-auto my-6 bg-cyan-700 text-xl font-bold text-white"
          >
            Admission Form
          </Button>
        </div>
        <div className="hidden print:flex items-center gap-3 absolute top-48 left-10">
          <div className="text-black font-bold">SL No: </div>
          <div className="border w-20 h-7"></div>
        </div>
        <div className="print:text-black print:mx-10 flex flex-col ">
          <div className=" border-x border-t w-full px-2 py-1 flex gap-3 items-center">
            <div className="font-bold">Student Full Name:</div>
            <div className=" uppercase">
              {application.firstName} {application.lastName}
            </div>
          </div>
          <table className=" w-full">
            <Model
              item1="Father Name"
              item2="Mother Name"
              value1={application.fatherName}
              value2={application.motherName}
            />
            <Model
              item1="Father's Occupation"
              item2="Marital Status"
              value1={application.fatherOccupation}
              value2={application.maritalStatus}
            />
            <Model
              item1="Date Of Birth"
              item2="Blood Group"
              value1={application.birthDay}
              value2={application.bloodGroup}
            />
            <Model
              item1="Mobile Number"
              item2="Guardian Number"
              value1={application.mobileNumber}
              value2={application.guardianNumber}
            />
            <Model
              item1="Gender"
              item2="Religion"
              value1={application.gender}
              value2={application.religion}
            />
            <Model
              item1="Full Address"
              item2="District"
              value1={application.fullAddress}
              value2={application.district}
            />
            <tr className="flex flex-col md:flex-row print:flex-row">
              <td className="border px-2 print:w-1/2 w-full md:w-1/2 p-1">
                <span className="font-bold">Email Address: </span>
                <span className="pl-3">{application.email}</span>
              </td>
              <td className="border px-2 print:w-1/2 w-full md:w-1/2 p-1">
                <span className="font-bold">Computer: </span>
                <span className="pl-3">{application.pc}</span>
              </td>
            </tr>
            <Model
              item1="Education"
              item2="Board"
              value1={application.education}
              value2={application.board}
            />
            <Model
              item1="Roll Number"
              item2="Reg Number"
              value1={application.rollNumber}
              value2={application.regNumber}
            />
            <Model
              item1="Passing Year"
              item2="GPA/CGPA"
              value1={application.passingYear}
              value2={application.gpa}
            />
            <Model
              item1="Birth Reg/NID"
              item2="Nationality"
              value1={application.nid}
              value2={application.nationality}
            />
            <tr className="flex flex-col md:flex-row print:flex-row">
              <td className="border px-2 print:w-1/2 w-full md:w-1/2 p-1">
                <span className="font-bold">Course Name: </span>
                <span className="pl-3 uppercase">{application.course}</span>
              </td>
              <td className="border px-2 print:w-1/2 w-full md:w-1/2 p-1">
                <span className="font-bold">Duration: </span>
                <span className="pl-3">{duration}</span>
              </td>
            </tr>
            <tr className="flex flex-col md:flex-row print:flex-row">
              <td className="border px-2 print:w-1/2 w-full md:w-1/2 p-1">
                <span className="font-bold">Transaction Id: </span>
                <span className="pl-3 uppercase">
                  {application.transactionId}
                </span>
              </td>
            </tr>
          </table>
          <div className="md:mx-12 lg:mx-10 mt-24  print:mt-10 md:flex print:flex hidden justify-between print:text-black font-bold">
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
        </div>
        <div className="footer hidden print:block">
          <p>www.freelancermohon.online</p>
        </div>

        <Image
          src={logo2}
          alt=""
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 -z-50 opacity-10"
        />
        <div className="print:text-black border print:mx-10 md:mx-10 p-2 mt-3 text-sm">
          <div>
            আমি এতদ্বারা অঙ্গীকার করিতেছি যে, আমি প্রতিষ্ঠানের নিয়ম অনুযায়ী আমার
            সন্তান/পোষ্য, এর যাবতীয় ব্যয়ভার এবং আমার সন্তান/পোষ্য প্রতিষ্ঠানের
            এর নিয়ম শৃঙ্খলা ভঙ্গ করিলে বা অন্য কোনো কারণে প্রতিষ্ঠানের জন্য
            ক্ষতিকর বিবেচিত হইলে কতৃপক্ষের যে কোন সিধান্ত মানিয়া লইতে বাধ্য
            থাকিব।
          </div>
        </div>
        <div className="md:mx-10 print:mx-10 flex flex-col md:flex-row print:flex-row gap-8 md:gap-0 print:gap-0 justify-between items-end">
          <div className="print:text-black border p-2 w-fit mt-2 text-sm">
            <p className="font-bold underline">
              ভর্তির জন্য প্রয়োজনীয় কাগজ পত্র ও শর্তাবলীঃ
            </p>
            <p>১. পাসপোর্ট সাইজের ২ কপি রঙিন ছবি</p>
            <p>২. এস.এস.সি/জে.এস.সি মার্কশীটের ফটোকপি (যে কোন একটা)</p>
            <p>৩. এন.আই.ডি/জন্ম নিবন্ধনের ফটোকপি (যে কোন একটা)</p>
            <p>
              ৪. ভর্তি হওয়ার পর, পরবর্তীতে ভর্তি বাতিল করতে চাইলে সে <br />{" "}
              ক্ষেত্র কোন টাকা ফেরত দেওয়া হবে না।
            </p>
          </div>
          <div className="print:text-black">
            <div className="w-40 h-0.5 bg-cyan-700"></div>
            <div>Guardian Signature</div>
            <div>Date:</div>
          </div>
        </div>
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
