interface Props {
  char: number;
}

const Character: React.FC<Props> = ({ char }) => {
  return (
    <div className="flex scale-75 lg:scale-100 items-center justify-center flex-col gap-2 overflow-clip">
      <div className="bg-black border border-primary-200 w-24 h-28 rounded-2xl flex items-center justify-center text-5xl font-bold">
        {char}
      </div>
      <div>char/min</div>
    </div>
  );
};

export default Character;
