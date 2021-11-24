import React, { useState } from "react";
import { Page } from "../../components/page";
import styled from "@emotion/styled";
import { Wheel } from "../../components/wheel";
import { Contestant as ContestantType } from "../../firebase/types";
import { useFirestoreCollection } from "../../firebase/hooks/useFirestoreCollection";
import { INDICES } from "../../firebase/hooks/types";
import { Contestant } from "../../components/contestant";
import Spinner from "../../components/spinner/Spinner";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const BACKGROUND_COLORS = [
  "#ff4c5a",
  "#f08cba",
  "#49c4d2",
  "#924e84",
  "#fd926f",
  "#245a65",
  "#f7d046",
  "#ff6a76",
  "#633d89",
  "#f7d046",
];

const CHALLENGES = ["SHOT", "BÅNNSKI", "TYP", "TAPP", "TIPP", "TOPP"];

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const getWinningContestant =
  (winnerName: string) => (contestants: ContestantType[]) =>
    contestants.find((contestant) => contestant.name === winnerName);

const SpinningWheelPage: React.FC = () => {
  const [winningContestant, setWinningContestant] =
    useState<ContestantType | null>(null);
  const { isLoading, collectionData: contestants } =
    useFirestoreCollection<ContestantType>(INDICES.CONTESTANTS_PROD_2021);

  if (isLoading) {
    return <Spinner />;
  }

  // todo animations when transisting and make it nice and smooth
  // todo classname-enter in css?
  return (
    <Page title="Utfordring">
      <PageWrapper>
        {!winningContestant ? (
          <TransitionGroup
            transitionName="fade"
            transitionEnterTimeout={5000}
            transitionLeaveTimeout={3000}
          >
            <Wheel
              size="450"
              // todo size for mobile
              items={
                contestants?.map((contestant, i) => {
                  return {
                    name: contestant.name,
                    style: {
                      backgroundColor: BACKGROUND_COLORS[i],
                    },
                  };
                }) ?? []
              }
              onStartSpinning={() => {
                setWinningContestant(null);
              }}
              onStopSpinning={(winner) => {
                setWinningContestant(
                  getWinningContestant(winner.name)(contestants ?? []) ?? null
                );
              }}
            />
          </TransitionGroup>
        ) : (
          <>
            <Contestant contestant={winningContestant} showDetails={false} />
            <Wheel
              size="500"
              items={CHALLENGES.map((challenge, i) => ({
                name: challenge,
                style: { backgroundColor: BACKGROUND_COLORS[i] },
              }))}
            />
          </>
        )}
      </PageWrapper>
    </Page>
  );
};

export default SpinningWheelPage;
