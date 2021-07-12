import React from "react";
import { Page } from "../../components/page";
import { Contestant } from "../../components/contestant";
import styled from "@emotion/styled";
import { ContestantType } from "./types";
import { useFirestoreCollection } from "../../firebase/hooks/useFirestoreCollection";
import { INDICES } from "../../firebase/hooks/types";
import Spinner from "../../components/spinner/Spinner";
import { device } from "../../utils/mixins";

const ContestantsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media ${device.FOR_TABLET_PORTRAIT_DOWN} {
    flex-direction: column;
    justify-content: center;
  }
`;

const ContestantsPage: React.FC = () => {
  const { isLoading, collectionData: contestants } = useFirestoreCollection<
    ContestantType[]
  >(INDICES.CONTESTANTS);

  return (
    <Page title="Deltakere">
      <ContestantsWrapper>
        {isLoading && <Spinner />}
        {contestants?.map((contestant) => (
          <Contestant key={contestant.name} contestant={contestant} />
        ))}
      </ContestantsWrapper>
    </Page>
  );
};

export default ContestantsPage;
