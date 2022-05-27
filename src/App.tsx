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
import { device } from "./utils/mixins";

const AppContainerDiv = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TabContainer = styled.div`
  @media ${device.FOR_PHONE_ONLY} {
    margin-top: 24px;
  }

  @media ${device.FOR_TABLET_PORTRAIT_UP} {
    display: flex;
    justify-content: center;
  }
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: center;
  font-family: Alatsi, serif;
`;

// todo center tabgroup in desktop
const App = () => {
  const { selectedYear, setSelectedYear } = useYearContext();
  return (
    <Router>
      <AppContainerDiv>
        <Header />
        <div>
          <TabContainer>
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
          </TabContainer>
          <NavContainer>
            <NavLink route={INTRO_ROUTE} title="INFO" />
            <NavLink route={COMPETITIONS_ROUTE} title="KONKURRANSER" />
            <NavLink route={CONTESTANTS_ROUTE} title="DELTAKERE" />
            <NavLink route={LEADERBOARD_ROUTE} title="RESULTATER" />
          </NavContainer>
        </div>
        <Switch>
          <Route exact path={["/", INTRO_ROUTE]} component={IntroPage} />
          <FeatureRoute
            exact
            title="KONKURRANSER"
            path={COMPETITIONS_ROUTE}
            component={CompetitionsPage}
          />
          <FeatureRoute
            title="DELTAKERE"
            exact
            path={CONTESTANTS_ROUTE}
            component={ContestantsPage}
          />
          <FeatureRoute
            title="RESULTATER"
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
