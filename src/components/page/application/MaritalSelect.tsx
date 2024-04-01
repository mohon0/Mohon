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

export function MaritelSelect() {
  const [field, meta, helpers] = useField("maritalStatus");

  const handleSelectChange = (value: string) => {
    helpers.setValue(value);
  };

  return (
    <div className={meta.touched && meta.error ? "error" : ""}>
      <Select onValueChange={handleSelectChange} value={field.value}>
        <SelectTrigger className="w-60">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Marital Status</SelectLabel>

            <SelectItem
              value="Single"
              onSelect={() => handleSelectChange("Single")}
            >
              Single
            </SelectItem>
            <SelectItem
              value="Married"
              onSelect={() => handleSelectChange("Married")}
            >
              Married
            </SelectItem>
            <SelectItem
              value="Widowed"
              onSelect={() => handleSelectChange("Widowed")}
            >
              Widowed
            </SelectItem>
            <SelectItem
              value="Divorced"
              onSelect={() => handleSelectChange("Divorced")}
            >
              Divorced
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      {/* Display error message if there is an error */}
      {meta.touched && meta.error && (
        <div className="text-red-500">{meta.error}</div>
      )}
    </div>
  );
}
