"use client";

import { ChangeEventHandler, KeyboardEventHandler } from "react";
import TypingArea from "./TypingArea";

interface props {
  inpFieldValue: string;
  initTyping: ChangeEventHandler<HTMLInputElement>;
  handleKeyDown: KeyboardEventHandler<HTMLInputElement>;
  typingText: JSX.Element[] | null;
  timeLeft: number;
  mistakes: number;
  WPM: number;
  CPM: number;
  resetGame: () => void;
}

const SpeedTypingGame = ({
  inpFieldValue,
  initTyping,
  handleKeyDown,
  typingText,
  timeLeft,
  mistakes,
  WPM,
  CPM,
  resetGame,
}: props) => {
  return (
    <div className="m-1 w-11/12 mx-auto p-8 rounded-lg bg-gray-900 text-white">
      <input
        type="text"
        className="input-field absolute -z-50 opacity-0"
        value={inpFieldValue}
        onChange={initTyping}
        onKeyDown={handleKeyDown}
      />
      {/* Render the TypingArea child component */}
      <TypingArea
        typingText={typingText}
        inpFieldValue={inpFieldValue}
        timeLeft={timeLeft}
        mistakes={mistakes}
        WPM={WPM}
        CPM={CPM}
        initTyping={initTyping}
        handleKeyDown={handleKeyDown}
        resetGame={resetGame}
      />
    </div>
  );
};

export default SpeedTypingGame;
