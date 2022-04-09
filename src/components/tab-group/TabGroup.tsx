import styled from "@emotion/styled";
import React from "react";
import { useYearContext } from "../../context/YearContext";

const TabGroupContainer = styled.div`
  display: flex;
  margin-bottom: 16px;
  margin-top: -16px;
`;

type TabButtonProps = {
  isActive: boolean;
};

const TabButton = styled.button<TabButtonProps>`
  background: none;
  border-radius: 20px;
  font-size: 1em;
  border: ${({ isActive }) =>
    isActive ? "2px solid white" : "2px solid transparent"};
  color: white;
  margin: 4px; // todo fix positioning
  :focus {
    outline: none;
  }
`;

const TabGroup: React.FC = () => {
  const { selectedYear, setSelectedYear } = useYearContext();

  return (
    <TabGroupContainer>
      <TabButton
        isActive={selectedYear === "2021"}
        onClick={() => setSelectedYear("2021")}
      >
        2021
      </TabButton>
      <TabButton
        isActive={selectedYear === "2022"}
        onClick={() => setSelectedYear("2022")}
      >
        2022
      </TabButton>
    </TabGroupContainer>
  );
};

export default TabGroup;
