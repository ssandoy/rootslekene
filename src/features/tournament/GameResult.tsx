import { Game } from "./TournamentPage";
import React from "react";
import styled from "@emotion/styled";
import { device } from "../../utils/mixins";

type Props = {
  game: Game;
};

const GameContainer = styled.div`
  display: grid;
  grid-template-columns: 30px 1fr;
  grid-template-rows: 1fr 1fr;
  padding: 8px;
  background-color: #61dafb;
  border: 1px solid grey;
  min-width: 150px;
`;

const ContestantContainer = styled.div<{ isWinner: boolean }>`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  font-weight: ${({ isWinner }) => (isWinner ? "bold" : "normal")};
`;

const MatchIdContainer = styled.div`
  grid-row: 1/3;
  align-self: center;
  color: grey;
`;

export const GameResult: React.FC<Props> = ({ game }) => {
  return (
    <GameContainer>
      <MatchIdContainer>#{game.id}</MatchIdContainer>
      <ContestantContainer isWinner={game.contestantA.isWinner ?? false}>
        <span>{game.contestantA.name}</span>
        <span>{game.contestantA.resultText}</span>
      </ContestantContainer>
      <ContestantContainer isWinner={game.contestantB.isWinner ?? false}>
        <span>{game.contestantB.name}</span>
        <span>{game.contestantB.resultText}</span>
      </ContestantContainer>
    </GameContainer>
  );
};
