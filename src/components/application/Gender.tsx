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

export function Gender() {
  const [field, meta, helpers] = useField("gender");

  const handleSelectChange = (value: string) => {
    helpers.setValue(value);
  };

  return (
    <div className={meta.touched && meta.error ? "error" : ""}>
      <Select onValueChange={handleSelectChange} value={field.value}>
        <SelectTrigger className="w-60">
          <SelectValue placeholder="Select your gender" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Gender</SelectLabel>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      {meta.touched && meta.error && (
        <div className="text-red-500">{meta.error}</div>
      )}
    </div>
  );
}
