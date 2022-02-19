import React from "react";
import styled from "styled-components/macro";

type Props = {
  addLetterToWords: (letter: string) => void;
  removeLetterFromWords: () => void;
};

const keys = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m", "⌫"],
];

const Keyboard = ({ addLetterToWords, removeLetterFromWords }: Props) => {
  return (
    <Wrapper>
      {keys.map((row, index) => (
        <Row key={`keyboard-row-${index}`}>
          {row.map((key) => (
            <Key
              key={key}
              double={key === "⌫"}
              onClick={() => {
                if (key !== "⌫") {
                  addLetterToWords(key.toUpperCase());
                } else {
                  removeLetterFromWords();
                }
              }}
            >
              {key.toUpperCase()}
            </Key>
          ))}
        </Row>
      ))}
    </Wrapper>
  );
};

export default Keyboard;

const Wrapper = styled.div`
  margin-top: 30px;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 10px;
  max-width: 500px;
  margin: 0 auto;
`;

const Key = styled.div<{ double?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ double }) => (double ? "70px" : "35px")};
  height: 35px;
  font-size: 25px;
  border-radius: 5px;
  border: 1px solid #3a3a3c;
`;
