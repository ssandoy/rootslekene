import styled from "@emotion/styled";
import React from "react";

const TabGroupContainer = styled.div`
  display: flex;
  margin-bottom: 16px;
  margin-top: -16px;
`;

type TabButtonProps = {
  text: string;
  isActive: boolean;
  onClick: () => void;
  styles?: object; // fixme
};

const TabButton = styled.button<Pick<TabButtonProps, "isActive">>`
  font-size: 1em;
  font-family: Alatsi, serif;
  border: ${({ isActive }) =>
    !isActive ? "2px solid white" : "2px solid transparent"};
  background-color: ${({ isActive }) => (isActive ? "white" : "transparent")};
  color: ${({ isActive }) => (isActive ? "#282c34" : "white")};
  margin: 4px; // todo fix positioning
  padding: 0 16px;
  height: 32px;
  :focus {
    outline: none;
  }
`;

type Props = {
  buttons: TabButtonProps[];
};

// todo can we make this better somehow...
// todo render-props?
const TabGroup: React.FC<Props> = ({ buttons }) => {
  return (
    <TabGroupContainer>
      {buttons.map((buttonProps) => {
        return (
          <TabButton
            isActive={buttonProps.isActive}
            onClick={buttonProps.onClick}
            style={buttonProps.styles}
          >
            {buttonProps.text}
          </TabButton>
        );
      })}
    </TabGroupContainer>
  );
};

export default TabGroup;
