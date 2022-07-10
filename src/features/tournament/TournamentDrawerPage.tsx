import React, { useEffect, useState } from "react";
import { Page } from "../../components/page";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { Wheel } from "../../components/wheel";
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
  return (
    <Page title="Turneringstrekker!">
      <PageWrapper>
        <p>Nummeret du trekker blir spillernummeret ditt i turneringstreet!</p>
        {lastDrawnNumber && (
          <CSSTransition
            in={hasDrawnNumber}
            classNames="side-transition"
            key={hasDrawnNumber ? "drawn" : "not-drawn"}
            addEndListener={(node, done) =>
              node.addEventListener("transitionend", done, false)
            }
          >
            <h3>Ditt spillernummer ble {lastDrawnNumber}</h3>
          </CSSTransition>
        )}
        <SwitchTransition mode="out-in" key="spinning-wheel-transition">
          <CSSTransition
            key={`set-${items.length}`}
            classNames="side-transition"
            addEndListener={(node, done) =>
              node.addEventListener("transitionend", done, false)
            }
          >
            <Wheel
              size="400"
              spinTime={4000}
              items={items}
              onStartSpinning={() => {}}
              onStopSpinning={(drawnNumber) => {
                setLastDrawnNumber(parseInt(drawnNumber.name));
                setHasDrawnNumber(false);
              }}
            />
          </CSSTransition>
        </SwitchTransition>
      </PageWrapper>
    </Page>
  );
};
