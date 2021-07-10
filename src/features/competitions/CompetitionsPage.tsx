import React from "react";
import { Page } from "../../components/page";
import styled from "@emotion/styled";
import { CompetitionType } from "./types";
import { Competition } from "./Competition";

const CompetitionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
`;

const COMPETITIONS: CompetitionType[] = [
  {
    order: 1,
    name: "Øksekast 🪓",
    info: "Starter her for å holde risikoen nede",
    description: "Vinner Mathias så må han melde seg på Farmen",
    bookieFavorite: "Ingen",
  },
  {
    order: 2,
    name: "Team-kubb 🌲🍻",
    info: "Teambuilding og pilsing",
    description: "Her er trikset å holde Eirik så langt unna kongen som mulig.",
    bookieFavorite: "Alle bortsett fra Eirik",
  },
  {
    order: 3,
    name: "Øl-løypa 🍻🏅",
    info: "Hvem klarer løypa på kortest mulig tid?",
    description:
      "Her gjelder det å mestre høyt tempo, sylskarp presisjon og utømmelig alkoholtoleranse! Løypen inneholder:",
    bookieFavorite: "Larsi",
    subCompetition: [
      {
        order: 1,
        name: "Rutsjebane",
        description: "Rutsjebane med innebygd flip the cup!",
      },
      {
        order: 2,
        name: "Beer-pong",
        description: "Du finner en overraskelse under koppen når du treffer 🍺",
      },
      {
        order: 3,
        name: "Dart-ballong",
        description: "Hva er i ballongene? 🎯 🤔",
      },
      {
        order: 4,
        name: "Kubb",
        description: "Kanskje Eirik treffer denne gangen? 🤐",
      },
    ],
  },
  {
    order: 4,
    name: "Støvelkast 🥾",
    info: "Klarer Larsi å kaste riktig vei denne gangen?",
    description: "Her er det kraft og lengde som gjelder!",
    bookieFavorite: "Ikke Mathias",
  },
  {
    order: 5,
    name: "Indre klokke ⌛",
    info: "Hvem klarer å ta tiden mens man drikker?",
    description:
      "Bånn en kopp med drikke mens klokka går. Personen nærmest tiden vinner.",
    bookieFavorite: "Eirik",
  },
  {
    order: 6,
    name: "Spiker 🔨",
    info: "Gjenstår suksessen med fjorårets intriger!",
    description: "Spikerkonkurranse med ett slag hver på rundgang",
    bookieFavorite: "Robert",
  },
];

const CompetitionsPage: React.FC = () => {
  return (
    <Page title="Konkurranser">
      <CompetitionsContainer>
        {COMPETITIONS.map((competition) => (
          <Competition key={competition.name} competition={competition} />
        ))}
      </CompetitionsContainer>
    </Page>
  );
};

export default CompetitionsPage;
