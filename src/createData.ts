import { firestore } from "./firebase/init";
import { INDICES } from "./firebase/hooks/types";
import { Competition } from "./firebase/types";
import {
  EIRIK_ID,
  ESKIL_ID,
  LP_ID,
  MATHIAS_ID,
  PEDER_ID,
  ROBERT_ID,
  SANDER_ID,
  SIMON_ID,
} from "./index";

const CONTESTANTS_2021 = [
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

const createContestants = () => {
  CONTESTANTS_2021.forEach((contestant) =>
    firestore
      .collection(INDICES.CONTESTANTS_PROD_2021)
      .doc(contestant.id.toString())
      .set(contestant)
  );
};
// createContestants();

const OKSE_ID = "0";
const KUBB_ID = "1";
const SPIKER_ID = "2";
const OL_LOYPE_ID = "3";
const FRISBEE_ID = "4";
const STOVEL_ID = "5";
const KLOKKE_ID = "6";
const MELKESPANN_ID = "7";

const COMPETITIONS: Competition[] = [
  {
    id: OKSE_ID,
    order: 1,
    name: "Øksekast 🪓",
    icon: "🪓",
    info: "Starter her for å slippe tur til legevakta",
    description: "Vinner Mathias så må han melde seg på Farmen",
    bookieFavorite: "Ingen",
    results: [
      { contestantId: SANDER_ID, points: 7 },
      { contestantId: MATHIAS_ID, points: 3 },
      { contestantId: ESKIL_ID, points: 1 },
      { contestantId: EIRIK_ID, points: 4 },
      { contestantId: LP_ID, points: 5 },
      { contestantId: PEDER_ID, points: 0 },
      { contestantId: ROBERT_ID, points: 6 },
      { contestantId: SIMON_ID, points: 2 },
    ],
  },
  {
    order: 2,
    name: "Team-kubb 🌲🍻", //  todo change name and description?
    icon: "🏓",
    info: "Teambuilding og pilsing",
    description:
      "Her er trikset å holde Eirik så langt unna kongen som mulig (Blir det styrtregn kjører vi beer-pong inne)",
    bookieFavorite: "Alle bortsett fra Eirik",
    id: KUBB_ID,
    results: [
      { contestantId: SANDER_ID, points: 0 },
      { contestantId: MATHIAS_ID, points: 0 },
      { contestantId: ESKIL_ID, points: 2 },
      { contestantId: EIRIK_ID, points: 6 },
      { contestantId: LP_ID, points: 4 },
      { contestantId: PEDER_ID, points: 6 },
      { contestantId: ROBERT_ID, points: 2 },
      { contestantId: SIMON_ID, points: 4 },
    ],
  },
  {
    id: SPIKER_ID,
    order: 3,
    name: "Spiker 🔨",
    icon: "🔨",
    info: "Gjenstår suksessen med fjorårets intriger!",
    description: "Spikerkonkurranse med ett slag hver på rundgang",
    bookieFavorite: "Robert",
    results: [
      { contestantId: SANDER_ID, points: 4 },
      { contestantId: MATHIAS_ID, points: 7 },
      { contestantId: ESKIL_ID, points: 6 },
      { contestantId: EIRIK_ID, points: 0 },
      { contestantId: LP_ID, points: 3 },
      { contestantId: PEDER_ID, points: 2 },
      { contestantId: ROBERT_ID, points: 1 },
      { contestantId: SIMON_ID, points: 5 },
    ],
  },
  {
    id: OL_LOYPE_ID,
    order: 4,
    name: "Øl-løypa 🍻🏅",
    icon: "🍻",
    info: "Hvem klarer løypa på kortest mulig tid?",
    description:
      "Her gjelder det å mestre høyt tempo, sylskarp presisjon og utømmelig alkoholtoleranse! Løypen inneholder:",
    bookieFavorite: "Beerpong-Simon",
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
    results: [
      { contestantId: SANDER_ID, points: 4 },
      { contestantId: MATHIAS_ID, points: 0 },
      { contestantId: ESKIL_ID, points: 6 },
      { contestantId: EIRIK_ID, points: 4 },
      { contestantId: LP_ID, points: 2 },
      { contestantId: PEDER_ID, points: 2 },
      { contestantId: ROBERT_ID, points: 0 },
      { contestantId: SIMON_ID, points: 6 },
    ],
  },
  {
    id: FRISBEE_ID,
    order: 5,
    name: "Blind-frisbeegolf 🧑‍🦯🥏",
    icon: "🥏",
    info: "",
    description:
      "To og to på lag, den ene må forklare til den andre hvor kurven er!",
    bookieFavorite: "Peder og Eskil som duo",
    results: [
      { contestantId: SANDER_ID, points: 2 },
      { contestantId: MATHIAS_ID, points: 6 },
      { contestantId: ESKIL_ID, points: 2 },
      { contestantId: EIRIK_ID, points: 0 },
      { contestantId: LP_ID, points: 6 },
      { contestantId: PEDER_ID, points: 4 },
      { contestantId: ROBERT_ID, points: 0 },
      { contestantId: SIMON_ID, points: 4 },
    ],
  },
  {
    id: STOVEL_ID,
    order: 6,
    name: "Støvelkast 🥾",
    icon: "🥾",
    info: "Klarer Larsi å kaste riktig vei denne gangen?",
    description: "Her er det kraft og lengde som gjelder!",
    bookieFavorite: "Ikke Larsi",
    results: [
      { contestantId: SANDER_ID, points: 5 },
      { contestantId: MATHIAS_ID, points: 3 },
      { contestantId: ESKIL_ID, points: 0 },
      { contestantId: EIRIK_ID, points: 2 },
      { contestantId: LP_ID, points: 6 },
      { contestantId: PEDER_ID, points: 1 },
      { contestantId: ROBERT_ID, points: 7 },
      { contestantId: SIMON_ID, points: 4 },
    ],
  },
  {
    id: KLOKKE_ID,
    order: 7,
    name: "Indre klokke ⌛",
    icon: "⌛",
    info: "Hvem klarer å ta tiden mens man drikker?",
    description:
      "Bånn en kopp med drikke mens klokka går. Personen nærmest tiden vinner.",
    bookieFavorite: "Eirik",
    results: [
      { contestantId: SANDER_ID, points: 2 },
      { contestantId: MATHIAS_ID, points: 4 },
      { contestantId: ESKIL_ID, points: 1 },
      { contestantId: EIRIK_ID, points: 7 },
      { contestantId: LP_ID, points: 3 },
      { contestantId: PEDER_ID, points: 5 },
      { contestantId: ROBERT_ID, points: 6 },
      { contestantId: SIMON_ID, points: 0 },
    ],
  },
];

// COMPETITIONS.forEach((comp) => {
//   firestore.collection(INDICES.COMPETITIONS_PROD_2021).doc(comp.id).set(comp);
// });

// const setGameOver = (isGameOver: boolean) => {
//   isGameOver
//     ? firestore
//         .collection(INDICES.GAME_OVER_PROD_2021)
//         .doc("GAME_OVER")
//         .set({ gameOver: true })
//     : firestore
//         .collection(INDICES.GAME_OVER_PROD_2021)
//         .doc("GAME_OVER")
//         .delete();
// };

// setGameOver(true);
