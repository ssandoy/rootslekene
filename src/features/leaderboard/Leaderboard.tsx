import React from "react";
import { getContestantImage } from "../../components/contestant/Contestant";
import { getContestantResults } from "./domain";
import { Competition as CompetitionType } from "../../firebase/types";
import { LeaderboardContestant } from "./domain";
import styled from "@emotion/styled";
import { device } from "../../utils/mixins";

const TABLET_WIDTH = 100;
const MOBILE_WIDTH = 60;

const ContestantContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 120px;
`;

const ContestantImage = styled.img`
  @media ${device.FOR_TABLET_PORTRAIT_UP} {
    height: ${TABLET_WIDTH}px;
    width: ${TABLET_WIDTH}px;
  }
  height: ${MOBILE_WIDTH}px;
  width: ${MOBILE_WIDTH}px;
  border-radius: 50%;
`;

const RankContainer = styled.div<{ rank: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  color: white;
  height: 40px;
  width: 40px;
`;

const ResultsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media ${device.FOR_TABLET_PORTRAIT_UP} {
    gap: 10px;
  }
  gap: 4px;
`;

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 50%;
  justify-content: center;
  padding: 4px;
  width: 32px;
  background: #313640;
  align-items: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3);
`;

const RowGrid = styled.li<{ ix: number }>`
  display: grid;
  @media ${device.FOR_TABLET_PORTRAIT_UP} {
    grid-template-columns: 40px 100px 225px 60px;
    grid-gap: 32px;
  }
  grid-template-columns: 40px 75px 173px 50px;
  grid-gap: 6px;
  align-items: center;
  background-color: ${({ ix }) => (ix % 2 === 1 ? "#282c34" : "#313640")};
`;

const List = styled.ol`
  list-style-type: none;
  color: white;
  padding-inline-start: 6px;
  margin-right: 6px;
`;

const Span = styled.span``;

type Props = {
  contestants: LeaderboardContestant[];
  competitions: CompetitionType[];
};

// todo handle equal score for someone
export const Leaderboard: React.FC<Props> = ({ contestants, competitions }) => {
  return (
    <List>
      <RowGrid ix={1}>
        <strong>Rank</strong>
        <strong style={{ textAlign: "center" }}>Utøver</strong>
        <strong>Øvelser</strong>
        <strong style={{ textAlign: "center" }}>Poeng</strong>
      </RowGrid>
      <hr
        style={{
          width: "100%",
          height: "1px",
          border: "none",
          backgroundColor: "white",
        }}
      />
      {contestants.map((contestant, idx) => (
        <RowGrid key={contestant.id} ix={idx}>
          <RankContainer rank={idx + 1}>{idx + 1}</RankContainer>
          <ContestantContainer>
            <ContestantImage src={getContestantImage(contestant.id)} />
          </ContestantContainer>
          <ResultsContainer>
            {getContestantResults(competitions)({
              id: contestant.id,
            }).map((result) => {
              return (
                <ResultContainer>
                  <Span>{result.icon}</Span>
                  <Span>{result?.points}p</Span>
                </ResultContainer>
              );
            })}
          </ResultsContainer>
          <strong style={{ textAlign: "center", fontSize: "0.9em" }}>
            {contestant?.totalPoints}p
          </strong>
        </RowGrid>
      ))}
    </List>
  );
};
