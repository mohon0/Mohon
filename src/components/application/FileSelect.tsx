import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent } from "react";

interface FileSelectProps {
  onFileSelect: (file: File) => void;
}

export function FileSelect({ onFileSelect }: FileSelectProps) {
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-1.5">
      <Label htmlFor="picture">Picture</Label>
      <Input
        id="picture"
        type="file"
        required={true}
        className="px-0 items-start"
        onChange={handleFileChange}
      />
    </div>
  );
}
