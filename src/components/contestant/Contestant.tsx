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
import { ContestantNames } from "../../data/contestants/contestants";

const ContestantContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 16px;
  align-items: center;
  padding: 42px 24px 24px 24px;
  border: 1px solid white;
`;

const XPText = styled.p`
  position: absolute;
  right: 0;
  top: 0;
  font-size: 14px;
  color: #282c34;
  margin: 0;
  padding: 6px;
  background-color: white;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
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

export function getContestantImage(contestantName: ContestantNames) {
  // todo store imagePath instead of this hardcoding
  switch (contestantName) {
    case "Sander":
      return sander;
    case "Eirik":
      return gegg;
    case "Larsi":
      return larsi;
    case "Mathias":
      return mattis;
    case "Robert":
      return rob;
    case "Simon":
      return simon;
    case "Eskil":
      return eskil;
    case "Peder":
      return peder;
  }
}

// før og etter bilde mtp alkohol?
export const Contestant: React.FC<Props> = ({
  contestant,
  showDetails = true,
}) => {
  return (
    <ContestantContainer>
      <ContestantImage
        src={getContestantImage(contestant.name as ContestantNames)}
      />
      {contestant.lastYearPlacement && (
        <XPText>{contestant.lastYearPlacement}. PLASS I 2021</XPText>
      )}
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
            {contestant.expectedPromille && (
              <Text>
                <b>xP (expected promille): </b>
                {contestant.expectedPromille.toFixed(2).slice(0, 4)}
              </Text>
            )}
          </>
        )}
      </InfoWrapper>
    </ContestantContainer>
  );
};

export default Contestant;
