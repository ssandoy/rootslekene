// TODO
// integrate with firebase and render tournament

import { Page } from "../../components/page";
import styled from "@emotion/styled";
import { Contestant } from "../../firebase/types";
import { GameResult } from "./GameResult";
import { GameColumn } from "./GameColumn";

type Participant = {
  name: string;
  isWinner?: boolean;
  resultText?: string | null;
};

export type Game = {
  contestantA: Participant; // todo remve
  contestantB: Participant;
  result?: string;
  winner?: Participant;
  id: number;
  nextMatchId: number | null;
};

type Tournament = {
  // todo how to connect these
  name: string;
  description?: string;
  games: Game[];
};

const DUMMY_DATA: Tournament = {
  name: "Gladiator",
  games: [
    {
      contestantA: { name: "Sander", isWinner: true, resultText: "1" },
      contestantB: { name: "Eirik", isWinner: false, resultText: "0" },
      nextMatchId: 5,
      id: 1,
    },
    {
      contestantA: { name: "Simon", isWinner: false, resultText: "1" },
      contestantB: { name: "Peder", isWinner: true, resultText: "2" },
      nextMatchId: 5,
      id: 2,
    },
    {
      contestantA: { name: "Mathias", isWinner: false, resultText: "1" },
      contestantB: { name: "Eskil", isWinner: true, resultText: "2" },
      nextMatchId: 6,
      id: 3,
    },
    {
      contestantA: { name: "Larsi", isWinner: false, resultText: "1" },
      contestantB: { name: "Robert", isWinner: true, resultText: "2" },
      nextMatchId: 6,
      id: 4,
    },
    {
      contestantA: { name: "Sander", isWinner: false },
      contestantB: { name: "Peder", isWinner: false },
      nextMatchId: 7,
      id: 5,
    },
    {
      contestantA: { name: "Eskil", isWinner: false },
      contestantB: { name: "Robert", isWinner: false },
      nextMatchId: 7,
      id: 6,
    },
    {
      contestantA: { name: "Vinner kamp 5", isWinner: false },
      contestantB: { name: "Vinner kamp 6", isWinner: false },
      nextMatchId: null,
      id: 7,
    },
  ],
};

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
`;

const ResultsWrapper = styled.div`
  display: flex;
  gap: 32px;
`;
export const TournamentPage = () => {
  const lastGame = DUMMY_DATA.games.find((game) => !game.nextMatchId) as Game;
  const gameColumns = [
    ...generateColumn(DUMMY_DATA.games)([lastGame]),
    [lastGame],
  ]; // todo assert need for
  console.log(gameColumns);
  return (
    <Page title={DUMMY_DATA.name}>
      <PageWrapper>
        <p>TURNERING KJØH</p>
        <ResultsWrapper>
          {gameColumns.map((columnGams) => {
            return <GameColumn games={columnGams} />;
          })}
        </ResultsWrapper>
      </PageWrapper>
    </Page>
  );
};
