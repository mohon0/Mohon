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

  Value: string;
}

export default function ActionSelect({
  onValueChange,

  Value,
}: DurationSelectProps) {
  const handleSelectChange = (value: string) => {
    onValueChange(value);
  };

  return (
    <>
      <Select onValueChange={handleSelectChange} defaultValue={Value}>
        <SelectTrigger>
          <SelectValue placeholder="Action" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Action</SelectLabel>
            <SelectItem
              value="Approved"
              onSelect={() => handleSelectChange("Approved")}
            >
              Approved
            </SelectItem>
            <SelectItem
              value="Pending"
              onSelect={() => handleSelectChange("Pending")}
            >
              Pending
            </SelectItem>
            <SelectItem
              value="Rejected"
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
    </>
  );
}
