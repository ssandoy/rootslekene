import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Competition } from "./features/leaderbord/types";
import { INDICES } from "./firebase/hooks/types";
import { firestore } from "./firebase/init";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// @eslint-disable
const points = [1, 2, 3, 4, 5, 6, 7];

const SANDER_ID = 1;
const MATHIAS_ID = 2;
const EIRIK_ID = 3;
const ESKIL_ID = 4;
const LP_ID = 5;
const ROBERT_ID = 6;
const PEDER_ID = 7;

const CONTESTANTS = [
  { id: SANDER_ID, name: "Sander", shortName: "SS" },
  { id: PEDER_ID, name: "Peder", shortName: "PO" },
  { id: LP_ID, name: "Larsi", shortName: "LP" },
  { id: ESKIL_ID, name: "Eskil", shortName: "ES" },
  { id: EIRIK_ID, name: "Eirik", shortName: "EW" },
  { id: MATHIAS_ID, name: "Mathias", shortName: "MD" },
  { id: ROBERT_ID, name: "Robert", shortName: "RN" },
];
const sander = {
  contestantId: SANDER_ID,
  contestantName: "Sander",
  placement: 1,
  points: points.splice(Math.abs(Math.random() * 6), 1)[0],
};
const mathias = {
  contestantId: MATHIAS_ID,
  contestantName: "Mathias",
  placement: 2,
  points: points.splice(Math.abs(Math.random() * 5), 1)[0],
};
const larsi = {
  contestantId: LP_ID,
  contestantName: "Larsi",
  placement: 2,
  points: points.splice(Math.abs(Math.random() * 4), 1)[0],
};
const gegg = {
  contestantId: EIRIK_ID,
  contestantName: "Eirik",
  placement: 2,
  points: points.splice(Math.abs(Math.random() * 3), 1)[0],
};
const eskil = {
  contestantId: ESKIL_ID,
  contestantName: "Eskil",
  placement: 2,
  points: points.splice(Math.abs(Math.random() * 2), 1)[0],
};
const robert = {
  contestantId: ROBERT_ID,
  contestantName: "Robert",
  placement: 2,
  points: points.pop() ?? 0,
};

const peder = {
  contestantId: PEDER_ID,
  contestantName: "Peder",
  placement: 2,
  points: points[0],
};
const COMPETITION_DATA: Competition[] = [
  {
    id: "random-id",
    name: "Team-Kubb",
    results: [sander, mathias, gegg, robert, eskil, larsi, peder],
  },
  {
    id: "random-id",
    name: "OL-loypa",
    results: [sander, mathias, gegg, robert, eskil, larsi, peder],
  },
  {
    id: "random-id",
    name: "Indre klokke",
    results: [sander, mathias, larsi, robert, eskil, gegg, peder],
  },
  {
    id: "random-id",
    name: "Spiker",
    results: [sander, mathias, gegg, robert, eskil, larsi, peder],
  },
];
console.log("ADDING");
//
// CONTESTANTS.forEach((contestant) =>
//   firestore.collection(INDICES.CONTESTANTS).doc().set(contestant)
// );
//
// COMPETITION_DATA.forEach((competition) =>
//   firestore.collection(INDICES.COMPETITIONS_TEST).doc().set(competition)
// );
// @eslint-enable
