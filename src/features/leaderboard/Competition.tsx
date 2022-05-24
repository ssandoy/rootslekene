import {
  Competition as CompetitionType,
  Contestant,
} from "../../firebase/types";
import React from "react";
import styled from "@emotion/styled";

type Props = {
  competition: CompetitionType;
  contestants: Contestant[];
};

const ResultsContainer = styled.div`
  display: grid;
  grid-template-columns: 30px 1fr 30px 1fr;
  margin-bottom: 20px;
  gap: 4px;
`;

const Heading = styled.h3`
  margin-bottom: 8px;
`;

const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid white;
  background-color: #313640;
  margin: 8px;
  border-radius: 8px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
  padding: 0 24px;
`;

export const Competition: React.FC<Props> = ({ competition, contestants }) => {
  const sortedResults = competition.results?.sort(
    (a, b) => b.points - a.points
  );
  return (
    <ListItem>
      <Heading>
        {competition.icon} {competition.name}
      </Heading>
      <ResultsContainer>
        {sortedResults?.map((result) => {
          return (
            <>
              <span>{result.points}p</span>
              <span>
                {contestants.find((c) => c.id === result.contestantId)?.name}
              </span>
            </>
          );
        })}
      </ResultsContainer>
    </ListItem>
  );
};
