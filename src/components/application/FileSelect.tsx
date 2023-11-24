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
    <div className="flex flex-col pt-2 items-center gap-1.5 border h-40">
      <Label htmlFor="picture">Upload Your Image</Label>
      <Input
        id="picture"
        type="file"
        required={true}
        className="px-0 items-start flex h-full"
        onChange={handleFileChange}
      />
    </div>
  );
}
