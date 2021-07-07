import React from "react";
import { Page } from "../../components/page";
import Contestant from "./Contestant";
import styled from "@emotion/styled";
import { eskil, gegg, larsi, mattis, peder, rob, sander } from "../../images";
import { ContestantType } from "./types";

const CONTESTANTS: ContestantType[] = [
  {
    imageUrl: gegg,
    name: "Eirik",
    age: 28,
    strength: "Selvtillit",
    weakness: "Selvinnsikt",
  },
  {
    imageUrl: rob,
    name: "Robert",
    age: 28,
    strength: "Alkoholtoleranse",
    weakness: "Alkoholtoleranse",
  },
  {
    imageUrl: peder,
    name: "Peder",
    age: 28,
    strength: "Farsinnstinkt",
    weakness: "Sprit",
  },
  {
    imageUrl: sander,
    name: "Sander",
    age: 28,
    strength: "Hjemmebane",
    weakness: "Overtenning",
  },
  {
    imageUrl: eskil,
    name: "Eskil",
    age: 27,
    strength: "Sta",
    weakness: "Sta",
  },
  {
    imageUrl: larsi,
    name: "Larsi",
    age: 28,
    strength: "Bicepscurl",
    weakness: "Støvelkast",
  },
  {
    imageUrl: mattis,
    name: "Mathias",
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
          <Contestant contestant={contestant} />
        ))}
      </ContestantsWrapper>
    </Page>
  );
};

export default ContestantsPage;
