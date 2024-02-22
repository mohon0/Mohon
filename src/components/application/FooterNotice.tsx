import { useFormikContext } from "formik";

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

export default function FooterNotice() {
  const formik = useFormikContext<SingleApplicationProps>();
  const { values } = formik;

  return (
    <div className="border p-2 rounded-sm border-primary">
      {values.duration === "1 month" ? (
        <p>
          ১০০/= টাকা আবেদন ফি সহ- কোর্স ফি বিকাশ পেমেন্ট করে, Transaction ID
          লিখুন। তারপর Submit করুন। অবশ্যই পেমেন্ট রিসিট মূল ফরম এর সাথে সংযুক্ত
          করতে হবে
        </p>
      ) : (
        <p>
          ১০০/= টাকা আবেদন ফি বিকাশ পেমেন্ট করে, Transaction ID লিখুন। তারপর
          Submit করুন। অবশ্যই পেমেন্ট রিসিট মূল ফরম এর সাথে সংযুক্ত করতে হবে
        </p>
      )}
    </div>
  );
}
