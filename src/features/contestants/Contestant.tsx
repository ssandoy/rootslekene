import React from "react";
import { ContestantType } from "./types";
import styled from "@emotion/styled";

const ContestantContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px;
  align-items: center;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 220px;
  //align-items: center;
`;

const ContestantImage = styled.img`
  border-radius: 50%;
  width: 200px;
  height: 200px;
`;

const Text = styled.p`
  color: white;
  margin: 4px;
`;

type Props = {
  contestant: ContestantType;
};

export const Contestant: React.FC<Props> = ({ contestant }) => {
  return (
    <ContestantContainer>
      <ContestantImage src={contestant.imageUrl} />
      <InfoWrapper>
        <Text style={{ textAlign: "center", marginTop: 12, marginBottom: 8 }}>
          {contestant.name}
        </Text>
        <Text>
          <b>Alder:</b> {contestant.age}
        </Text>
        <Text>
          <b>Styrke:</b> {contestant.strength}
        </Text>
        <Text>
          <b>Svakhet:</b> {contestant.weakness}
        </Text>
      </InfoWrapper>
    </ContestantContainer>
  );
};

export default Contestant;
