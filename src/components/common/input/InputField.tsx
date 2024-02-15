import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useField } from "formik";

interface FormInputProps {
  name: string;
  type: string;
  id?: string;
  placeholder?: string;
  label: string;
  readOnly?: boolean;
}

const InputField: React.FC<FormInputProps> = ({
  type,
  placeholder,
  id,
  label,
  readOnly,
  ...props
}) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Input
        {...field}
        {...props}
        type={type}
        placeholder={placeholder}
        readOnly={readOnly}
      />

      {meta.touched && meta.error ? (
        <p className="text-sm text-red-500">{meta.error}</p>
      ) : null}
    </div>
  );
};

export default InputField;
