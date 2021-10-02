import React, { useMemo } from "react";
import { Page } from "../../components/page";
import styled from "@emotion/styled";
import { useFirestoreCollection } from "../../firebase/hooks/useFirestoreCollection";
import { INDICES } from "../../firebase/hooks/types";
import Spinner from "../../components/spinner/Spinner";
import { Contestant } from "../../components/contestant";
import { device } from "../../utils/mixins";
import { useYearContext } from "../../context/YearContext";
import {
  Competition,
  Contestant as ContestantType,
} from "../../firebase/types";
import { ToBeAnnounced } from "../../components/to-be-announced";
import { SmallText } from "../../styles";
import {
  getContestantPoints,
  getLeaderboardTopScorer,
  sortLeaderboardContestants,
} from "./domain";

const LeaderboardWrapper = styled.div``;

const ChampionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const Table = styled.table`
  color: white;
`;

const TableHeading = styled.th`
  text-align: left;
`;

const TableData = styled.td`
  padding: 8px;
  text-align: center;
  @media ${device.FOR_TABLET_PORTRAIT_UP} {
    width: 42px;
  }
`;

const Link = styled.a`
  color: white;
`;

const Leaderboard: React.FC = () => {
  const { isLoading: isLoadingCompetitions, collectionData: competitions } =
    useFirestoreCollection<Competition>(INDICES.COMPETITIONS_PROD_2021);
  const { isLoading: isLoadingContestants, collectionData: contestants } =
    useFirestoreCollection<ContestantType>(INDICES.CONTESTANTS_PROD_2021);
  const { isLoading: isLoadingGameOver, collectionData: isGameOverList } =
    useFirestoreCollection<ContestantType>(INDICES.GAME_OVER_PROD_2021);

  const isLoading =
    isLoadingCompetitions || isLoadingContestants || isLoadingGameOver;

  const sortedContestants = useMemo(() => {
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

  const rowData = useMemo(() => {
    return (
      competitions?.map((competition) => {
        const results = competition.results ?? [];
        return [
          competition.icon,
          ...results
            .sort(
              (resultA, resultB) => resultA.contestantId - resultB.contestantId
            )
            .map((result) => result.points),
        ];
      }) ?? []
    );
  }, [competitions]);

  const champion = isGameOverList?.[0]
    ? getLeaderboardTopScorer(sortedContestants)
    : null;

  return (
    <LeaderboardWrapper>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Table>
            <thead>
              <tr>
                <TableHeading>Øvelse</TableHeading>
                {sortedContestants.map((contestant) => (
                  <th key={contestant.id}>{contestant.shortName}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rowData.map((row) => (
                <tr key={row.toString()}>
                  {row.map((r, idx) => {
                    return <TableData key={idx}>{r}</TableData>;
                  })}
                </tr>
              ))}
              <tr>
                <td style={{ textAlign: "left" }}>
                  <b>Totalt</b>
                </td>
                {sortedContestants.map((contestant, idx) => (
                  <TableData key={idx}>{contestant?.totalPoints}</TableData>
                ))}
              </tr>
            </tbody>
          </Table>
          {champion && (
            <ChampionWrapper>
              <h3 style={{ color: "gold" }}>🏆 2021 CHAMPION 🏆</h3>
              <Contestant contestant={champion} showDetails={false} />
            </ChampionWrapper>
          )}
        </>
      )}
    </LeaderboardWrapper>
  );
};

const LeaderboardPage: React.FC = () => {
  const { selectedYear } = useYearContext();

  return (
    <Page title="Leaderboard">
      {selectedYear === "2021" ? (
        <Leaderboard />
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
