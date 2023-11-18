"use client";

import { format } from "date-fns";
import { FaCalendarAlt } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type DatePickerProps = {
  dateOfBirth: Date | undefined;
  setDateOfBirth: (date: Date | undefined) => void;
};

export function DatePickerDemo({
  dateOfBirth,
  setDateOfBirth,
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !dateOfBirth && "text-muted-foreground"
          )}
        >
          <FaCalendarAlt className="mr-2 h-4 w-4" />
          {dateOfBirth ? format(dateOfBirth, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={dateOfBirth}
          onSelect={setDateOfBirth}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
