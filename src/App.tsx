import React, { useMemo, useState } from "react";
import styled from "styled-components/macro";

import "./App.css";
import Header from "./Components/Header";
import Keyboard from "./Components/Keyboard";
import Word from "./Components/Word";
import validWords from "./Resources/validWords";

export enum LetterStatus {
  empty = "empty",
  incorrect = "incorrect",
  misplaced = "misplaced",
  correct = "correct",
}

function App() {
  const [board, setBoard] = useState([
    [
      ["", LetterStatus.empty],
      ["", LetterStatus.empty],
      ["", LetterStatus.empty],
      ["", LetterStatus.empty],
      ["", LetterStatus.empty],
    ],
    [
      ["", LetterStatus.empty],
      ["", LetterStatus.empty],
      ["", LetterStatus.empty],
      ["", LetterStatus.empty],
      ["", LetterStatus.empty],
    ],
    [
      ["", LetterStatus.empty],
      ["", LetterStatus.empty],
      ["", LetterStatus.empty],
      ["", LetterStatus.empty],
      ["", LetterStatus.empty],
    ],
    [
      ["", LetterStatus.empty],
      ["", LetterStatus.empty],
      ["", LetterStatus.empty],
      ["", LetterStatus.empty],
      ["", LetterStatus.empty],
    ],
    [
      ["", LetterStatus.empty],
      ["", LetterStatus.empty],
      ["", LetterStatus.empty],
      ["", LetterStatus.empty],
      ["", LetterStatus.empty],
    ],
    [
      ["", LetterStatus.empty],
      ["", LetterStatus.empty],
      ["", LetterStatus.empty],
      ["", LetterStatus.empty],
      ["", LetterStatus.empty],
    ],
  ]);

  const changeLetterStatus = (
    wordIndex: number,
    letterIndex: number,
    newStatus: LetterStatus
  ) => {
    setBoard((oldBoard) => {
      const newBoard = [...oldBoard];
      newBoard[wordIndex][letterIndex][1] = newStatus;
      return newBoard;
    });
  };

  const possibleWords = useMemo(() => {
    let newPossibleWords = [...validWords];
    const correctLetters: [string, number][] = [];
    const misplacedLetters: [string, number][] = [];
    const incorrectLetters: string[] = [];
    board.forEach((word) => {
      word.forEach((letter, index) => {
        if (letter[1] === LetterStatus.correct) {
          correctLetters.push([letter[0], index]);
        }
        if (letter[1] === LetterStatus.misplaced) {
          misplacedLetters.push([letter[0], index]);
        }
        if (letter[1] === LetterStatus.incorrect) {
          incorrectLetters.push(letter[0]);
        }
      });
    });

    return (
      newPossibleWords
        // Filter correct letters
        .filter((word) => {
          let isWordGood = true;
          correctLetters.forEach((letter) => {
            isWordGood =
              isWordGood && word[letter[1]] === letter[0].toLowerCase();
          });
          return isWordGood;
        })
        // Filter misplaced letters
        .filter((word) => {
          let isWordGood = true;
          misplacedLetters.forEach((letter) => {
            isWordGood =
              isWordGood &&
              word.includes(letter[0].toLowerCase()) &&
              word[letter[1]] !== letter[0].toLowerCase();
          });
          return isWordGood;
        })
        // Filter incorrect letters
        .filter((word) => {
          let isWordGood = true;
          incorrectLetters.forEach((letter) => {
            isWordGood = isWordGood && !word.includes(letter.toLowerCase());
          });
          return isWordGood;
        })
    );
  }, [board]);

  const lastLetterIndex = useMemo(() => {
    for (let wordIndex = 0; wordIndex < board.length; wordIndex++) {
      const word = board[wordIndex];
      for (let letterIndex = 0; letterIndex < word.length; letterIndex++) {
        const letter = word[letterIndex];
        if (!letter[0].trim()) {
          return [wordIndex, letterIndex - 1];
        }
      }
    }
    return [5, 4];
  }, [board]);

  const addLetterToWords = (letter: string) => {
    const wordIndex = lastLetterIndex[0];
    const letterIndex = lastLetterIndex[1] + 1;
    if (wordIndex <= 5 && letterIndex <= 4) {
      setBoard((oldBoard) => {
        const newBoard = [...oldBoard];
        newBoard[wordIndex][letterIndex][0] = letter;
        return newBoard;
      });
    }
  };

  const removeLetterFromWords = () => {
    let wordIndex = lastLetterIndex[0];
    let letterIndex = lastLetterIndex[1];

    if (letterIndex < 0) {
      wordIndex = wordIndex - 1;
      letterIndex = 4;
    }

    if (wordIndex >= 0 && letterIndex >= 0) {
      setBoard((oldBoard) => {
        const newBoard = [...oldBoard];

        newBoard[wordIndex][letterIndex][0] = "";
        newBoard[wordIndex][letterIndex][1] = LetterStatus.empty;
        return newBoard;
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    if (key === "Backspace") {
      removeLetterFromWords();
    } else {
      if (/[a-z]/i.test(key) && key.length === 1) {
        addLetterToWords(key.toUpperCase());
      }
    }
  };

  const getRandomWordFromPossibleWords = () => {
    let randomWord = "";
    if (possibleWords.length) {
      randomWord =
        possibleWords[Math.floor(Math.random() * possibleWords.length)];
    }
    return randomWord.toUpperCase();
  };

  return (
    <div className="App">
      <Wrapper tabIndex={0} onKeyDown={handleKeyPress}>
        <Header />
        <Content>
          <PossibleWrods>
            There is {possibleWords.length} possible words. <br />
          </PossibleWrods>
          <Suggestion>
            {possibleWords.length > 0 && (
              <>
                You could try the word{" "}
                <SuggestedWord>
                  {getRandomWordFromPossibleWords()
                    .split("")
                    .map((letter) => (
                      <Letter>{letter}</Letter>
                    ))}
                </SuggestedWord>
              </>
            )}
          </Suggestion>
          {board.map((word, index) => (
            <Word
              key={"word-" + index}
              wordIndex={index}
              word={word}
              changeLetterStatus={changeLetterStatus}
            />
          ))}
          <Keyboard
            addLetterToWords={addLetterToWords}
            removeLetterFromWords={removeLetterFromWords}
          />
        </Content>
      </Wrapper>
    </div>
  );
}

export default App;

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
`;

const Suggestion = styled.div`
  display: flex;
  align-items: center;
  font-size: 30px;
  min-height: 50px;
`;

const PossibleWrods = styled.div`
  display: flex;
  align-items: center;
  font-size: 25px;
  margin-top: 10px;
`;

const SuggestedWord = styled.div`
  display: flex;
  margin-left: 10px;
  justify-content: center;
  align-items: center;
`;

const Letter = styled.div`
  background-color: #538d4f;
  height: 30px;
  width: 30px;
  text-align: center;
  margin: 2px;
`;
