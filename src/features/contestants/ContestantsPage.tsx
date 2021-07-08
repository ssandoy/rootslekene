import React from "react";
import { Page } from "../../components/page";
import Contestant from "./Contestant";
import styled from "@emotion/styled";
import { eskil, gegg, larsi, mattis, peder, rob, sander } from "../../images";
import { ContestantType } from "./types";

const CONTESTANTS: ContestantType[] = [
  {
    id: 1,
    imageUrl: gegg,
    name: "Eirik",
    shortName: "EW",
    age: 28,
    strength: "Selvtillit",
    weakness: "Selvinnsikt",
  },
  {
    id: 2,
    imageUrl: rob,
    name: "Robert",
    shortName: "RN",
    age: 28,
    strength: "Alkoholtoleranse",
    weakness: "Alkoholtoleranse",
  },
  {
    id: 3,
    imageUrl: peder,
    name: "Peder",
    shortName: "PO",
    age: 28,
    strength: "Farsinnstinkt",
    weakness: "Sprit",
  },
  {
    id: 4,
    imageUrl: sander,
    name: "Sander",
    shortName: "SS",
    age: 28,
    strength: "Hjemmebane",
    weakness: "Overtenning",
  },
  {
    id: 5,
    imageUrl: eskil,
    name: "Eskil",
    shortName: "ES",
    age: 27,
    strength: "Sta",
    weakness: "Sta",
  },
  {
    id: 6,
    imageUrl: larsi,
    name: "Larsi",
    shortName: "LP",
    age: 28,
    strength: "Bicepscurl",
    weakness: "Støvelkast",
  },
  {
    id: 7,
    imageUrl: mattis,
    name: "Mathias",
    shortName: "MD",
    age: 27,
    strength: "Sprit",
    weakness: "Shots",
  },
];

const ContestantsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ContestantsPage: React.FC = () => {
  return (
    <Page title="Deltakere">
      <ContestantsWrapper>
        {CONTESTANTS.map((contestant) => (
          <Contestant key={contestant.name} contestant={contestant} />
        ))}
      </ContestantsWrapper>
    </Page>
  );
};

export default ContestantsPage;
