import React, { useMemo, useState } from "react";
import { Page } from "../../components/page";
import styled from "@emotion/styled";
import { useFirestoreCollection } from "../../firebase/hooks/useFirestoreCollection";
import { INDICES } from "../../firebase/hooks/types";
import Spinner from "../../components/spinner/Spinner";
import { useYearContext } from "../../context/YearContext";
import { Competition as CompetitionType } from "../../firebase/types";
import {
  getContestantPoints,
  LeaderboardContestant as ContestantType,
  LeaderboardContestant,
  sortLeaderboardContestants,
} from "./domain";
import { ToBeAnnounced } from "../../components/to-be-announced";
import { SmallText } from "../../styles";
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
  const { selectedYear } = useYearContext();
  const competitionIndex =
    selectedYear === "2021"
      ? INDICES.COMPETITIONS_TEST_2021
      : INDICES.COMPETITIONS_TEST_2022;
  const contestantIndex =
    selectedYear === "2021"
      ? INDICES.CONTESTANTS_TEST_2021
      : INDICES.CONTESTANTS_TEST_2022;
  const [showLeaderboard, setShowLeaderboard] = useState(true);
  const { isLoading: isLoadingCompetitions, collectionData: competitions } =
    useFirestoreCollection<CompetitionType>(competitionIndex);
  const { isLoading: isLoadingContestants, collectionData: contestants } =
    useFirestoreCollection<ContestantType>(contestantIndex);

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
              },
              {
                text: "Konkurranser",
                isActive: !showLeaderboard,
                onClick: () => setShowLeaderboard(false),
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
    <Page title="RESULTATER">
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
