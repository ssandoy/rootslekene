import React, { useState } from "react";
import { Page } from "../../components/page";
import styled from "@emotion/styled";
import { Contestant } from "../../components/contestant";
import { ContestantType } from "../contestants/types";
import { useFirestoreCollection } from "../../firebase/hooks/useFirestoreCollection";
import { INDICES } from "../../firebase/hooks/types";

type TeamContestant = {
  id: number;
  imageUrl: string;
  name: string;
};

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TeamsWrapper = styled.div`
  display: flex;
  width: 80vw;
  max-width: 1200px;
  justify-content: space-evenly;
`;

const TeamWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContestantWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const TeamHeading = styled.h2`
  color: white;
  text-align: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  width: 200px;
  justify-content: space-around;
`;

const Button = styled.button`
  background-color: #ff9e5e;
  border-color: transparent;
  border-radius: 50%;
  width: 50px;
  height: 50px;
`;

const TeamShufflingPage: React.FC = () => {
  const { collectionData: contestants } = useFirestoreCollection<
    ContestantType[]
  >(INDICES.CONTESTANTS);
  const [team1, setTeam1] = useState<TeamContestant[]>([]);
  const [team2, setTeam2] = useState<TeamContestant[]>([]);
  const [team3, setTeam3] = useState<TeamContestant[]>([]);
  const [team4, setTeam4] = useState<TeamContestant[]>([]);
  const [hasShuffled, setHasShuffled] = useState(false);

  function setTeams(setFourTeams: boolean) {
    const arr = [];
    const oldArr = contestants?.slice();
    while (arr.length < 4) {
      arr.push(
        oldArr?.splice(Math.floor(Math.random() * oldArr.length), 1)[0] ??
          ({} as ContestantType)
      );
    }
    if (setFourTeams) {
      setTeam1(arr.slice(0, 2));
      setTeam2(arr.slice(2, 4));
      setTeam3([...(oldArr?.slice(0, 2) ?? [])]);
      setTeam4([...(oldArr?.slice(2, 4) ?? [])]);
    } else {
      setTeam1(arr.slice(0, 4));
      setTeam2([...(oldArr ?? [])]);
      setTeam3([]);
      setTeam4([]);
    }

    setHasShuffled(true);
  }

  return (
    <Page title="Lagvelger">
      <PageWrapper>
        <ButtonGroup>
          <Button onClick={() => setTeams(true)}>2 v 2</Button>
          <Button onClick={() => setTeams(false)}>4 v 4</Button>
        </ButtonGroup>
        {!hasShuffled ? (
          contestants?.map((contestant) => (
            <Contestant
              key={contestant.id}
              showDetails={false}
              contestant={contestant as ContestantType}
            />
          ))
        ) : (
          <TeamsWrapper>
            <TeamWrapper>
              <TeamHeading>Lag 1</TeamHeading>
              <ContestantWrapper>
                {team1.map((contestant) => (
                  <Contestant
                    key={contestant.id}
                    contestant={contestant as ContestantType}
                    showDetails={false}
                  />
                ))}
              </ContestantWrapper>
            </TeamWrapper>
            <TeamWrapper>
              <TeamHeading>Lag 2</TeamHeading>
              <ContestantWrapper>
                {team2.map((contestant) => (
                  <Contestant
                    key={contestant.id}
                    contestant={contestant as ContestantType}
                    showDetails={false}
                  />
                ))}
              </ContestantWrapper>
            </TeamWrapper>
            {!!team3.length && (
              <TeamWrapper>
                <TeamHeading>Lag 3</TeamHeading>
                <ContestantWrapper>
                  {team3.map((contestant) => (
                    <Contestant
                      key={contestant.id}
                      contestant={contestant as ContestantType}
                      showDetails={false}
                    />
                  ))}
                </ContestantWrapper>
              </TeamWrapper>
            )}
            {!!team4.length && (
              <TeamWrapper>
                <TeamHeading>Lag 4</TeamHeading>
                <ContestantWrapper>
                  {team4.map((contestant) => (
                    <Contestant
                      key={contestant.id}
                      contestant={contestant as ContestantType}
                      showDetails={false}
                    />
                  ))}
                </ContestantWrapper>
              </TeamWrapper>
            )}
          </TeamsWrapper>
        )}
      </PageWrapper>
    </Page>
  );
};

export default TeamShufflingPage;
