import React, { useRef, useState } from "react";
import styled from "@emotion/styled";
import { WheelItem } from "./types";
import { WheelCanvas } from "./WheelCanvas";
import { getRotationDegrees } from "./utils";
import { Arrow } from "./Arrow";
import { RotationContainer } from "./styles";
import { nanoid } from "nanoid";

const START_SPINNING_TIME = 2600;
const CONTINUE_SPINNING_TIME = 750;
const STOP_SPINNING_TIME = 6000; // todo tweak

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

type Props = {
  size: string;
  items: WheelItem[];
  onStopSpinning?: (winner: WheelItem) => void;
  onStartSpinning?: () => void;
};

const ArrowContainer = styled.div`
  position: absolute;
  left: 42.5%;
  bottom: -30px;
`;

const Button = styled.button`
  background-color: red;
  color: white;
  border-radius: 20px;
  border: 1px solid white;
  width: 100px;
  height: 50px;
  margin-top: 50px;
  font-weight: bold;
`;

const getRotationClass = (hasStartedSpinning: boolean) =>
  hasStartedSpinning ? "started-spinning" : "";

const Wheel: React.FC<Props> = ({
  items,
  size,
  onStopSpinning,
  onStartSpinning,
}) => {
  const [hasStartedSpinning, setHasStartedSpinning] = useState(false);
  const [finalRotationDegrees, setFinalRotationDegrees] = useState(0);
  const rotationKey = useRef(nanoid());
  const mustStopSpinning = useRef(false);
  const winner = useRef(0);

  const startSpinning = () => {
    rotationKey.current = nanoid();
    setHasStartedSpinning(true);
    winner.current = Math.floor(Math.random() * items.length);
    setFinalRotationDegrees(getRotationDegrees(winner.current, items.length));
    mustStopSpinning.current = true;
    onStartSpinning?.();
    setTimeout(() => {
      if (mustStopSpinning.current) {
        mustStopSpinning.current = false;
        onStopSpinning?.(items[winner.current]);
      }
    }, START_SPINNING_TIME + CONTINUE_SPINNING_TIME + STOP_SPINNING_TIME + 1000);
  };

  // todo selected item as prop to outline it?
  return (
    <Container>
      <div style={{ position: "relative" }}>
        <RotationContainer
          key={rotationKey.current}
          startSpinningTime={START_SPINNING_TIME}
          stopSpinningTime={STOP_SPINNING_TIME}
          continueSpinningTime={CONTINUE_SPINNING_TIME}
          className={getRotationClass(hasStartedSpinning)}
          startRotationDegrees={0}
          finalRotationDegrees={finalRotationDegrees}
        >
          <WheelCanvas items={items} width={size} height={size} />
        </RotationContainer>
        <ArrowContainer>
          <Arrow />
        </ArrowContainer>
      </div>
      <Button
        onClick={() => {
          startSpinning();
        }}
      >
        SPIN
      </Button>
    </Container>
  );
};

export default Wheel;
