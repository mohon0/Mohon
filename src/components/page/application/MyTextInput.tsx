import { useField } from "formik";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

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
    <div className="col-span-1 flex flex-col">
      <Label className="mb-1.5" htmlFor={id || props.name}>
        {label}
      </Label>

      <Input {...field} {...props} />

      {meta.touched && meta.error ? (
        <div className="flex justify-end text-red-600">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default MyTextInput;
