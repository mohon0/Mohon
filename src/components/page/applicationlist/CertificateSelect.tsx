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

export default function CertificateSelect({
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
              value="At Office"
              onSelect={() => handleSelectChange("At Office")}
            >
              At Office
            </SelectItem>
            <SelectItem
              value="Pending"
              onSelect={() => handleSelectChange("Pending")}
            >
              Pending
            </SelectItem>
            <SelectItem
              value="Fail"
              onSelect={() => handleSelectChange("Fail")}
            >
              Fail
            </SelectItem>
            <SelectItem
              value="Received"
              onSelect={() => handleSelectChange("Received")}
            >
              Received
            </SelectItem>
            <SelectItem
              value="Course Incomplete"
              onSelect={() => handleSelectChange("Course Incomplete")}
            >
              Course Incomplete
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
