import { Page } from "../../components/page";
import styled from "@emotion/styled";
import {
  Competition as CompetitionType,
  Contestant as ContestantType,
  Game,
} from "../../firebase/types";
import { GameColumn } from "./GameColumn";
import { useYearContext } from "../../context/YearContext";
import { INDICES } from "../../firebase/hooks/types";
import { useFirestoreCollection } from "../../firebase/hooks/useFirestoreCollection";
import Spinner from "../../components/spinner/Spinner";
import { useParams } from "react-router-dom";
import { device } from "../../utils/mixins";

const generateColumn =
  (allGames: Game[]) =>
  (gameColumn: Game[]): Game[][] => {
    const previousMatchesColumn = gameColumn.reduce((result, game) => {
      return [...result, ...allGames.filter((g) => g.nextMatchId === game.id)];
    }, [] as Game[]);

    if (previousMatchesColumn.length > 0) {
      return [
        ...generateColumn(allGames)(previousMatchesColumn),
        previousMatchesColumn,
      ];
    }
    return [previousMatchesColumn];
  };

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
`;

const Heading = styled.h3`
  color: white;
`;

const WinnerContainer = styled.div`
  margin-top: 24px;
`;

const ResultsWrapper = styled.div`
  display: flex;
  gap: 32px;
  @media ${device.FOR_PHONE_ONLY} {
    flex-direction: column;
  }
`;
export const TournamentPage = () => {
  const { id } = useParams<{ id: string }>();
  const tournamentName = id.replaceAll("-", " ");
  const { selectedYear } = useYearContext();
  const competitionIndex =
    selectedYear === "2021"
      ? INDICES.COMPETITIONS_PROD_2021
      : INDICES.COMPETITIONS_TEST_2022;
  const { collectionData: competitions, isLoading } =
    useFirestoreCollection<CompetitionType>(competitionIndex);

  const contestantIndex =
    selectedYear === "2021"
      ? INDICES.CONTESTANTS_PROD_2021
      : INDICES.CONTESTANTS_TEST_2022;
  const { isLoading: isContestantsLoading, collectionData: contestants } =
    useFirestoreCollection<ContestantType>(contestantIndex);

  if (isLoading || isContestantsLoading) {
    return <Spinner />;
  }

  const selectedCompetition = competitions?.find(
    (c) => c.name === tournamentName
  );

  if (!selectedCompetition?.tournament) {
    return (
      <Page title="Turnering">
        <p>Fant ingen turnering med navnet {tournamentName} </p>
      </Page>
    );
  }

  const lastGame = selectedCompetition.tournament.games.find(
    (game) => !game.nextMatchId
  ) as Game;
  const winner = contestants?.find((c) => c.name === lastGame?.winner?.name);
  const gameColumns = [
    ...generateColumn(selectedCompetition.tournament.games)([lastGame]),
    [lastGame],
  ];
  return (
    <Page title="Turnering">
      <PageWrapper>
        <Heading>
          {selectedCompetition.name} {selectedCompetition.icon}
        </Heading>
        <ResultsWrapper>
          {gameColumns.map((columnGams) => {
            return <GameColumn games={columnGams} />;
          })}
        </ResultsWrapper>
        {winner && <WinnerContainer>Vinner: {winner.name}</WinnerContainer>}
      </PageWrapper>
    </Page>
  );
};
