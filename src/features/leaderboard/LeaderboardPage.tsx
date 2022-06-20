import React, { useMemo, useState } from "react";
import { Page } from "../../components/page";
import styled from "@emotion/styled";
import { useFirestoreCollection } from "../../firebase/hooks/useFirestoreCollection";
import { INDICES } from "../../firebase/hooks/types";
import Spinner from "../../components/spinner/Spinner";
import { useYearContext } from "../../context/YearContext";
import { Competition as CompetitionType } from "../../firebase/types";
import {
  calculatePlacement,
  getContestantPoints,
  LeaderboardContestant as ContestantType,
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
      contestants
        ?.map((contestant, i, array) => {
          const totalPoints =
            competitions?.reduce((acc, curr) => {
              return acc + getContestantPoints(curr.results ?? [])(contestant);
            }, 0) ?? 0;
          return {
            ...contestant,
            totalPoints,
          };
        })
        .map((contestant, _, arr) => {
          const placement = calculatePlacement(contestant)(arr);
          return {
            ...contestant,
            placement,
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
  return (
    <Page title="RESULTATER">
      <Container />
    </Page>
  );
};

export default LeaderboardPage;
