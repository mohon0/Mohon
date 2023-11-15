import React from "react";

interface TypingAreaProps {
  typingText: JSX.Element[] | null;
  inpFieldValue: string;
  timeLeft: number;
  mistakes: number;
  WPM: number;
  CPM: number;
  initTyping: (event: React.ChangeEvent<HTMLInputElement>) => void; // Update the type
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  resetGame: () => void;
}

const TypingArea: React.FC<TypingAreaProps> = ({
  typingText,
  timeLeft,
  mistakes,
  WPM,
  CPM,
  resetGame,
}) => {
  return (
    <div className="border rounded-lg p-4">
      <div className="section1 border-b pb-3">
        <p className=" break-words text-left text-2xl select-none cursor-text">
          {typingText}
        </p>
      </div>
      <div className="flex justify-between items-center mt-2">
        <ul className="flex justify-between items-center w-10/12">
          <li className="time">
            <p>Time Left:</p>
            <span>
              <b>{timeLeft}</b>s
            </span>
          </li>
          <li className="mistake">
            <p>Mistakes:</p>
            <span>{mistakes}</span>
          </li>
          <li className="wpm">
            <p>WPM:</p>
            <span>{WPM}</span>
          </li>
          <li className="cpm">
            <p>CPM:</p>
            <span>{CPM}</span>
          </li>
        </ul>
        <button
          onClick={resetGame}
          className="bg-blue-600 px-10 py-2 hover:bg-blue-500 rounded-md m-1 outline-none border"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default TypingArea;
