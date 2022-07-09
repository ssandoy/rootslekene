import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

type Props = {
  isRunning: boolean;
};

const Container = styled.div`
  color: white;
  border: 1px solid white;
  padding: 8px;
  font-size: 2rem;
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: monospace;
`;

export const Stopwatch: React.FC<Props> = ({ isRunning }) => {
  const [time, setTime] = useState(0);
  useEffect(() => {
    // @ts-ignore
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!isRunning) {
      clearInterval(interval);
    }
    // @ts-ignore
    return () => clearInterval(interval);
  }, [isRunning]);
  return (
    <Container>
      <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
      <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
      <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
    </Container>
  );
};
