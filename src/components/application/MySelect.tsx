import { useField } from "formik";
import { ReactNode } from "react";
import { Label } from "../ui/label";

interface MySelectProps {
  label: string;
  name: string;
  id?: string;
  children: ReactNode;
}

const MySelect: React.FC<MySelectProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="flex  items-center gap-10">
      <Label htmlFor={props.id || props.name}>{label}</Label>
      <select {...field} {...props} className="bg-gray-800 py-2 px-8 rounded" />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default MySelect;
