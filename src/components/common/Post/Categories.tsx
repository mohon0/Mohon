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
import { Options } from "./Options";

interface MyTextInputProps {
  name: string;
  type?: string;
  value?: string;
}

export default function Categories({ value, ...props }: MyTextInputProps) {
  const [field, meta, helpers] = useField("categories");

  const handleSelectChange = (value: string) => {
    helpers.setValue(value);
  };
  const sortedOptions = Options.sort((a, b) => a.localeCompare(b));
  return (
    <div className={meta.touched && meta.error ? "error" : ""}>
      <Select
        onValueChange={handleSelectChange}
        defaultValue="Value"
        {...field}
        {...props}
      >
        <SelectTrigger className="w-60">
          <SelectValue placeholder="Select Your Post Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Categories</SelectLabel>

            {sortedOptions.map((categories) => (
              <SelectItem
                key={categories}
                value={categories.toLowerCase().replace(/\s+/g, "_")}
                onSelect={() => handleSelectChange(categories)}
              >
                {categories}
              </SelectItem>
            ))}
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
