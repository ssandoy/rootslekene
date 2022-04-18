import React from "react";
import styled from "@emotion/styled";
import {
  Competition as CompetitionType,
  Contestant as ContestantType,
} from "../../firebase/types";
import { Competition } from "./Competition";

const List = styled.ol`
  max-width: 600px;
  list-style-type: none;
  color: white;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-inline-start: 0;
`;

type Props = {
  competitions: CompetitionType[];
  contestants: ContestantType[];
};

export const Results: React.FC<Props> = ({ competitions, contestants }) => {
  return (
    <List>
      {competitions?.map((competition) => {
        if (competition?.results?.length) {
          return (
            <Competition competition={competition} contestants={contestants} />
          );
        }
        return null;
      })}
    </List>
  );
};
