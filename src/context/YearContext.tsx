import React, { Dispatch, SetStateAction, useState } from "react";

type Year = "2021" | "2022";

type YearState = {
  selectedYear: Year;
  setSelectedYear: Dispatch<SetStateAction<Year>>;
};

export const YearContext = React.createContext<YearState | undefined>(
  undefined
);

const YearProvider: React.FC = (children) => {
  const [selectedYear, setSelectedYear] = useState<Year>("2021");

  return (
    <YearContext.Provider
      value={{ selectedYear, setSelectedYear }}
      {...children}
    />
  );
};

const useYearContext = () => {
  const context = React.useContext(YearContext);
  if (!context) {
    throw new Error(`useYearContext must be used within a YearProvider`);
  }
  return context;
};

export { YearProvider, useYearContext };
