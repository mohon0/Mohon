import Image from "next/image";
import Header from "./Header";
import Model from "./Model";

interface SingleApplicationProps {
  application: {
    firstName: string;
    lastName: string;
    fatherName: string;
    motherName: string;
    dateOfBirth: string;
    bloodGroups: string;
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
  };
}

export default function SingleApplication({
  application,
}: SingleApplicationProps) {
  console.log(application);
  return (
    <div className="mx-2 lg:mx-20 my-32">
      <div className="lg:grid lg:grid-cols-12 gap-10">
        <div className=" lg:col-span-9 flex items-center gap-6 flex-col justify-center">
          <Header />
        </div>
        <div className="col-span-3 w-48 h-52 border flex items-center justify-center mx-auto mt-10 lg:mt-0 border-gray-600">
          <Image
            src={application.image}
            alt=""
            width={300}
            height={300}
            className="h-52 w-48 object-cover"
          />
        </div>
      </div>
      <div className="mt-16 lg:text-xl flex flex-col gap-4 md:ml-12 lg:ml-20">
        <Model
          name1="Student First Name"
          name2="Student Last Name"
          value1={application.firstName}
          value2={application.lastName}
        />
        <Model
          name1="Father's Name"
          name2="Mother's Name"
          value1={application.fatherName}
          value2={application.motherName}
        />
        <Model
          name1="Date Of Birth"
          name2="Blood Group"
          value1={application.dateOfBirth}
          value2={application.bloodGroups}
        />
        <Model
          name1="Mobile Number"
          name2="Guardian Number"
          value1={application.mobileNumber}
          value2={application.guardianNumber}
        />
        <Model
          name1="Gender"
          name2="Religion"
          value1={application.gender}
          value2={application.religion}
        />
        <Model
          name1="Full Address"
          name2="District"
          value1={application.fullAddress}
          value2={application.district}
        />
        <Model
          name1="Education"
          name2="Board"
          value1={application.education}
          value2={application.board}
        />
        <Model
          name1="Roll Number"
          name2="Reg. Number"
          value1={application.rollNumber}
          value2={application.regNumber}
        />
        <Model
          name1="Passing Year"
          name2="GPA/CGPA"
          value1={application.passingYear}
          value2={application.gpa}
        />
        <Model
          name1="Birth Reg/NID"
          name2="Nationality"
          value1={application.nid}
          value2={application.nationality}
        />
        <Model
          name1="Course Name"
          name2="Course Durations"
          value1={application.course}
          value2={application.duration}
        />
      </div>
      <div className="md:mx-12 lg:mx-20 mt-24 flex justify-between">
        <div>
          <div className="w-40 h-0.5 bg-primary-200"></div>
          <div>Director Signature</div>
          <div>Date:</div>
        </div>
        <div>
          <div className="w-40 h-0.5 bg-primary-200"></div>
          <div>Student Signature</div>
          <div>Date:</div>
        </div>
      </div>
    </div>
  );
}
