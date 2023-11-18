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

export function PassingYear({ onValueChange }: SelectDemoProps) {
  const handleSelectChange = (value: string) => {
    onValueChange(value);
  };
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1989 }, (_, index) =>
    (currentYear - index).toString()
  );

  return (
    <Select onValueChange={handleSelectChange}>
      <SelectTrigger className="w-60">
        <SelectValue placeholder="Passing Year" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Passing Year</SelectLabel>
          {years.map((year) => (
            <SelectItem
              key={year}
              value={year}
              onSelect={() => handleSelectChange(year)}
            >
              {year}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
