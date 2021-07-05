import React from "react";
import styled from "@emotion/styled";
import { Header } from "../header";

const PageDiv = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  color: white;
`;

type Props = {
  title: string;
};

const Page: React.FC<Props> = ({ title, children }) => {
  return (
    <PageDiv>
      <Title>{title}</Title>
      {children}
    </PageDiv>
  );
};

export default Page;
