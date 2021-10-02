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
      <p>COMING SOON</p>
      <HorinzontalLine />
      {children}
    </Container>
  );
};

export default ToBeAnnounced;
