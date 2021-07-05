import React from "react";
import styled from "@emotion/styled";

const HeaderDiv = styled.div``;

const HeaderTitle = styled.h1`
  color: white;
`;

const Header: React.FC = () => {
  // todo logo
  return (
    <HeaderDiv>
      <HeaderTitle>Rootslekene</HeaderTitle>
    </HeaderDiv>
  );
};

export default Header;
