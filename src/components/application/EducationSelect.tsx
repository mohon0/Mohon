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

interface SelectDemoProps {
  onValueChange: (value: string) => void;
  selectedValue: string | undefined;
}

export function EducationSelect({ onValueChange }: SelectDemoProps) {
  const handleSelectChange = (value: string) => {
    onValueChange(value);
  };
  return (
    <Select onValueChange={handleSelectChange}>
      <SelectTrigger className="w-60">
        <SelectValue placeholder="Select Your Education" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Education</SelectLabel>
          <SelectItem value="jsc" onSelect={() => handleSelectChange("jsc")}>
            JSC
          </SelectItem>
          <SelectItem value="ssc" onSelect={() => handleSelectChange("ssc")}>
            SSC
          </SelectItem>
          <SelectItem value="hsc" onSelect={() => handleSelectChange("hsc")}>
            HSC
          </SelectItem>
          <SelectItem
            value="honours"
            onSelect={() => handleSelectChange("honours")}
          >
            Honours
          </SelectItem>
          <SelectItem
            value="masters"
            onSelect={() => handleSelectChange("masters")}
          >
            Masters
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
