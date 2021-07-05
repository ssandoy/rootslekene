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

function App() {
  return (
    <Router>
      <AppContainerDiv>
        <Header />
        <NavContainer>
          <NavLink route={"/intro"} title="Info" />
          <NavLink route={"/konkurranser"} title="Konkurranser" />
          <NavLink route={"/deltakere"} title="Deltakere" />
          <NavLink route={"/sammendrag"} title="Leaderboard" />
        </NavContainer>
        <Switch>
          <Route exact path={["/", "/intro"]} component={IntroPage} />
          <Route exact path={"/konkurranser"} component={CompetitionsPage} />
          <Route exact path={"/deltakere"} component={ContestantsPage} />
          <Route exact path={"/sammendrag"} component={LeaderboardPage} />
        </Switch>
      </AppContainerDiv>
    </Router>
  );
}

export default App;
