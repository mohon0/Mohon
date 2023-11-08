import { useSession } from "next-auth/react";
import { ChangeEventHandler, FC } from "react";
import Options from "./Options";

interface CategoriesProps {
  onChange: ChangeEventHandler<HTMLSelectElement>;
  error?: string;
  selectedCategory: string;
}

const Filter: FC<CategoriesProps> = ({ onChange, error, selectedCategory }) => {
  const { data: session } = useSession();
  const Admin = session?.user?.email;

  return (
    <div className="border rounded-full px-4 py-2 flex gap-2 items-center">
      <label
        className=" font-bold text-gray-700 dark:text-gray-300"
        htmlFor="categories"
      >
        Filter:
      </label>
      <select
        className=" rounded-r-full w-28 bg-[#000119]  px-2 py-2"
        id="categories"
        onChange={onChange}
        value={selectedCategory}
      >
        <option value="">All</option>
        {Options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Filter;
