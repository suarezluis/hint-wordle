import React from "react";
import styled from "styled-components/macro";
import { LetterStatus } from "../App";

type Props = {
  letter: string[];
  wordIndex: number;
  letterIndex: number;
  changeLetterStatus: (
    wordIndex: number,
    letterIndex: number,
    newStatus: LetterStatus
  ) => void;
};

const Letter = ({
  wordIndex,
  letterIndex,
  letter,
  changeLetterStatus,
}: Props) => {
  const letterValue = letter[0];
  const letterStatus = letter[1] as LetterStatus;

  const handleLetterClick = () => {
    if (letterValue.trim()) {
      switch (letterStatus) {
        case LetterStatus.empty:
          changeLetterStatus(wordIndex, letterIndex, LetterStatus.incorrect);
          return;
        case LetterStatus.incorrect:
          changeLetterStatus(wordIndex, letterIndex, LetterStatus.misplaced);
          return;
        case LetterStatus.misplaced:
          changeLetterStatus(wordIndex, letterIndex, LetterStatus.correct);
          return;
        case LetterStatus.correct:
          changeLetterStatus(wordIndex, letterIndex, LetterStatus.empty);
      }
    }
  };

  return (
    <>
      <LetterWrapper letterStatus={letterStatus} onClick={handleLetterClick}>
        {letterValue || " "}
      </LetterWrapper>
    </>
  );
};

export default Letter;

const LetterWrapper = styled.div<{ letterStatus: LetterStatus }>`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  height: 58px;
  width: 58px;
  margin: 3px;
  font-size: 36px;
  cursor: default;
  background-color: ${({ letterStatus }) => {
    switch (letterStatus) {
      case LetterStatus.incorrect:
        return "#3a3a3c";
      case LetterStatus.misplaced:
        return "#b59f3b";
      case LetterStatus.correct:
        return "#538d4f";
      case LetterStatus.empty:
        return "#121213";
    }
  }};
  border: 1px solid
    ${({ letterStatus }) =>
      letterStatus === LetterStatus.empty ? "#3a3a3c" : "#121213"};
`;
