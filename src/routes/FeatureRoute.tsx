import React from "react";
import { Route } from "react-router-dom";
import Countdown from "react-countdown";
import styled from "@emotion/styled";

interface Props {
  component: React.FC;
  title: string;
  exact: boolean;
  path: string;
}

const CountdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HorinzontalLine = styled.hr`
  width: 200px;
`;

const Title = styled.h2`
  color: white;
`;

export const OPEN_DATE = new Date("July 16, 2021 20:00:00");

const renderer = ({
  days,
  hours,
  minutes,
  seconds,
  completed,
  title,
  component: Component,
}: any) => {
  if (!completed) {
    return (
      <CountdownWrapper>
        <Title>{title}</Title>
        <h5 style={{ color: "white", textAlign: "center", margin: 24 }}>
          Fredag 16. juli kl. 20:00 offentliggjøres deltakerliste og
          konkurranser!
        </h5>
        <HorinzontalLine />
        <p>
          ⌛ {days}d {hours}t {minutes}m og {seconds}s ⌛
        </p>
      </CountdownWrapper>
    );
  }
  return <Component />;
};

const FeatureRoute: React.FC<Props> = ({
  component: Component,
  title,
  ...rest
}: Props) => {
  return (
    <Route {...rest}>
      {(props) => (
        // fixme duplicate title
        <Countdown
          date={OPEN_DATE}
          renderer={(props) =>
            renderer({
              ...props,
              title,
              //  @ts-ignore
              component: () => <Component {...props} />,
            })
          }
        />
      )}
    </Route>
  );
};

export default FeatureRoute;
