import React from "react";
import styled from "@emotion/styled";
import { Competition as CompetitionType } from "../../firebase/types";
import { Link } from "react-router-dom";
import { formatTournamentRoute } from "../../routes/routes";

const CompetitionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;
  padding: 24px;
  border: 1px solid white;
`;

const CompetitionHeader = styled.h3`
  color: white;
  margin: 0;
`;

const TournamentContainer = styled.div`
  margin-top: 8px;
`;

const Text = styled.p`
  font-size: 16px;
  margin-top: 4px;
  margin-bottom: 0;
  font-weight: lighter;
`;
const SubText = styled.p`
  font-size: 14px;
`;

const FavoriteText = styled.p`
  font-size: 16px;
  color: #fca26a;
  margin-bottom: 0;
`;

type Props = {
  competition: CompetitionType;
};

export const Competition: React.FC<Props> = ({ competition }) => {
  return (
    <CompetitionContainer>
      <CompetitionHeader>
        {competition.name.toUpperCase()} {competition.icon}
      </CompetitionHeader>
      <Text>
        {competition.info}&nbsp;
        {competition.description}
      </Text>
      {competition.subCompetition?.map((subComp) => (
        <React.Fragment key={subComp.name}>
          <Text>{subComp.name}</Text>
          <SubText>{subComp.description}</SubText>
        </React.Fragment>
      ))}
      {competition.bookieFavorite && (
        <FavoriteText>
          FORHÅNDSFAVORITT: &nbsp;{competition.bookieFavorite.toUpperCase()}
        </FavoriteText>
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
