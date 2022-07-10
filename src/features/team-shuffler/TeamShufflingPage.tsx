import React, { useEffect, useState } from "react";
import { Page } from "../../components/page";
import styled from "@emotion/styled";
import { Contestant } from "../../components/contestant";
import { useFirestoreCollection } from "../../firebase/hooks/useFirestoreCollection";
import { INDICES } from "../../firebase/hooks/types";
import { Contestant as ContestantType } from "../../firebase/types";
import Spinner from "../../components/spinner/Spinner";

// todo move out
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
  background-color: #282c34;
  border: 2px solid white;
  color: white;
  font-size: 1.2em;
  width: 80px;
  height: 80px;
`;

const TeamShufflingPage: React.FC = () => {
  const { collectionData: contestants } =
    useFirestoreCollection<ContestantType>(INDICES.CONTESTANTS_PROD_2021);
  const [team1, setTeam1] = useState<ContestantType[]>([]);
  const [team3, setTeam3] = useState<ContestantType[]>([]);
  const [team2, setTeam2] = useState<ContestantType[]>([]);
  const [team4, setTeam4] = useState<ContestantType[]>([]);
  const [hasShuffled, setHasShuffled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

    setIsLoading(true);
  }

  useEffect(() => {
    if (isLoading) {
      setHasShuffled(false);
      setTimeout(() => {
        setHasShuffled(true);
        setIsLoading(false);
      }, 3000);
    }
  }, [isLoading]);

  return (
    <Page title="Lagvelger">
      <PageWrapper>
        <ButtonGroup>
          <Button onClick={() => setTeams(true)}>2 v 2</Button>
          <Button onClick={() => setTeams(false)}>4 v 4</Button>
        </ButtonGroup>
        {isLoading && (
          <>
            <h3>Genererer lag...</h3>
            <Spinner size={50} />
          </>
        )}
        {!hasShuffled ? (
          <ContestantWrapper>
            {contestants?.map((contestant) => (
              <Contestant
                key={contestant.id}
                showDetails={false}
                contestant={contestant}
              />
            ))}
          </ContestantWrapper>
        ) : (
          <TeamsWrapper>
            <TeamWrapper>
              <TeamHeading>Lag 1</TeamHeading>
              <ContestantWrapper>
                {team1.map((contestant) => (
                  <Contestant
                    key={contestant.id}
                    contestant={contestant}
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
                    contestant={contestant}
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
                      contestant={contestant}
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
                      contestant={contestant}
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
