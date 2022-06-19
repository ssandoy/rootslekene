import React from "react";
import { Contestant as ContestantType } from "../../firebase/types";
import styled from "@emotion/styled";
import {
  eskil,
  gegg,
  larsi,
  mattis,
  peder,
  rob,
  sander,
  simon,
} from "../../images";
import {
  EIRIK_ID,
  ESKIL_ID,
  LP_ID,
  MATHIAS_ID,
  PEDER_ID,
  ROBERT_ID,
  SANDER_ID,
  SIMON_ID,
} from "../../data/contestants/contestants";

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
  showDetails?: boolean;
};

export function getContestantImage(imageUrl: number) {
  // todo store imagePath instead of this hardcoding
  switch (imageUrl) {
    case SANDER_ID:
      return sander;
    case EIRIK_ID:
      return gegg;
    case LP_ID:
      return larsi;
    case MATHIAS_ID:
      return mattis;
    case ROBERT_ID:
      return rob;
    case SIMON_ID:
      return simon;
    case ESKIL_ID:
      return eskil;
    case PEDER_ID:
      return peder;
  }
  return "";
}

export const Contestant: React.FC<Props> = ({
  contestant,
  showDetails = true,
}) => {
  return (
    <ContestantContainer>
      <ContestantImage src={getContestantImage(contestant.id)} />
      <InfoWrapper>
        <Text style={{ textAlign: "center", marginTop: 12, marginBottom: 8 }}>
          {contestant.name}
        </Text>
        {showDetails && (
          <>
            <Text>
              <b>Alder:</b> {contestant.age}
            </Text>
            <Text>
              <b>Styrke:</b> {contestant.strength}
            </Text>
            <Text>
              <b>Svakhet:</b> {contestant.weakness}
            </Text>
          </>
        )}
      </InfoWrapper>
    </ContestantContainer>
  );
};

export default Contestant;
