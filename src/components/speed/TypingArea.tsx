import React from "react";

interface TypingAreaProps {
  typingText: JSX.Element[] | null;
  resetGame: () => void;
}

const TypingArea: React.FC<TypingAreaProps> = ({ typingText, resetGame }) => {
  return (
    <div className="border rounded-lg p-4">
      <div className="section1 border-b pb-3">
        <p className=" break-words text-left text-2xl select-none cursor-text">
          {typingText}
        </p>
      </div>
      <div className="flex justify-end items-center mt-4">
        <button
          onClick={resetGame}
          className="bg-black border border-primary-200 px-10 py-2 hover:bg-gray-950 rounded-md m-1 outline-none text-primary-200 font-bold"
        >
          Reset Game
        </button>
      </div>
    </div>
  );
};

export default TypingArea;
