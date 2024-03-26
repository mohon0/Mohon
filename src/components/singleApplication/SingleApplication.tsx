import Print from "../print/Print";
import { SingleApplicationUserType } from "../type/ApplicationType";

export default function SingleApplication({
  application,
}: SingleApplicationUserType) {
  return (
    <div className="mx-2 print:my-10 print:p-4 print:text-black lg:mx-20">
      <Print application={application} />
    </div>
  );
}
