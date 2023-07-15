import React, { useCallback, useMemo, useState } from "react";
import { Page } from "../../components/page";
import styled from "@emotion/styled";
import { Wheel } from "../../components/wheel";
import "./styles.css";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { Challenge } from "./Challenge";
import { Stopwatch } from "../../components/stopwatch/Stopwatch";

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
  "Ta en shot",
  "Bånn en ICE",
  "Ta en shot",
  "Bånn en ICE",
  "Ta en shot",
  "Bånn en ICE",
] as const;

export type ChallengeType = (typeof CHALLENGES)[number];

const Text = styled.p`
  margin-bottom: 8px;
  text-align: center;
`;

const StopwatchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: red;
  height: 50px;
  width: 80px;
  border: 2px solid white;
  color: white;
  font-size: 1rem;
`;

const StopwatchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-top: 32px;
`;

const DoneButton = styled.button`
  background: darkgreen;
  border: none;
  color: white;
  font-weight: bold;
  padding: 16px;
`;
const DrawnContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
`;

export const ChallengeWheelPage: React.FC = () => {
  const [drawnChallenge, setDrawnChallenge] = useState<ChallengeType | null>(
    null
  );
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const [hasDrawnChallenge, setHasDrawnChallenge] = useState(false);

  const items = useMemo(() => {
    return CHALLENGES.map((challenge, i) => ({
      name: challenge,
      style: { backgroundColor: BACKGROUND_COLORS[i] },
    }));
  }, []);

  const handleStartSpinning = useCallback(() => {}, []);

  const handleStopSpinning = useCallback((drawValue) => {
    setDrawnChallenge(drawValue.name);
    setHasDrawnChallenge(true);
  }, []);

  return (
    <Page title="Øl-løypa vol 3.0 🍻">
      <PageWrapper>
        <Text> Velkommen til første etappe!</Text>
        <Text>
          Gjør utfordringen som du lander på for å komme videre til neste
          etappe. <br />
          Når utfordringen er gjennomført trykker du på "Fullført"-knappen som
          dukker opp før du løper videre.
        </Text>
        <Text>
          Sistemann i mål har ansvaret for å klikke "STOPP" for å stoppe tiden
          deres!
        </Text>
        <h4 style={{ marginBottom: 8 }}>Spin for å få din utfordring</h4>
        <SwitchTransition mode="out-in" key="spinning-wheel-transition">
          <CSSTransition
            key="set"
            classNames="side-transition"
            addEndListener={(node, done) =>
              node.addEventListener("transitionend", done, false)
            }
          >
            <Wheel
              size="400"
              items={items}
              onStartSpinning={() => {
                setIsStopwatchRunning(true);
                handleStartSpinning();
              }}
              onStopSpinning={(winner) => {
                handleStopSpinning(winner);
              }}
            />
          </CSSTransition>
        </SwitchTransition>
        {!isStopwatchRunning && !isGameOver && (
          <Text>Tiden starter når du trykker spin.</Text>
        )}
        <CSSTransition
          in={hasDrawnChallenge}
          classNames="side-transition"
          timeout={5000}
          addEndListener={(node, done) =>
            node.addEventListener("transitionend", done, false)
          }
        >
          <div>
            {drawnChallenge && (
              <DrawnContainer>
                <Challenge challenge={drawnChallenge} />{" "}
                <DoneButton
                  onClick={() => {
                    setDrawnChallenge(null);
                    setHasDrawnChallenge(false);
                  }}
                >
                  FULLFØRT
                </DoneButton>
              </DrawnContainer>
            )}
          </div>
        </CSSTransition>
        <StopwatchContainer>
          <Stopwatch isRunning={isStopwatchRunning} />
          <StopwatchButton
            onClick={() => {
              setIsGameOver(true);
              setIsStopwatchRunning(false);
            }}
          >
            STOPP
          </StopwatchButton>
        </StopwatchContainer>
      </PageWrapper>
    </Page>
  );
};
