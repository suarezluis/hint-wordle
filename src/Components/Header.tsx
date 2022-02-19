import React from "react";
import styled from "styled-components/macro";
type Props = {};

const Header = (props: Props) => {
  return <Wrapper>Hint Wordle</Wrapper>;
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
