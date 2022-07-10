import React from "react";
import { ChallengeType } from "./ChallengeWheelPage";
import styled from "@emotion/styled";

type Props = {
  challenge: ChallengeType;
};

const ChallengeText = styled.p`
  font-size: 1.25rem;
`;

export const Challenge: React.FC<Props> = ({ challenge }) => {
  return <ChallengeText>{challenge}</ChallengeText>;
};
