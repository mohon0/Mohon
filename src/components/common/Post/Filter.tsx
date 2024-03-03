import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Options } from "./Options";
interface FilterProps {
  onCategoryChange: (category: string) => void;
}

export default function Filter({ onCategoryChange }: FilterProps) {
  const handleSelectChange = (value: string) => {
    onCategoryChange(value);
  };

  // Sort the Options array alphabetically
  const sortedOptions = Options.sort((a, b) => a.localeCompare(b));

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="categories">Filter:</label>
      <Select onValueChange={handleSelectChange} defaultValue="all">
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Select Your Post Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Categories</SelectLabel>
            <SelectItem value="all">All</SelectItem>
            {sortedOptions.map((category) => (
              <SelectItem
                key={category}
                value={category.toLowerCase().replace(/\s+/g, "_")}
                onSelect={() => handleSelectChange(category)}
              >
                {category}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
