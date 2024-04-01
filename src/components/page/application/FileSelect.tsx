import { Label } from "@/components/ui/label";
import { ChangeEvent } from "react";
import { FaRegUser } from "react-icons/fa6";

interface FileSelectProps {
  isRequired?: boolean;
  onFileSelect: (file: File) => void;
}

export function FileSelect({ onFileSelect, isRequired }: FileSelectProps) {
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div className="flex flex-col items-center gap-1.5 pt-2">
      <span className="text-sm">image limit 100kb</span>
      <Label htmlFor="picture">
        <FaRegUser size="64" />
      </Label>
      <input
        id="picture"
        type="file"
        className="border-none"
        required={isRequired}
        onChange={handleFileChange}
      />
    </div>
  );
}
