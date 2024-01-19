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
import { useEffect, useState } from "react";

export function DurationSelect() {
  const [field, meta, helpers] = useField("duration");
  const [data, setData] = useState("");

  const handleSelectChange = (value: string) => {
    helpers.setValue(value);
  };

  useEffect(() => {
    const apiUrl = `api/duration`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setData(data.button);
      })
      .catch(() => {
        console.log("error");
      });
  }, []);

  return (
    <div className={meta.touched && meta.error ? "error" : ""}>
      <Select onValueChange={handleSelectChange} value={field.value}>
        <SelectTrigger className="w-60">
          <SelectValue placeholder="Course Duration" />
        </SelectTrigger>
        <SelectContent className="bg-gray-900 text-slate-200">
          <SelectGroup>
            <SelectLabel>Course Duration</SelectLabel>
            {data === "On" && (
              <SelectItem
                value="free"
                onSelect={() => handleSelectChange("free")}
              >
                Free (conditions apply)
              </SelectItem>
            )}
            <SelectItem
              value="1 month"
              onSelect={() => handleSelectChange("1 month")}
            >
              1 Month
            </SelectItem>
            <SelectItem
              value="3 month"
              onSelect={() => handleSelectChange("3 month")}
            >
              3 Month
            </SelectItem>
            <SelectItem
              value="6 month"
              onSelect={() => handleSelectChange("6 month")}
            >
              6 Month
            </SelectItem>
            <SelectItem
              value="1 year"
              onSelect={() => handleSelectChange("1 year")}
            >
              1 Year
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
