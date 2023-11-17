"use client";
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import Accuracy from "./Accuracy";
import Character from "./Character";
import { Paragraphs } from "./Paragraphs";
import Seconds from "./Seconds";
import TypingArea from "./TypingArea";
import Words from "./Words";

export default function SpeedTest() {
  const [typingText, setTypingText] = useState<JSX.Element[] | null>(null);
  const [inpFieldValue, setInpFieldValue] = useState<string>("");
  const maxTime: number = 60;
  const [timeLeft, setTimeLeft] = useState<number>(maxTime);
  const [charIndex, setCharIndex] = useState<number>(0);
  const [mistakes, setMistakes] = useState<number>(0);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [WPM, setWPM] = useState<number>(0);
  const [CPM, setCPM] = useState<number>(0);

  const loadParagraph = () => {
    const ranIndex = Math.floor(Math.random() * Paragraphs.length);
    const inputField = document.getElementsByClassName(
      "input-field"
    )[0] as HTMLInputElement;
    document.addEventListener("keydown", () => inputField.focus());
    const content = Array.from(Paragraphs[ranIndex]).map((letter, index) => (
      <span
        key={index}
        style={{ color: letter !== " " ? "white" : "transparent" }}
        className={`char ${index === 0 ? "active" : ""}`}
      >
        {letter !== " " ? letter : "_"}
      </span>
    ));
    setTypingText(content);
    setInpFieldValue("");
    setCharIndex(0);
    setMistakes(0);
    setIsTyping(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const characters = document.querySelectorAll(".char");
    if (
      event.key === "Backspace" &&
      charIndex > 0 &&
      charIndex < characters.length &&
      timeLeft > 0
    ) {
      if (characters[charIndex - 1].classList.contains("correct")) {
        characters[charIndex - 1].classList.remove("correct");
      }
      if (characters[charIndex - 1].classList.contains("wrong")) {
        characters[charIndex - 1].classList.remove("wrong");
        setMistakes(mistakes - 1);
      }
      characters[charIndex].classList.remove("active");
      characters[charIndex - 1].classList.add("active");
      setCharIndex(charIndex - 1);
      let cpm = (charIndex - mistakes - 1) * (60 / (maxTime - timeLeft));
      cpm = cpm < 0 || !cpm || cpm === Infinity ? 0 : cpm;
      setCPM(cpm);

      let wpm = Math.round(
        ((charIndex - mistakes) / 5 / (maxTime - timeLeft)) * 60
      );
      wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
      setWPM(wpm);
    }
  };

  const initTyping = (event: ChangeEvent<HTMLInputElement>) => {
    const characters = document.querySelectorAll(".char");
    let typedChar = event.target.value;
    if (charIndex < characters.length && timeLeft > 0) {
      let currentChar = (characters[charIndex] as HTMLElement).innerText;
      if (currentChar === "_") currentChar = " ";
      if (!isTyping) {
        setIsTyping(true);
      }
      if (typedChar === currentChar) {
        setCharIndex(charIndex + 1);
        if (charIndex + 1 < characters.length)
          (characters[charIndex + 1] as HTMLElement).classList.add("active");
        (characters[charIndex] as HTMLElement).classList.remove("active");
        (characters[charIndex] as HTMLElement).classList.add("correct");
      } else {
        setCharIndex(charIndex + 1);
        setMistakes(mistakes + 1);
        (characters[charIndex] as HTMLElement).classList.remove("active");
        if (charIndex + 1 < characters.length)
          (characters[charIndex + 1] as HTMLElement).classList.add("active");
        (characters[charIndex] as HTMLElement).classList.add("wrong");
      }

      if (charIndex === characters.length - 1) setIsTyping(false);

      let wpm = Math.round(
        ((charIndex - mistakes) / 5 / (maxTime - timeLeft)) * 60
      );
      wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
      setWPM(wpm);

      let cpm = (charIndex - mistakes) * (60 / (maxTime - timeLeft));
      cpm = cpm < 0 || !cpm || cpm === Infinity ? 0 : cpm;
      setCPM(parseInt(cpm.toString(), 10));
    } else {
      setIsTyping(false);
    }
  };

  const resetGame = () => {
    setIsTyping(false);
    setTimeLeft(maxTime);
    setCharIndex(0);
    setMistakes(0);
    setTypingText(null);
    setCPM(0);
    setWPM(0);
    const characters = document.querySelectorAll(".char");
    characters.forEach((span) => {
      span.classList.remove("correct");
      span.classList.remove("wrong");
      span.classList.remove("active");
    });
    characters[0].classList.add("active");
    loadParagraph();
  };

  useEffect(() => {
    loadParagraph();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTyping && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
        let cpm = Math.round(
          (charIndex - mistakes) * (60 / (maxTime - timeLeft))
        );
        cpm = cpm < 0 || !cpm || cpm === Infinity ? 0 : cpm;
        setCPM(cpm);

        let wpm = Math.round(
          ((charIndex - mistakes) / 5 / (maxTime - timeLeft)) * 60
        );
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        setWPM(wpm);
      }, 1000);
    } else if (timeLeft === 0 && interval !== null) {
      clearInterval(interval);
      setIsTyping(false);
    }
    return () => {
      if (interval !== null) {
        clearInterval(interval);
      }
    };
  }, [isTyping, timeLeft]);
  return (
    <div className="mx-2 lg:mx-20 flex flex-col gap-10 items-center justify-center">
      <div className="flex flex-wrap items-center justify-center md:items-start gap-4 lg:gap-16">
        <Seconds seconds={timeLeft} />
        <Words words={WPM} />
        <Character char={CPM} />
        <Accuracy accuracy={mistakes} />
      </div>
      <div className="w-full">
        <div className="m-1 lg:w-11/12 mx-auto p-8 rounded-lg bg-gray-900 text-white">
          <input
            type="text"
            className="input-field absolute -z-50 opacity-0"
            value={inpFieldValue}
            onChange={initTyping}
            onKeyDown={handleKeyDown}
          />
          {/* Render the TypingArea child component */}
          <TypingArea typingText={typingText} resetGame={resetGame} />
        </div>
      </div>
    </div>
  );
}
