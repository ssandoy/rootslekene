import React, { useMemo, useState } from "react";
import { Page } from "../../components/page";
import styled from "@emotion/styled";
import { useFirestoreCollection } from "../../firebase/hooks/useFirestoreCollection";
import { INDICES } from "../../firebase/hooks/types";
import Spinner from "../../components/spinner/Spinner";
import { useYearContext } from "../../context/YearContext";
import { Competition as CompetitionType } from "../../firebase/types";
import { LeaderboardContestant as ContestantType } from "./domain";
import { ToBeAnnounced } from "../../components/to-be-announced";
import { SmallText } from "../../styles";
import {
  getContestantPoints,
  LeaderboardContestant,
  sortLeaderboardContestants,
} from "./domain";
import { Results } from "./Results";
import { Leaderboard } from "./Leaderboard";
import { TabGroup } from "../../components/tab-group";

const LeaderboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Link = styled.a`
  color: white;
`;

const Container: React.FC = () => {
  const [showLeaderboard, setShowLeaderboard] = useState(true);
  const { isLoading: isLoadingCompetitions, collectionData: competitions } =
    useFirestoreCollection<CompetitionType>(INDICES.COMPETITIONS_PROD_2021);
  const { isLoading: isLoadingContestants, collectionData: contestants } =
    useFirestoreCollection<ContestantType>(INDICES.CONTESTANTS_PROD_2021);

  const isLoading = isLoadingCompetitions || isLoadingContestants;

  const sortedContestants: LeaderboardContestant[] = useMemo(() => {
    return sortLeaderboardContestants(
      contestants?.map((contestant) => {
        const totalPoints =
          competitions?.reduce((acc, curr) => {
            return acc + getContestantPoints(curr.results ?? [])(contestant);
          }, 0) ?? 0;
        return {
          ...contestant,
          totalPoints,
        };
      }) ?? []
    );
  }, [competitions, contestants]);

  return (
    <LeaderboardWrapper>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <TabGroup
            buttons={[
              {
                text: "Sammendrag",
                isActive: showLeaderboard,
                onClick: () => setShowLeaderboard(true),
                styles: { fontSize: "0.85em" },
              },
              {
                text: "Konkurranser",
                isActive: !showLeaderboard,
                onClick: () => setShowLeaderboard(false),
                styles: { fontSize: "0.85em" },
              },
            ]}
          />
          {showLeaderboard ? (
            <Leaderboard
              competitions={competitions as CompetitionType[]}
              contestants={sortedContestants}
            />
          ) : (
            <Results
              competitions={competitions as CompetitionType[]}
              contestants={sortedContestants}
            />
          )}
        </>
      )}
    </LeaderboardWrapper>
  );
};

const LeaderboardPage: React.FC = () => {
  const { selectedYear } = useYearContext();

  return (
    <Page title="Resultater">
      {selectedYear === "2021" ? (
        <Container />
      ) : (
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
      )}
    </Page>
  );
};

export default LeaderboardPage;
