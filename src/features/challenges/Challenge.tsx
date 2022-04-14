import React from "react";
import { ChallengeType } from "./ChallengeWheelPage";

type Props = {
  challenge: ChallengeType;
};

const renderIcon = (challenge: ChallengeType) => {
  switch (challenge) {
    case "Shot":
      return <div>ICON</div>;
    case "Bånne en øl":
      return <div>ICON</div>;
    case "10 pushup":
      return <div>ICON</div>;
    case "ICE-ing på tid":
      return <div>ICON</div>;
    case "Todo":
      return <div>ICON</div>;
  }
};

export const Challenge: React.FC<Props> = ({ challenge }) => {
  return (
    <p>
      {renderIcon(challenge)}
      {challenge}
    </p>
  );
};
