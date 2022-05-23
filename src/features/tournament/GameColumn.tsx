import React from "react";
import { GameResult } from "./GameResult";
import styled from "@emotion/styled";
import { Game } from "../../firebase/types";

type Props = {
  games: Game[];
};

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 16px;
`;

export const GameColumn: React.FC<Props> = ({ games }) => {
  return (
    <Column>
      {games.map((game) => (
        <GameResult game={game} />
      ))}
    </Column>
  );
};
