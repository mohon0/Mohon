import { useField } from "formik";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface MyTextInputProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  id?: string;
}

export const MyTextInput: React.FC<MyTextInputProps> = ({
  label,
  id,
  ...props
}) => {
  const [field, meta] = useField(props);
  return (
    <div className="flex flex-col col-span-1">
      <Label className="mb-1.5" htmlFor={id || props.name}>
        {label}
      </Label>

      <Input
        {...field}
        {...props}
      />

      {meta.touched && meta.error ? (
        <div className="text-red-600 justify-end flex">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default MyTextInput;
