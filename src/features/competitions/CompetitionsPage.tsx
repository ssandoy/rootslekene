import React from "react";
import { Page } from "../../components/page";
import styled from "@emotion/styled";
import { Competition as CompetitionType } from "../../firebase/types";
import { Competition } from "./Competition";
import { useFirestoreCollection } from "../../firebase/hooks/useFirestoreCollection";
import { INDICES } from "../../firebase/hooks/types";
import { useYearContext } from "../../context/YearContext";
import { ToBeAnnounced } from "../../components/to-be-announced";
import { SmallText } from "../../styles";
import { device } from "../../utils/mixins";

const CompetitionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  @media ${device.FOR_PHONE_ONLY} {
    width: 90%;
  }
`;

const Link = styled.a`
  color: white;
`;

const Competitions: React.FC = () => {
  const { selectedYear } = useYearContext();
  const competitionIndex =
    selectedYear === "2021"
      ? INDICES.COMPETITIONS_PROD_2021
      : INDICES.COMPETITIONS_TEST_2022;
  const { collectionData: competitions } =
    useFirestoreCollection<CompetitionType>(competitionIndex);
  return (
    <CompetitionsContainer>
      {competitions?.map((competition) => (
        <Competition key={competition.id} competition={competition} />
      ))}
    </CompetitionsContainer>
  );
};

const CompetitionsPage: React.FC = () => {
  const { selectedYear } = useYearContext();
  return (
    <Page title="Konkurranser">
      {selectedYear === "2022" ? (
        <ToBeAnnounced>
          <SmallText>
            Neste års konkurranser klekkes for øyeblikket ut!
          </SmallText>
          <SmallText>
            Forslag til leker kan sendes inn{" "}
            <Link target="_blank" href="https://forms.gle/Nf25W8cBkwP9E8gs7">
              her
            </Link>
          </SmallText>
        </ToBeAnnounced>
      ) : (
        <Competitions />
      )}
    </Page>
  );
};

export default CompetitionsPage;
