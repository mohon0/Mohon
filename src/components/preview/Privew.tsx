import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import logo2 from "@/images/hero/logo2.png";
import logo from "@/images/hero/logo3.png";
import { useFormikContext } from "formik";
import Image from "next/image";
import Model from "../print/Model";

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

export default function Preview() {
  const formik = useFormikContext<SingleApplicationProps>();
  const { values } = formik;

  const dateObject = new Date(values.birthDay);

  const formattedDate = dateObject.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="px-20 cursor-pointer flex items-center justify-center  py-3 rounded-full text-xl font-bold border border-primary-200 hover:text-primary-200 ">
          Preview
        </div>
      </DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Application Preview</DialogTitle>
        </DialogHeader>
        <div className="overflow-y-scroll h-[29rem]">
          <DialogDescription>
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
              <div className="print:w-2/12 md:w-2/12 border">
                <div className="w-full h-32 md:h-48 print:h-32 flex items-center justify-center text-black">
                  Image preview not available
                </div>
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
                  {values.firstName} {values.lastName}
                </div>
              </div>
              <table className=" w-full">
                <Model
                  item1="Father Name"
                  item2="Mother Name"
                  value1={values.fatherName}
                  value2={values.motherName}
                />
                <Model
                  item1="Father's Occupation"
                  item2="Marital Status"
                  value1={values.fatherOccupation}
                  value2={values.maritalStatus}
                />

                <tr className="flex flex-col md:flex-row print:flex-row">
                  <td className="border px-2 print:w-1/2 w-full md:w-1/2 p-1">
                    <span className="font-bold">Date Of Birth: </span>
                    <span className="pl-3">{formattedDate}</span>
                  </td>
                  <td className="border px-2 print:w-1/2 w-full md:w-1/2 p-1">
                    <span className="font-bold">Blood Group: </span>
                    <span className="pl-3">{values.bloodGroup}</span>
                  </td>
                </tr>
                <Model
                  item1="Mobile Number"
                  item2="Guardian Number"
                  value1={values.mobileNumber}
                  value2={values.guardianNumber}
                />
                <Model
                  item1="Gender"
                  item2="Religion"
                  value1={values.gender}
                  value2={values.religion}
                />
                <Model
                  item1="Full Address"
                  item2="District"
                  value1={values.fullAddress}
                  value2={values.district}
                />
                <tr className="flex flex-col md:flex-row print:flex-row">
                  <td className="border px-2 print:w-1/2 w-full md:w-1/2 p-1">
                    <span className="font-bold">Email Address: </span>
                    <span className="pl-3">{values.email}</span>
                  </td>
                  <td className="border px-2 print:w-1/2 w-full md:w-1/2 p-1">
                    <span className="font-bold">Computer: </span>
                    <span className="pl-3">{values.pc}</span>
                  </td>
                </tr>
                <Model
                  item1="Education"
                  item2="Board"
                  value1={values.education}
                  value2={values.board}
                />
                <Model
                  item1="Roll Number"
                  item2="Reg Number"
                  value1={values.rollNumber}
                  value2={values.regNumber}
                />
                <Model
                  item1="Passing Year"
                  item2="GPA/CGPA"
                  value1={values.passingYear}
                  value2={values.gpa}
                />
                <Model
                  item1="Birth Reg/NID"
                  item2="Nationality"
                  value1={values.nid}
                  value2={values.nationality}
                />
                <tr className="flex flex-col md:flex-row print:flex-row">
                  <td className="border px-2 print:w-1/2 w-full md:w-1/2 p-1">
                    <span className="font-bold">Course Name: </span>
                    <span className="pl-3 uppercase">{values.course}</span>
                  </td>
                  <td className="border px-2 print:w-1/2 w-full md:w-1/2 p-1">
                    <span className="font-bold">Duration: </span>
                    <span className="pl-3">{values.duration}</span>
                  </td>
                </tr>
                <tr className="flex flex-col md:flex-row print:flex-row">
                  <td className="border px-2 print:w-1/2 w-full md:w-1/2 p-1">
                    <span className="font-bold">Transaction Id: </span>
                    <span className="pl-3 uppercase">
                      {values.transactionId}
                    </span>
                  </td>
                </tr>
              </table>
              <div className="md:mx-12 lg:mx-10 mt-24  print:mt-16 md:flex print:flex hidden justify-between print:text-black font-bold">
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
            <Image
              src={logo2}
              alt=""
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 -z-50 opacity-10"
            />
            <div className="print:text-black border print:mx-10 md:mx-10 p-2 mt-3 text-sm">
              <div>
                আমি এতদ্বারা অঙ্গীকার করিতেছি যে, আমি প্রতিষ্ঠানের নিয়ম অনুযায়ী
                আমার সন্তান/পোষ্য, এর যাবতীয় ব্যয়ভার এবং আমার সন্তান/পোষ্য
                প্রতিষ্ঠানের এর নিয়ম শৃঙ্খলা ভঙ্গ করিলে বা অন্য কোনো কারণে
                প্রতিষ্ঠানের জন্য ক্ষতিকর বিবেচিত হইলে কতৃপক্ষের যে কোন সিধান্ত
                মানিয়া লইতে বাধ্য থাকিব।
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
          </DialogDescription>
        </div>
      </DialogContent>
    </Dialog>
  );
}
