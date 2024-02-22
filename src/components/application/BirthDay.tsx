"use client";
import { ErrorMessage, useField } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BirthDay: React.FC = () => {
  const [field, meta, helpers] = useField("birthDay");

  return (
    <div className="flex flex-col">
      <div className="relative">
        <DatePicker
          selected={field.value}
          onChange={(date) => helpers.setValue(date)}
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          placeholderText="Select your birthday"
          className="px-3 py-1.5 bg-transparent border flex rounded"
        />
        <span className="absolute right-52 top-1/2 transform -translate-y-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6 text-gray-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </div>
      <ErrorMessage
        name="birthDay"
        component="div"
        className="text-red-500 mt-2"
      />
    </div>
  );
};

export default BirthDay;
