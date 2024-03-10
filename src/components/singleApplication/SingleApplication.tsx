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
    transactionId: string;
    fatherOccupation: string;
    maritalStatus: string;
    user: {
      email: string;
      phoneNumber: string;
    };
  };
}

export default function SingleApplication({
  application,
}: SingleApplicationProps) {
  return (
    <div className="mx-2 my-32 print:my-10 print:p-4 print:text-black lg:mx-20">
      <Print application={application} />
    </div>
  );
}
