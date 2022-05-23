import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { YearProvider } from "./context/YearContext";

ReactDOM.render(
  <React.StrictMode>
    <YearProvider>
      <App />
    </YearProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
