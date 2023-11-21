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

export function ActionSelect({ onValueChange }: DurationSelectProps) {
  const handleSelectChange = (value: string) => {
    onValueChange(value);
  };

  return (
    <Select onValueChange={handleSelectChange}>
      <SelectTrigger className="w-32">
        <SelectValue placeholder="Action" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Course Duration</SelectLabel>
          <SelectItem
            value="Approve"
            onSelect={() => handleSelectChange("free")}
          >
            Approve
          </SelectItem>
          <SelectItem
            value="Pending"
            onSelect={() => handleSelectChange("Pending")}
          >
            Pending
          </SelectItem>
          <SelectItem
            value="Reject"
            onSelect={() => handleSelectChange("Reject")}
          >
            Reject
          </SelectItem>
          <SelectItem
            value="Delete"
            onSelect={() => handleSelectChange("Delete")}
          >
            Delete
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
