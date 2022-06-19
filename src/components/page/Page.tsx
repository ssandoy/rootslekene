import React from "react";
import styled from "@emotion/styled";

const PageDiv = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 16px;
`;

const Title = styled.h2`
  color: white;
  margin-bottom: 20px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  max-width: 1000px;
`;

type Props = {
  title: string;
};

const Page: React.FC<Props> = ({ title, children }) => {
  return (
    <PageDiv>
      <Title>{title}</Title>
      <Container>{children}</Container>
    </PageDiv>
  );
};

export default Page;
