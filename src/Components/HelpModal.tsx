import React from "react";
import styled from "styled-components/macro";
import { LetterStatus } from "../App";

type Props = {
  toggleModal: () => void;
};

const HelpModal = ({ toggleModal }: Props) => {
  return (
    <ModalWrapper>
      <Close onClick={toggleModal}>✘</Close>
      <Instructions>
        Just copy your
        <WordleLink href="https://www.nytimes.com/games/wordle/index.html">
          Wordle
        </WordleLink>
        results and you will get suggestions on the possible words.
        <br />
        <br />
        Once you type the word you can tap on the letters to change the color
        between:
        <List>
          <Item>
            <LetterWrapper letterStatus={LetterStatus.empty}>H</LetterWrapper>
            Unknown
          </Item>

          <Item>
            <LetterWrapper letterStatus={LetterStatus.incorrect}>
              E
            </LetterWrapper>
            Incorrect
          </Item>

          <Item>
            <LetterWrapper letterStatus={LetterStatus.misplaced}>
              L
            </LetterWrapper>
            Misplaced
          </Item>

          <Item>
            <LetterWrapper letterStatus={LetterStatus.correct}>P</LetterWrapper>
            Correct
          </Item>
        </List>
        Then the app tells you how many possible words are left and it gives you
        a suggestion for your next word.
      </Instructions>
    </ModalWrapper>
  );
};

export default HelpModal;

const ModalWrapper = styled.div`
  position: absolute;
  margin: auto;
  padding: 40px 20px;

  left: 0;
  right: 0;
  top: 60px;
  text-align: center;
  background-color: #000;
  color: #ffffff;
  width: 320px;
  z-index: 99;
  border-radius: 10px;
  border: 2px solid #797575;
  font-size: 20px;
`;

const Instructions = styled.div`
  background-color: #000;
  color: #ffffff;
`;

const Close = styled.div`
  position: absolute;
  top: 5px;
  right: 10px;
  font-size: 25px;
  cursor: pointer;
`;

const WordleLink = styled.a`
  text-decoration: none;
  color: #538d4f;
  margin: 0 10px;
  background-color: #000;
`;

const LetterWrapper = styled.span<{ letterStatus: LetterStatus }>`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  height: 38px;
  width: 40px;
  margin: 0 10px;
  font-size: 30px;
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

const List = styled.div`
  background-color: #000;
  display: flex;
  flex-direction: column;
  margin: 10px 0;
`;
const Item = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  margin: 10px 10px;
  border-radius: 5px;
`;
