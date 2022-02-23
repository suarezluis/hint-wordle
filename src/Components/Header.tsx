import React from "react";
import styled from "styled-components/macro";
type Props = {
  toggleHelpModal: () => void;
};

const Header = ({ toggleHelpModal }: Props) => {
  return (
    <Wrapper>
      Hint Wordle <Help onClick={toggleHelpModal}>❓</Help>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 0;
  color: #fff;
  font-size: 36px;
  border-bottom: 1px solid #3a3a3c;
`;

const Help = styled.div`
  position: absolute;
  right: 10px;
  padding: 8px 8px;
  font-size: 20px;
  cursor: pointer;
  background-color: #3a3a3c;
  border-radius: 50%;
  user-select: none;
`;
