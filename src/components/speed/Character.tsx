interface Props {
  char: number;
}

const Character: React.FC<Props> = ({ char }) => {
  return (
    <div className="flex items-center justify-center flex-col gap-2">
      <div className="bg-black border border-primary-200 w-24 h-28 rounded-2xl flex items-center justify-center text-5xl font-bold">
        {char}
      </div>
      <div>words/min</div>
    </div>
  );
};

export default Character;
