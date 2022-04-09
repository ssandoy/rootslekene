import React from "react";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HorinzontalLine = styled.hr`
  width: 200px;
`;

const ToBeAnnounced: React.FC = ({ children }) => {
  return (
    <Container>
      <p>KOMMER SNART</p>
      <HorinzontalLine />
      {children}
    </Container>
  );
};

export default ToBeAnnounced;
