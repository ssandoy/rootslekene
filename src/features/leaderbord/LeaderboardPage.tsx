import React, { useMemo } from "react";
import { Page } from "../../components/page";
import styled from "@emotion/styled";
import { useFirestoreCollection } from "../../firebase/hooks/useFirestoreCollection";
import { Competition } from "./types";
import { INDICES } from "../../firebase/hooks/types";
import Spinner from "../../components/spinner/Spinner";
import { ContestantType } from "../contestants/types";

const LeaderboardWrapper = styled.div``;

const Table = styled.table`
  color: white;
`;

const TableHeading = styled.th`
  text-align: left;
`;

const TableData = styled.td`
  padding: 8px;
  text-align: center;
`;

const LeaderboardPage: React.FC = () => {
  const { isLoading: isLoadingCompetitions, collectionData: competitions } =
    useFirestoreCollection<Competition[]>(INDICES.COMPETITIONS_TEST);
  const { isLoading: isLoadingContestants, collectionData: contestants } =
    useFirestoreCollection<ContestantType[]>(INDICES.CONTESTANTS);
  const isLoading = isLoadingCompetitions && isLoadingContestants;
  const sortedContestants = useMemo(() => {
    return (
      contestants
        ?.map((contestant) => ({
          name: contestant.shortName,
          id: contestant.id,
        }))
        .sort((contestantA, contestantB) => contestantA.id - contestantB.id) ??
      []
    );
  }, [contestants]);

  const contestantPoints = useMemo(() => {
    return (
      sortedContestants
        .map((contestant) => contestant.id)
        .map((contestantId) =>
          competitions?.reduce((acc, curr) => {
            return (
              (curr.results.find(
                (result) => result.contestantId === contestantId
              )?.points ?? 0) + acc
            );
          }, 0)
        ) ?? []
    );
  }, [competitions, sortedContestants]);

  const rowData = useMemo(() => {
    return (
      competitions?.map((competition) => [
        competition.name,
        ...competition.results
          .sort(
            (resultA, resultB) => resultA.contestantId - resultB.contestantId
          )
          .map((result) => result.points),
      ]) ?? []
    );
  }, [competitions]);

  return (
    <Page title="Leaderboard">
      <LeaderboardWrapper>
        {isLoading ? (
          <Spinner />
        ) : (
          <Table>
            <thead>
              <tr>
                <TableHeading>Øvelse</TableHeading>
                {sortedContestants.map((contestant) => (
                  <th style={{ width: 30 }} key={contestant.id}>
                    {contestant.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rowData.map((row) => (
                <tr key={row.toString()}>
                  <TableData>{row[0]}</TableData>
                  {row.map((r, idx) => {
                    if (idx === 0) return null;
                    return <TableData key={idx}>{r}</TableData>;
                  })}
                </tr>
              ))}
              <tr>
                <td style={{ textAlign: "left" }}>
                  <b>Totalt</b>
                </td>
                {contestantPoints.map((sum, idx) => (
                  <TableData key={idx}>{sum}</TableData>
                ))}
              </tr>
            </tbody>
          </Table>
        )}
      </LeaderboardWrapper>
    </Page>
  );
};

export default LeaderboardPage;
