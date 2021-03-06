import React from "react";
import { Page } from "../../components/page";
import { Contestant } from "../../components/contestant";
import styled from "@emotion/styled";
import { Contestant as ContestantType } from "../../firebase/types";
import { useFirestoreCollection } from "../../firebase/hooks/useFirestoreCollection";
import { INDICES } from "../../firebase/hooks/types";
import Spinner from "../../components/spinner/Spinner";
import { device } from "../../utils/mixins";
import { useYearContext } from "../../context/YearContext";

const ContestantsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  @media ${device.FOR_TABLET_PORTRAIT_DOWN} {
    flex-direction: column;
  }
`;

const Contestants: React.FC = () => {
  const { selectedYear } = useYearContext();
  const contestantIndex =
    selectedYear === "2021"
      ? INDICES.CONTESTANTS_PROD_2021
      : INDICES.CONTESTANTS_PROD_2022;
  const { isLoading, collectionData: contestants } =
    useFirestoreCollection<ContestantType>(contestantIndex);
  return (
    <ContestantsWrapper>
      {isLoading && <Spinner />}
      {contestants?.map((contestant) => (
        <Contestant key={contestant.name} contestant={contestant} />
      ))}
    </ContestantsWrapper>
  );
};

const ContestantsPage: React.FC = () => {
  return (
    <Page title="DELTAKERE">
      <Contestants />
    </Page>
  );
};

export default ContestantsPage;
