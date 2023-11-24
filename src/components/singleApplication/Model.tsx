interface props {
  name1: string;
  name2: string;
  value1: string;
  value2: string;
}

export default function Model({ name1, name2, value1, value2 }: props) {
  return (
    <div className="flex flex-col md:flex-row justify-between">
      <div className="flex gap-6 w-full">
        <div>{name1}: </div>
        <div>{value1}</div>
      </div>
      <div className="flex gap-6 w-full">
        <div>{name2}: </div>
        <div>{value2}</div>
      </div>
    </div>
  );
}
