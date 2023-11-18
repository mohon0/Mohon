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

export function SelectDemo({ onValueChange }: SelectDemoProps) {
  const handleSelectChange = (value: string) => {
    onValueChange(value);
  };

  return (
    <Select onValueChange={handleSelectChange}>
      <SelectTrigger className="w-60">
        <SelectValue placeholder="Select your gender" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Gender</SelectLabel>
          <SelectItem value="male" onSelect={() => handleSelectChange("male")}>
            Male
          </SelectItem>
          <SelectItem
            value="female"
            onSelect={() => handleSelectChange("female")}
          >
            Female
          </SelectItem>
          <SelectItem
            value="other"
            onSelect={() => handleSelectChange("other")}
          >
            Other
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
