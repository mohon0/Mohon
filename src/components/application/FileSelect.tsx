import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent } from "react";
import { FaRegUser } from "react-icons/fa6";

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
    <div className="flex flex-col pt-2 items-center gap-1.5">
      <span className="text-sm">image limit 500kb</span>
      <Label htmlFor="picture"><FaRegUser size='64' /></Label>
      <Input
        id="picture"
        type="file"
        className='border-none'
        required={true}
        onChange={handleFileChange}
      />
    </div>
  );
}
