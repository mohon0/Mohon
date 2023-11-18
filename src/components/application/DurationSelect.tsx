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

interface DurationSelectProps {
  onValueChange: (value: string) => void;
  selectedValue: string | undefined;
}

export function DurationSelect({ onValueChange }: DurationSelectProps) {
  const handleSelectChange = (value: string) => {
    onValueChange(value);
  };

  return (
    <Select onValueChange={handleSelectChange}>
      <SelectTrigger className="w-60">
        <SelectValue placeholder="Course Duration" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Course Duration</SelectLabel>
          <SelectItem value="free" onSelect={() => handleSelectChange("free")}>
            Free(conditions)
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
  );
}
