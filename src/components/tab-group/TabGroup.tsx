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
