import Print from "../print/Print";

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

export default function SingleApplication({
  application,
}: SingleApplicationProps) {
  return (
    <div className="mx-2 lg:mx-20 my-32 print:text-black print:p-4 print:my-10">
      <Print application={application} />
    </div>
  );
}
