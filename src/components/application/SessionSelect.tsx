import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useField } from "formik";

export default function SessionSelect() {
  const [field, meta, helpers] = useField("session");

  const handleSelectChange = (value: string) => {
    helpers.setValue(value);
  };

  // Function to generate an array of session options from 1998 to the current year
  const generateSessionOptions = () => {
    const currentYear = new Date().getFullYear();
    const options = [];

    for (let year = 1998; year <= currentYear; year++) {
      options.push(`${year} Jan-June`, `${year} July-Dec`);
    }

    return options;
  };

  return (
    <div className={meta.touched && meta.error ? "error" : ""}>
      <Select onValueChange={handleSelectChange} value={field.value}>
        <SelectTrigger className="w-60">
          <SelectValue placeholder="Select your session" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Session</SelectLabel>
            {/* Render session options dynamically */}
            {generateSessionOptions().map((option, index) => (
              <SelectItem key={index} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {meta.touched && meta.error && (
        <div className="text-red-500">{meta.error}</div>
      )}
    </div>
  );
}
