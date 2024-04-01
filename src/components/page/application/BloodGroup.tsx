"use client";
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

interface SelectDemoProps {
  onValueChange: (value: string) => void;
  selectedValue: string | undefined;
}

export function BloodGroup({ onValueChange }: SelectDemoProps) {
  const [field, meta, helpers] = useField("bloodGroup");

  const handleSelectChange = (value: string) => {
    helpers.setValue(value);
  };

  return (
    <div className={meta.touched && meta.error ? "error" : ""}>
      {/* Display error message if there is an error */}
      {meta.touched && meta.error && (
        <div className="text-red-500">{meta.error}</div>
      )}

      <Select onValueChange={handleSelectChange} value={field.value}>
        <SelectTrigger className="w-60">
          <SelectValue placeholder="Select Your Blood Group" />
        </SelectTrigger>
        <SelectContent className="bg-gray-900 text-slate-200">
          <SelectGroup>
            <SelectLabel>Blood Group</SelectLabel>
            <SelectItem value="A+" onSelect={() => handleSelectChange("A+")}>
              A+
            </SelectItem>
            <SelectItem value="A-" onSelect={() => handleSelectChange("A-")}>
              A-
            </SelectItem>
            <SelectItem value="B+" onSelect={() => handleSelectChange("B+")}>
              B+
            </SelectItem>
            <SelectItem value="B-" onSelect={() => handleSelectChange("B-")}>
              B-
            </SelectItem>
            <SelectItem value="AB+" onSelect={() => handleSelectChange("AB+")}>
              AB+
            </SelectItem>
            <SelectItem value="AB-" onSelect={() => handleSelectChange("AB-")}>
              AB-
            </SelectItem>
            <SelectItem value="O+" onSelect={() => handleSelectChange("O+")}>
              O+
            </SelectItem>
            <SelectItem value="O-" onSelect={() => handleSelectChange("O-")}>
              O-
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
