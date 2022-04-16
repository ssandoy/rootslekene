import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { IntroPage } from "./features/intro";
import { CompetitionsPage } from "./features/competitions";
import { NavLink } from "./components/nav-link";
import styled from "@emotion/styled";
import { Header } from "./components/header";
import { ContestantsPage } from "./features/contestants";
import { LeaderboardPage } from "./features/leaderboard";
import { TeamShufflingPage } from "./features/team-shuffler";
import { FeatureRoute } from "./routes";
import {
  COMPETITIONS_ROUTE,
  CONTESTANTS_ROUTE,
  INTRO_ROUTE,
  LEADERBOARD_ROUTE,
  SPINNING_WHEEL_ROUTE,
  TEAM_SHUFFLER_ROUTE,
  TOURNAMENT_DRAWER_ROUTE,
  TOURNAMENT_ROUTE,
} from "./routes/routes";
import { useYearContext } from "./context/YearContext";
import { ChallengeWheelPage } from "./features/challenges/ChallengeWheelPage";
import { TabGroup } from "./components/tab-group";
import { TournamentDrawerPage } from "./features/tournament/TournamentDrawerPage";
import { TournamentPage } from "./features/tournament/TournamentPage";

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
  const { selectedYear, setSelectedYear } = useYearContext();
  return (
    <Router>
      <AppContainerDiv>
        <Header />
        <TabGroup
          buttons={[
            {
              text: "2021",
              isActive: selectedYear === "2021",
              onClick: () => setSelectedYear("2021"),
            },
            {
              text: "2022",
              isActive: selectedYear === "2022",
              onClick: () => setSelectedYear("2022"),
            },
          ]}
        />
        <NavContainer>
          <NavLink route={INTRO_ROUTE} title="Info" />
          <NavLink route={COMPETITIONS_ROUTE} title="Konkurranser" />
          <NavLink route={CONTESTANTS_ROUTE} title="Deltakere" />
          <NavLink route={LEADERBOARD_ROUTE} title="Resultater" />
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
            title="Resultater"
              exact
              path={LEADERBOARD_ROUTE}
              component={LeaderboardPage}
            />
            <FeatureRoute
              title="Utfordring"
              exact
              path={SPINNING_WHEEL_ROUTE}
              component={ChallengeWheelPage}
            />
            <FeatureRoute
              title="Lagvelger"
              exact
              path={TEAM_SHUFFLER_ROUTE}
              component={TeamShufflingPage}
            />
            <FeatureRoute
              title="Turneringstrekker"
              exact
              path={TOURNAMENT_DRAWER_ROUTE}
              component={TournamentDrawerPage}
            />
            <FeatureRoute
              title="Turnering!"
              exact
              path={TOURNAMENT_ROUTE}
              component={TournamentPage}
            />
          </Switch>
      </AppContainerDiv>
    </Router>
  );
};

export default App;
