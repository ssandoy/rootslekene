import { firestore } from "../../firebase/init";
import { INDICES } from "../../firebase/hooks/types";

export const EIRIK_ID = 1;
export const ROBERT_ID = 2;
export const PEDER_ID = 3;
export const SANDER_ID = 4;
export const ESKIL_ID = 5;
export const LP_ID = 6;
export const MATHIAS_ID = 7;
export const SIMON_ID = 8;

const CONTESTANTS_2022 = [
  {
    id: SANDER_ID,
    name: "Sander",
    shortName: "SS",
    age: 29,
    strength: "Hjemmebane",
    weakness: "Overtenning",
    lastYearPlacement: 3,
    expectedPromille: 1.7,
    order: 3,
  },
  {
    id: PEDER_ID,
    name: "Peder",
    shortName: "PO",
    age: 29,
    strength: "Dworek og appelsinjuice",
    weakness: "Øye-hånd-koordinasjon",
    lastYearPlacement: 7,
    expectedPromille: 1.99,
  },
  {
    id: LP_ID,
    name: "Larsi",
    shortName: "LP",
    age: 29,
    strength: "Regjerende mester",
    weakness: "Regjerende mester",
    lastYearPlacement: 1,
    expectedPromille: 0.4,
  },
  {
    id: ESKIL_ID,
    name: "Eskil",
    shortName: "ES",
    age: 28,
    strength: "Ingen",
    weakness: "Blind-frisbee",
    lastYearPlacement: 8,
    expectedPromille: 2,
  },
  {
    id: EIRIK_ID,
    name: "Eirik",
    shortName: "EW",
    age: 29,
    strength: "Selvtillit",
    weakness: "Selvinnsikt",
    lastYearPlacement: 4,
    expectedPromille: 0.2,
  },
  {
    id: MATHIAS_ID,
    name: "Mathias",
    shortName: "MD",
    age: 28,
    strength: "Sprit",
    weakness: "Chugging og shots",
    lastYearPlacement: 4,
    expectedPromille: 1.8,
  },
  {
    id: ROBERT_ID,
    name: "Robert",
    shortName: "RN",
    age: 29,
    strength: "Alkoholtoleranse",
    weakness: "Spikring",
    lastYearPlacement: 6,
    expectedPromille: 1.75,
  },
  {
    id: SIMON_ID,
    name: "Simon",
    shortName: "SM",
    age: 27,
    strength: "Chugging",
    weakness: "Damer",
    lastYearPlacement: 2,
    expectedPromille: 0.75,
  },
] as const;

export type ContestantNames = typeof CONTESTANTS_2022[number]["name"];

// todo fix order
export const createContestants = (
  index:
    | INDICES.CONTESTANTS_PROD_2022
    | INDICES.CONTESTANTS_TEST_2022
    | INDICES.CONTESTANTS_TEST_2022
) => {
  CONTESTANTS_2022.forEach((contestant) =>
    firestore.collection(index).doc(contestant.name).set(contestant)
  );
};
