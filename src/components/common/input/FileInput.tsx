interface FormInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const FileInput: React.FC<FormInputProps> = ({ onChange, error }) => {
  return (
    <div>
      <div className="relative">
        <input
          type="file"
          onChange={onChange}
          id="file"
          className="flex px-2.5 border pb-2.5 pt-4 w-full text-sm text-white bg-transparent rounded-lg border-1 border-gray-300 appearance-none  focus:outline-none  peer"
          placeholder=" "
        />
        <label className="absolute text-sm text-gray-200  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-blue-950 px-2 peer-focus:px-2 peer-focus:text-white  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-0 peer-focus:scale-75  left-1">
          Featured Image
        </label>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default FileInput;
