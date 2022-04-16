import React, { useEffect, useMemo, useState } from "react";
import { Page } from "../../components/page";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { Challenge } from "../challenges/Challenge";
import { Wheel } from "../../components/wheel";
import { ChallengeType } from "../challenges/ChallengeWheelPage";
import styled from "@emotion/styled";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

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

export const TournamentDrawerPage: React.FC = () => {
  const [items, setItems] = useState(
    [...Array(8)].map((_, index) => ({
      name: `${index + 1}`,
      style: {
        backgroundColor: BACKGROUND_COLORS[index],
        textColor: "white",
      },
    }))
  );
  const [lastDrawnNumber, setLastDrawnNumber] = useState<number | null>(null);
  const [hasDrawnNumber, setHasDrawnNumber] = useState(false);

  useEffect(() => {
    setItems((prevState) =>
      prevState.filter((item) => parseInt(item.name) !== lastDrawnNumber)
    );
  }, [lastDrawnNumber]);
  // todo vise trukket nummer
  return (
    <Page title="Turneringstrekker!">
      <PageWrapper>
        <p>Nummeret du trekker blir plassen din i turneringstreet!</p>
        {lastDrawnNumber && (
          <CSSTransition
            in={hasDrawnNumber}
            classNames="side-transition"
            key={hasDrawnNumber ? "drawn" : "not-drawn"}
            addEndListener={(node, done) =>
              node.addEventListener("transitionend", done, false)
            }
          >
            <p>
              Siste trukket nummer: <b>{lastDrawnNumber}</b>
            </p>
          </CSSTransition>
        )}
        <SwitchTransition mode="out-in" key="spinning-wheel-transition">
          <CSSTransition
            key={lastDrawnNumber ? "set" : "unset"}
            classNames="side-transition"
            addEndListener={(node, done) =>
              node.addEventListener("transitionend", done, false)
            }
          >
            <Wheel
              size="400"
              items={items}
              onStartSpinning={() => {}}
              onStopSpinning={(drawnNumber) => {
                setLastDrawnNumber(parseInt(drawnNumber.name));
              }}
            />
          </CSSTransition>
        </SwitchTransition>
      </PageWrapper>
    </Page>
  );
};
