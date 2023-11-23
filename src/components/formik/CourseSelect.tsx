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

export function CourseSelect({ onValueChange }: SelectDemoProps) {
  const [field, meta, helpers] = useField("course");

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
          <SelectValue placeholder="Select Your Course" />
        </SelectTrigger>
        <SelectContent className="bg-gray-900 text-slate-200">
          <SelectGroup>
            <SelectLabel>Course</SelectLabel>
            <SelectItem
              value="office application"
              onSelect={() => handleSelectChange("office application")}
            >
              Office Application
            </SelectItem>
            <SelectItem
              value="database programming"
              onSelect={() => handleSelectChange("database programming")}
            >
              Database Programming
            </SelectItem>
            <SelectItem
              value="digital marketing"
              onSelect={() => handleSelectChange("digital marketing")}
            >
              Digital Marketing
            </SelectItem>
            <SelectItem
              value="graphics design"
              onSelect={() => handleSelectChange("graphics design")}
            >
              Graphics Design
            </SelectItem>
            <SelectItem
              value="web development"
              onSelect={() => handleSelectChange("web development")}
            >
              Web Design & Development
            </SelectItem>
            <SelectItem
              value="video editing"
              onSelect={() => handleSelectChange("video editing")}
            >
              Video Editing
            </SelectItem>
            <SelectItem
              value="ethical hacking"
              onSelect={() => handleSelectChange("ethical hacking")}
            >
              Ethical Hacking
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
