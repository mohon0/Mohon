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

export function CourseSelect({ onValueChange }: SelectDemoProps) {
  const handleSelectChange = (value: string) => {
    onValueChange(value);
  };

  return (
    <Select onValueChange={handleSelectChange}>
      <SelectTrigger className="w-60">
        <SelectValue placeholder="Select Your Course" />
      </SelectTrigger>
      <SelectContent>
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
  );
}
