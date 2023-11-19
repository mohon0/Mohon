import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface SelectDemoProps {
  onDayValueChange: (value: string) => void;
  onMonthValueChange: (value: string) => void;
  onYearValueChange: (value: string) => void;
  dayValue: string | undefined;
  monthValue: string | undefined;
  yearValue: string | undefined;
}

export default function DatePicker({
  onDayValueChange,
  onMonthValueChange,
  onYearValueChange,
}: SelectDemoProps) {
  const handleDayChange = (value: string) => {
    onDayValueChange(value);
  };
  const handleMonthChange = (value: string) => {
    onMonthValueChange(value);
  };
  const handleYearChange = (value: string) => {
    onYearValueChange(value);
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="grid gap-2">
        <Select onValueChange={handleDayChange}>
          <SelectTrigger id="day">
            <SelectValue placeholder="Day" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 31 }, (_, i) => (
              <SelectItem
                key={i}
                value={`${i + 1}`}
                onSelect={() => handleDayChange(`${i + 1}`)}
              >
                {i + 1}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Select onValueChange={handleMonthChange}>
          <SelectTrigger id="month">
            <SelectValue placeholder="Month" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 12 }, (_, i) => (
              <SelectItem
                key={i}
                value={`${i + 1}`}
                onSelect={() => handleMonthChange(`${i + 1}`)}
              >
                {new Date(0, i).toLocaleString("en", { month: "long" })}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Select onValueChange={handleYearChange}>
          <SelectTrigger id="year">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 50 }, (_, i) => (
              <SelectItem
                key={i}
                value={`${new Date().getFullYear() - i}`}
                onSelect={() =>
                  handleYearChange(`${new Date().getFullYear() - i}`)
                }
              >
                {new Date().getFullYear() - i}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
