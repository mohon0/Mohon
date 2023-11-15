"use client";

import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import TypingArea from "./TypingArea";

interface SpeedTypingGameProps {}

const SpeedTypingGame: React.FC<SpeedTypingGameProps> = () => {
  const paragraphs: string[] = [
    "A plant is one of the most important living things that develop on the earth and is made up of stems, leaves, roots, and so on.Parts of Plants: The part of the plant that developed beneath the soil is referred to as root and the part that grows outside of the soil is known as shoot. The shoot consists of stems, branches, l eaves, fruits, and flowers. Plants are made up of six main parts: roots, stemleaves, flowers, fruits, and seeds.",
    "The root is the part of the plant that grows in the soil. The primary root emerges from the embryo. Its primary function is to provide the plant stability in the earth and make other mineral salts from the earth available to the plant for variometabolic processes There are three types of roots i.e. Tap Root, Adventitious Roots, aLateral Root. The roots arise from the parts of the plant and not from the rhizomes roots.",
    "Stem is the posterior part that remains above the ground and grows negatively geotropic. Internodes and nodes are found on the stem. Branch, bud, leaf, petiole, flower, and inflorescence on a node are all those parts of the plant that remain above tground and undergo negative subsoil development. The trees have brown bark and the youand newly developed stems are green. The roots arise from the parts of plant and nfrom the rhizomes roots.",
    "It is the blossom of a plant. A flower is the part of a plant that produces seeds, which eventually become other flowers. They are the reproductive system of a plant. Most flowers consist of 04 main parts that are sepals, petals, stamens, and carpels. The female portion of the flower is the carpels. The majority of flowers ahermaphrodites, meaning they have both male and female components. Others may consist of one of tparts and may be male or female.",
    "An aunt is a bassoon from the right perspective. As far as we can estimate, some posit the melic myanmar to be less than kutcha. One cannot separate foods from blowbows. The scampish closet reveals itself as a sclerous llama to those who look. A hip the skirt of a peak. Some hempy laundries are thought of simply as orchids. A gum is a trumpet from the right perspective. A freebie flight is a wrench of the mind. Some posit the croupy.",
  ];

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
    const ranIndex = Math.floor(Math.random() * paragraphs.length);
    const inputField = document.getElementsByClassName(
      "input-field"
    )[0] as HTMLInputElement;
    document.addEventListener("keydown", () => inputField.focus());
    const content = Array.from(paragraphs[ranIndex]).map((letter, index) => (
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
