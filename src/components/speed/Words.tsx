interface Props {
  words: number;
}

const Words: React.FC<Props> = ({ words }) => {
  return (
    <div className="flex scale-75 lg:scale-100 items-center justify-center flex-col gap-2">
      <div className="bg-black border border-primary-200 w-24 h-28 rounded-2xl flex items-center justify-center text-5xl font-bold">
        {words}
      </div>
      <div>words/min</div>
    </div>
  );
};

export default Words;