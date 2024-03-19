import { useFormikContext } from "formik";
import { SingleApplicationType } from "../type/ApplicationType";

export default function FooterNotice() {
  const formik = useFormikContext<SingleApplicationType>();
  const { values } = formik;

  return (
    <div className="rounded-sm border border-primary p-2">
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
