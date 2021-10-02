import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { IntroPage } from "./features/intro";
import { CompetitionsPage } from "./features/competitions";
import { NavLink } from "./components/nav-link";
import styled from "@emotion/styled";
import { Header } from "./components/header";
import { ContestantsPage } from "./features/contestants";
import { LeaderboardPage } from "./features/leaderbord";
import { TeamShufflingPage } from "./features/team-shuffler";
import { FeatureRoute } from "./routes";
import {
  COMPETITIONS_ROUTE,
  CONTESTANTS_ROUTE,
  INTRO_ROUTE,
  LEADERBOARD_ROUTE,
  TEAM_SHUFFLER_ROUTE,
} from "./routes/routes";
import { YearProvider } from "./context/YearContext";
import { TabGroup } from "./components/tab-group";

const AppContainerDiv = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const App = () => {
  return (
    <YearProvider>
      <Router>
        <AppContainerDiv>
          <Header />
          <TabGroup />
          <NavContainer>
            <NavLink route={INTRO_ROUTE} title="Info" />
            <NavLink route={COMPETITIONS_ROUTE} title="Konkurranser" />
            <NavLink route={CONTESTANTS_ROUTE} title="Deltakere" />
            <NavLink route={LEADERBOARD_ROUTE} title="Leaderboard" />
          </NavContainer>
          <Switch>
            <Route exact path={["/", INTRO_ROUTE]} component={IntroPage} />
            <FeatureRoute
              exact
              title="Konkurranser"
              path={COMPETITIONS_ROUTE}
              component={CompetitionsPage}
            />
            <FeatureRoute
              title="Deltakere"
              exact
              path={CONTESTANTS_ROUTE}
              component={ContestantsPage}
            />
            <FeatureRoute
              title="Leaderboard"
              exact
              path={LEADERBOARD_ROUTE}
              component={LeaderboardPage}
            />
            <FeatureRoute
              title="Lagvelger"
              exact
              path={TEAM_SHUFFLER_ROUTE}
              component={TeamShufflingPage}
            />
          </Switch>
        </AppContainerDiv>
      </Router>
    </YearProvider>
  );
};

export default App;
