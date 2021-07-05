import React from "react";
import { Page } from "../../components/page";
import styled from "@emotion/styled";
import { CompetitionType } from "./types";
import { Competition } from "./Competition";
import { device } from "../../utils/mixins";

const CompetitionsContainer = styled.div`
  display: flex;
  @media ${device.FOR_PHONE_ONLY} {
    flex-direction: column;
  }
`;

const COMPETITIONS: CompetitionType[] = [
  {
    order: 1,
    name: "Team-kubb",
    info: "Starter rolig med kubb og drikking 🌲🍻",
    description: "Her er trikset å holde Eirik så langt unna kongen som mulig.",
    bookieFavorite: "Alle bortsett fra Eirik",
  },
  {
    order: 2,
    name: "Øl-løypa",
    info: "Hvem klarer løypa på kortest mulig tid? 🏅",
    description:
      "Her gjelder det å mestre høyt tempo, sylskarp presisjon og utømmelig alkoholtoleranse! Løypen inneholder:",
    bookieFavorite: "Lars Petter",
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
    order: 3,
    name: "Indre klokke",
    info: "Hvem klarer å ta tiden mens man drikker? ⌛",
    description:
      "Bånn en kopp med drikke mens klokka går. Personen nærmest tiden vinner.",
    bookieFavorite: "Eirik",
  },
  {
    order: 4,
    name: "Spiker",
    info: "Gjenstår suksessen med fjorårets intriger! 🔨",
    description: "Spikerkonkurransen med ett slag hver på rundgang",
    bookieFavorite: "Robert",
  },
];

const CompetitionsPage: React.FC = () => {
  return (
    <Page title="Konkurranser">
      <CompetitionsContainer>
        {COMPETITIONS.map((competition) => (
          <Competition competition={competition} />
        ))}
      </CompetitionsContainer>
    </Page>
  );
};

export default CompetitionsPage;
