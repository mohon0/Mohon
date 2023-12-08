type props = {
  item1: string;
  item2: string;
  value1: string;
  value2: string;
};

export default function Model({ item1, value1, value2, item2 }: props) {
  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
    <>
      <tr>
        <td className="border px-2 w-1/2 p-1">
          <span className="font-bold">{item1}: </span>
          <span className="pl-3">{capitalizeFirstLetter(value1)}</span>
        </td>
        <td className="border px-2 w-1/2 p-1">
          <span className="font-bold">{item2}: </span>
          <span className="pl-3">{capitalizeFirstLetter(value2)}</span>
        </td>
      </tr>
    </>
  );
}
