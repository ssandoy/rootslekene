import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { YearProvider } from "./context/YearContext";

export const EIRIK_ID = 1;
export const ROBERT_ID = 2;
export const PEDER_ID = 3;
export const SANDER_ID = 4;
export const ESKIL_ID = 5;
export const LP_ID = 6;
export const MATHIAS_ID = 7;
export const SIMON_ID = 8;

ReactDOM.render(
  <React.StrictMode>
    <YearProvider>
      <App />
    </YearProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
