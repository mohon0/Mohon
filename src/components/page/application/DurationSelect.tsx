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
import { FetchDuration } from "../../fetch/get/application/FetchDuration";

export function DurationSelect() {
  const [field, meta, helpers] = useField("duration");

  const handleSelectChange = (value: string) => {
    helpers.setValue(value);
  };

  const { isLoading, data, isError } = FetchDuration();

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        "Error loading data"
      ) : (
        <div className={meta.touched && meta.error ? "error" : ""}>
          <Select onValueChange={handleSelectChange} value={field.value}>
            <SelectTrigger className="w-60">
              <SelectValue placeholder="Course Duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Course Duration</SelectLabel>
                {data.button === "On" && (
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
      )}
    </>
  );
}
