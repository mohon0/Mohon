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
  const componentRef = useRef<HTMLDivElement | null>(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <div>
      <div ref={componentRef} className="hidden print:block">
        <div className="print:flex flex items-center justify-center gap-6 px-10 py-8 bg-green-700">
          <div className="print:w-2/12 w-2/12 ">
            <Image src={logo} alt="" className="w-32 h-32" />
          </div>
          <div className="print:w-8/12 w-8/12 flex items-center justify-center flex-col">
            <div className="text-black text-center text-3xl font-bold">
              Best computer training center
            </div>
            <div>Rofi Tower, 4th Floor, Paira chattor, Jhenaidah</div>
            <div>
              <span className="font-bold">Mobile: </span> 01989491248
            </div>
            <div>
              <span className="font-bold">Email: </span>{" "}
              bestcomputer.jhenaidah@gmail.com
            </div>
          </div>
          <div className="print:w-2/12 w-21 ring w-2/12  ">
            <Image
              src={application.image}
              alt=""
              width={200}
              height={200}
              className="w-full h-32 object-cover"
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Button
            variant="secondary"
            size="lg"
            className="mx-auto my-8 bg-green-700 text-xl font-bold text-white"
          >
            Admission Form
          </Button>
        </div>
        <div className="relative mx-10 print:text-black ">
          <div className="grid grid-cols-2 gap-10 ml-10">
            <div className="col-span-1 p-2">
              <span className="font-bold">Student First Name: </span>
              <span>{application.firstName}</span>
            </div>
            <div className="col-span-1 p-2">
              <span className="font-bold">Student Last Name: </span>
              <span>{application.lastName}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10 ml-10">
            <div className="col-span-1 p-2">
              <span className="font-bold">Father Name: </span>
              <span>{application.fatherName}</span>
            </div>
            <div className="col-span-1 p-2">
              <span className="font-bold">Mother Name: </span>
              <span>{application.motherName}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10 ml-10">
            <div className="col-span-1 p-2">
              <span className="font-bold">Date Of Birth: </span>
              <span>{application.birthDay}</span>
            </div>
            <div className="col-span-1 p-2">
              <span className="font-bold">Blood Group: </span>
              <span>{application.bloodGroup}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10 ml-10">
            <div className="col-span-1 p-2">
              <span className="font-bold">Mobile Number: </span>
              <span>{application.mobileNumber}</span>
            </div>
            <div className="col-span-1 p-2">
              <span className="font-bold">Guardian Number: </span>
              <span>{application.guardianNumber}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10 ml-10">
            <div className="col-span-1 p-2">
              <span className="font-bold">Gender: </span>
              <span>{application.gender}</span>
            </div>
            <div className="col-span-1 p-2">
              <span className="font-bold">Religion: </span>
              <span>{application.religion}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10 ml-10">
            <div className="col-span-1 p-2">
              <span className="font-bold">Full Address: </span>
              <span>{application.fullAddress}</span>
            </div>
            <div className="col-span-1 p-2">
              <span className="font-bold">District: </span>
              <span>{application.district}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10 ml-10">
            <div className="col-span-1 p-2">
              <span className="font-bold">Email Address: </span>
              <span>{application.email}</span>
            </div>
            <div className="col-span-1 p-2">
              <span className="font-bold">Computer: </span>
              <span>{application.pc}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10 ml-10">
            <div className="col-span-1 p-2">
              <span className="font-bold">Education: </span>
              <span>{application.education}</span>
            </div>
            <div className="col-span-1 p-2">
              <span className="font-bold">Board: </span>
              <span>{application.board}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10 ml-10">
            <div className="col-span-1 p-2">
              <span className="font-bold">Roll Number: </span>
              <span>{application.rollNumber}</span>
            </div>
            <div className="col-span-1 p-2">
              <span className="font-bold">Reg Number: </span>
              <span>{application.regNumber}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10 ml-10">
            <div className="col-span-1 p-2">
              <span className="font-bold">Passing Year: </span>
              <span>{application.passingYear}</span>
            </div>
            <div className="col-span-1 p-2">
              <span className="font-bold">GPA/CGPA: </span>
              <span>{application.gpa}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10 ml-10">
            <div className="col-span-1 p-2">
              <span className="font-bold">Birth Reg/NID: </span>
              <span>{application.nid}</span>
            </div>
            <div className="col-span-1 p-2">
              <span className="font-bold">Nationality: </span>
              <span>{application.nationality}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10 ml-10">
            <div className="col-span-1 p-2">
              <span className="font-bold">Course Name: </span>
              <span>{application.course}</span>
            </div>
            <div className="col-span-1 p-2">
              <span className="font-bold">Course Duration: </span>
              <span>{application.duration}</span>
            </div>
          </div>
        </div>
        <div className="md:mx-12 lg:mx-20 mt-24 print:mx-20 print:mt-16 flex justify-between print:text-black font-bold">
          <div>
            <div className="w-40 h-0.5 bg-green-700"></div>
            <div>Director Signature</div>
            <div>Date:</div>
          </div>
          <div>
            <div className="w-40 h-0.5 bg-green-700"></div>
            <div>Student Signature</div>
            <div>Date:</div>
          </div>
        </div>
        <div className="flex items-center justify-center mt-20 text-gray-600">
          www.freelancermohon.com
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
