import React from "react";
import styled from "@emotion/styled";
import { Competition as CompetitionType } from "../../firebase/types";
import { Link } from "react-router-dom";
import { formatTournamentRoute } from "../../routes/routes";

const CompetitionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 48px;
  align-items: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);
  padding: 16px;
  border: 1px solid white;
  border-radius: 8px;
`;

const CompetitionHeader = styled.h3`
  color: white;
  margin: 0;
`;

const TournamentContainer = styled.div`
  margin: 8px;
`;

const Text = styled.p`
  text-align: center;
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
        {competition.name} {competition.icon}
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
      {competition.tournament && (
        <TournamentContainer>
          <Link
            style={{ textDecorationColor: "white" }}
            to={formatTournamentRoute(competition.name)}
          >
            <Text style={{ fontSize: 17 }}>
              <b>Turneringskart 🏟</b>
            </Text>
          </Link>
        </TournamentContainer>
      )}
    </CompetitionContainer>
  );
};
