import React from "react";
import { CompetitionType } from "./types";
import styled from "@emotion/styled";

const CompetitionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 48px;
  align-items: center;
`;

const CompetitionHeader = styled.h3`
  color: white;
  margin: 0;
`;

const Text = styled.p`
  font-size: 16px;
  margin-top: 4px;
  margin-bottom: 0;
`;
const SubText = styled.p`
  font-size: 12px;
  text-align: center;
`;

type Props = {
  competition: CompetitionType;
};

export const Competition: React.FC<Props> = ({ competition }) => {
  return (
    <CompetitionContainer>
      <CompetitionHeader>
        {competition.order}. {competition.name}
      </CompetitionHeader>
      <Text>{competition.info}</Text>
      <SubText>{competition.description}</SubText>
      {competition.subCompetition?.map((subComp) => (
        <React.Fragment key={subComp.name}>
          <Text>{subComp.name}</Text>
          <SubText>{subComp.description}</SubText>
        </React.Fragment>
      ))}
      {competition.bookieFavorite && (
        <Text>
          <b>Forhåndsfavoritt:</b> {competition.bookieFavorite}
        </Text>
      )}
    </CompetitionContainer>
  );
};
