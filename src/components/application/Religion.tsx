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

export function Religion() {
  const [field, meta, helpers] = useField("religion");

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
          <SelectValue placeholder="Select Your Religion" />
        </SelectTrigger>
        <SelectContent className="bg-gray-900 text-slate-200">
          <SelectGroup>
            <SelectLabel>Religion</SelectLabel>

            <SelectItem
              value="Islam"
              onSelect={() => handleSelectChange("Islam")}
            >
              Islam
            </SelectItem>
            <SelectItem
              value="Hinduism"
              onSelect={() => handleSelectChange("Hinduism")}
            >
              Hinduism
            </SelectItem>
            <SelectItem
              value="Christianity"
              onSelect={() => handleSelectChange("Christianity")}
            >
              Christianity
            </SelectItem>
            <SelectItem
              value="Buddhism"
              onSelect={() => handleSelectChange("Buddhism")}
            >
              Buddhism
            </SelectItem>
            <SelectItem
              value="Judaism"
              onSelect={() => handleSelectChange("Judaism")}
            >
              Judaism
            </SelectItem>
            <SelectItem
              value="Sikhism"
              onSelect={() => handleSelectChange("Sikhism")}
            >
              Sikhism
            </SelectItem>
            <SelectItem
              value="Jainism"
              onSelect={() => handleSelectChange("Jainism")}
            >
              Jainism
            </SelectItem>
            <SelectItem
              value="Bahá'í Faith"
              onSelect={() => handleSelectChange("Bahá'í Faith")}
            >
              Bahá&#39;í Faith
            </SelectItem>
            <SelectItem
              value="Shinto"
              onSelect={() => handleSelectChange("Shinto")}
            >
              Shinto
            </SelectItem>
            <SelectItem
              value="Others"
              onSelect={() => handleSelectChange("Other")}
            >
              Other
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
