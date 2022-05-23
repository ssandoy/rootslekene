import { firestore } from "../firebase/init";
import { INDICES } from "../firebase/hooks/types";

export const EIRIK_ID = 1;
export const ROBERT_ID = 2;
export const PEDER_ID = 3;
export const SANDER_ID = 4;
export const ESKIL_ID = 5;
export const LP_ID = 6;
export const MATHIAS_ID = 7;
export const SIMON_ID = 8;

const CONTESTANTS = [
  {
    id: SANDER_ID,
    name: "Sander",
    shortName: "SS",
    age: 28,
    strength: "Hjemmebane",
    weakness: "Overtenning",
  },
  {
    id: PEDER_ID,
    name: "Peder",
    shortName: "PO",
    age: 28,
    strength: "Farsinnstinkt",
    weakness: "Sprit",
  },
  {
    id: LP_ID,
    name: "Larsi",
    shortName: "LP",
    age: 28,
    strength: "Bicepscurl",
    weakness: "Støvelkast",
  },
  {
    id: ESKIL_ID,
    name: "Eskil",
    shortName: "ES",
    age: 27,
    strength: "Sta",
    weakness: "Sta",
  },
  {
    id: EIRIK_ID,
    name: "Eirik",
    shortName: "EW",
    age: 28,
    strength: "Selvtillit",
    weakness: "Selvinnsikt",
  },
  {
    id: MATHIAS_ID,
    name: "Mathias",
    shortName: "MD",
    age: 27,
    strength: "Sprit",
    weakness: "Shots",
  },
  {
    id: ROBERT_ID,
    name: "Robert",
    shortName: "RN",
    age: 28,
    strength: "Alkoholtoleranse",
    weakness: "Alkoholtoleranse",
  },
  {
    id: SIMON_ID,
    name: "Simon",
    shortName: "SM",
    age: 26,
    strength: "Alder",
    weakness: "Damer",
  },
];

export const createContestants = (
  index:
    | INDICES.CONTESTANTS_PROD_2022
    | INDICES.CONTESTANTS_TEST_2022
    | INDICES.CONTESTANTS_TEST_2022
) => {
  CONTESTANTS.forEach((contestant) =>
    firestore.collection(index).doc(contestant.id.toString()).set(contestant)
  );
};
