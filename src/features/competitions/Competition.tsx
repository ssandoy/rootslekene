import React from "react";
import styled from "@emotion/styled";
import { Competition as CompetitionType } from "../../firebase/types";
import { Link } from "react-router-dom";
import { formatTournamentRoute } from "../../routes/routes";

const CompetitionContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;
  padding: 36px 24px;
  border: 1px solid white;
`;

const CompetitionHeader = styled.h3`
  color: white;
  margin: 0;
`;

const SubCompetitionHeader = styled.h4`
  font-size: 0.9rem;
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
  margin: 0;
  font-weight: lighter;
`;

const FavoriteText = styled.p`
  position: absolute;
  right: 0;
  top: 0;
  font-size: 12px;
  color: #282c34;
  margin: 0;
  padding: 6px;
  background-color: white;
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
        <div style={{ marginTop: 16 }} key={subComp.name}>
          <SubCompetitionHeader>
            {subComp.name.toUpperCase()}
          </SubCompetitionHeader>
          <SubText>{subComp.description}</SubText>
        </div>
      ))}
      {competition.bookieFavorite ? (
        <FavoriteText>
          FAVORITT: &nbsp;{competition.bookieFavorite.toUpperCase()}
        </FavoriteText>
      ) : (
        <FavoriteText>INGEN FAVORITT</FavoriteText>
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
