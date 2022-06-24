import { Page } from "../../components/page";
import styled from "@emotion/styled";
import React from "react";

import BeerIcon from "./BeerIncon";
import { Intro2021 } from "./Intro2021";
import { useYearContext } from "../../context/YearContext";
import { Intro2022 } from "./Intro2022";
import { device } from "../../utils/mixins";

const Container = styled.div`
  @media ${device.FOR_PHONE_ONLY} {
    width: 80vw;
  }
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IntroPage: React.FC = () => {
  const { selectedYear } = useYearContext();
  return (
    <Page title="">
      <Container>
        <BeerIcon />
        {selectedYear === "2021" ? <Intro2021 /> : <Intro2022 />}
      </Container>
    </Page>
  );
};

export default IntroPage;
