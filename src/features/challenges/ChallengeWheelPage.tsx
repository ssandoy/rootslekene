import React, { useCallback, useMemo, useState } from "react";
import { Page } from "../../components/page";
import styled from "@emotion/styled";
import { Wheel } from "../../components/wheel";
import { Contestant as ContestantType } from "../../firebase/types";
import { useFirestoreCollection } from "../../firebase/hooks/useFirestoreCollection";
import { INDICES } from "../../firebase/hooks/types";
import Spinner from "../../components/spinner/Spinner";
import "./styles.css";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { Challenge } from "./Challenge";

const BACKGROUND_COLORS = [
  "#56CCF2",
  "#BB6BD9",
  "#27AE60",
  "#EB5757",
  "#F2C94C",
  "#2F80ED",
  "#633d89",
  "#F2994A",
];

const CHALLENGES = [
  "Shot",
  "Bånne en øl",
  "10 pushup",
  "ICE-ing på tid",
  "Todo",
  "Todo",
] as const;

export type ChallengeType = typeof CHALLENGES[number];

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
`;

const getWinningContestant =
  (winnerName: string) => (contestants: ContestantType[]) =>
    contestants.find((contestant) => contestant.name === winnerName);

export const ChallengeWheelPage: React.FC = () => {
  const [drawnContestant, setDrawnContestant] = useState<ContestantType | null>(
    null
  );

  const [drawnChallenge, setDrawnChallenge] = useState<ChallengeType | null>(
    null
  );

  const [hasDrawnContestant, setHasDrawnContestant] = useState(false);
  const [hasDrawnChallenge, setHasDrawnChallenge] = useState(false);
  const { isLoading, collectionData: contestants } =
    useFirestoreCollection<ContestantType>(INDICES.CONTESTANTS_PROD_2021);

  const items = useMemo(() => {
    return drawnContestant
      ? CHALLENGES.map((challenge, i) => ({
          name: challenge,
          style: { backgroundColor: BACKGROUND_COLORS[i] },
        }))
      : contestants?.map((contestant, i) => {
          return {
            name: contestant.name,
            style: {
              backgroundColor: BACKGROUND_COLORS[i],
              textColor: "white",
            },
          };
        }) ?? [];
  }, [drawnContestant, contestants]);

  const handleStartSpinning = useCallback(() => {}, []);

  const handleStopSpinning = useCallback(
    (drawValue) => {
      if (!drawnContestant) {
        setDrawnContestant(
          getWinningContestant(drawValue.name)(contestants ?? []) ?? null
        );
        setHasDrawnContestant(true);
      } else {
        setDrawnChallenge(drawValue.name);
        setHasDrawnChallenge(true);
      }
    },
    [drawnContestant, contestants]
  );

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Page title="Spin the wheel!">
      <PageWrapper>
        {!drawnContestant && <p>Hvem lander hjulet på da, troo?</p>}
        {drawnContestant && (
          <>
            <SwitchTransition mode="out-in" key="drawn-contestant-transition">
              <CSSTransition
                in={hasDrawnChallenge}
                classNames="side-transition"
                key={hasDrawnChallenge ? "drawn-challenge" : "intro-text"}
                addEndListener={(node, done) =>
                  node.addEventListener("transitionend", done, false)
                }
              >
                <div>
                  {drawnChallenge ? (
                    <Challenge challenge={drawnChallenge} />
                  ) : (
                    <p>
                      Hva må <b>{drawnContestant.name}</b> gjøre daa?
                    </p>
                  )}
                </div>
              </CSSTransition>
            </SwitchTransition>
          </>
        )}
        <SwitchTransition mode="out-in" key="spinning-wheel-transition">
          <CSSTransition
            key={hasDrawnContestant ? "set" : "unset"}
            classNames="side-transition"
            addEndListener={(node, done) =>
              node.addEventListener("transitionend", done, false)
            }
          >
            <Wheel
              size="400"
              items={items}
              onStartSpinning={() => {
                handleStartSpinning();
              }}
              onStopSpinning={(winner) => {
                handleStopSpinning(winner);
              }}
            />
          </CSSTransition>
        </SwitchTransition>
      </PageWrapper>
    </Page>
  );
};
