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

// interface SelectDemoProps {
//   onValueChange: (value: string) => void;
//   selectedValue: string | undefined;
// }

export function Board() {
  const [field, meta, helpers] = useField("board");

  const handleSelectChange = (value: string) => {
    helpers.setValue(value);
    // onValueChange(value);
  };

  const educationBoards = [
    "Dhaka",
    "Chittagong",
    "Rajshahi",
    "Khulna",
    "Barisal",
    "Sylhet",
    "Comilla",
    "Jessore",
    "Dinajpur",
    "Madrasah",
    "Technical",
    "DIBS(Dhaka)",
  ];

  return (
    <div className={meta.touched && meta.error ? "error" : ""}>
      {/* Display error message if there is an error */}
      {meta.touched && meta.error && (
        <div className="text-red-500">{meta.error}</div>
      )}

      <Select onValueChange={handleSelectChange} value={field.value}>
        <SelectTrigger className="w-60">
          <SelectValue placeholder="Select Your Education Board" />
        </SelectTrigger>
        <SelectContent className="bg-gray-900 text-slate-200">
          <SelectGroup>
            <SelectLabel>Education Board</SelectLabel>

            {educationBoards.map((board) => (
              <SelectItem
                key={board}
                value={board}
                onSelect={() => handleSelectChange(board)}
              >
                {board}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
