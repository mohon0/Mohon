interface Props {
  accuracy: number;
}

const Accuracy: React.FC<Props> = ({ accuracy }) => {
  return (
    <div className="flex scale-75 lg:scale-100 items-center justify-center flex-col gap-2">
      <div className="bg-black border border-primary-200 w-24 h-28 rounded-2xl flex items-center justify-center text-5xl font-bold">
        {accuracy}
      </div>
      <div>% accuracy</div>
    </div>
  );
};

export default Accuracy;
