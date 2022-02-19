import React from "react";
import styled from "styled-components/macro";
import { LetterStatus } from "../App";
import Letter from "./Letter";

type Props = {
  wordIndex: number;
  word: string[][];
  changeLetterStatus: (
    wordIndex: number,
    letterIndex: number,
    newStatus: LetterStatus
  ) => void;
};

const Word = ({ wordIndex, word, changeLetterStatus }: Props) => {
  return (
    <Wrapper>
      {word.map((letter, index) => (
        <Letter
          key={`word-${wordIndex}-letter-${index}`}
          letter={letter}
          wordIndex={wordIndex}
          letterIndex={index}
          changeLetterStatus={changeLetterStatus}
        />
      ))}
    </Wrapper>
  );
};

export default Word;

const Wrapper = styled.div`
  display: flex;
`;
