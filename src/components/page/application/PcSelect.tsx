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

export function PcSelect() {
  const [field, meta, helpers] = useField("pc");

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
            <SelectLabel>Select</SelectLabel>
            <SelectItem
              value="laptop"
              onSelect={() => handleSelectChange("laptop")}
            >
              Laptop
            </SelectItem>
            <SelectItem value="pc" onSelect={() => handleSelectChange("pc")}>
              PC
            </SelectItem>
            <SelectItem value="no" onSelect={() => handleSelectChange("no")}>
              No
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      {meta.touched && meta.error && (
        <div className="text-red-500">{meta.error}</div>
      )}
    </div>
  );
}
