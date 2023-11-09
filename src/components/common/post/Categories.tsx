import { useSession } from "next-auth/react";
import { ChangeEventHandler, FC } from "react";
import Options from "./Options";

interface CategoriesProps {
  onChange: ChangeEventHandler<HTMLSelectElement>;
  error?: string;
  selectedCategory: string;
}

const Categories: FC<CategoriesProps> = ({
  onChange,
  error,
  selectedCategory,
}) => {
  const { data: session } = useSession();
  const Admin = session?.user?.email;

  return (
    <div className="mb-4">
      <label
        className="mb-2 block font-bold text-gray-300"
        htmlFor="categories"
      >
        Categories
      </label>
      <select
        className="mt-2 block w-10/12 rounded-md border border-gray-300 bg-slate-800 px-4 py-2 "
        id="categories"
        onChange={onChange}
        value={selectedCategory}
      >
        <option value="">Select Category</option>
        {Admin === process.env.NEXT_PUBLIC_ADMIN
          ? Options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))
          : Options.filter(
              (option) =>
                option.value !== "featured" && option.value !== "hotpost"
            ).map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
      </select>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Categories;
