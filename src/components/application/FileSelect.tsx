"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function FileSelect() {
  return (
    <div className="flex flex-col justify-center items-center gap-1.5 ">
      <Label htmlFor="picture">Picture</Label>
      <Input id="picture" type="file" className="px-0 items-start" />
    </div>
  );
}
