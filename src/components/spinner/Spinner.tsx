import React from "react";
import styled from "@emotion/styled";

const SpinnerContainer = styled.div<Props>`
  margin-top: 8px;
  margin-left: 12px;
  height: ${({ size }) => `${size}px`};
  width: ${({ size }) => `${size}px`};
  border-left: 2px solid;
  border-right: 2px solid;
  border-bottom: 2px solid;
  border-top: none;
  border-radius: ${({ size }) => `${size}px`};
  border-color: white;
  -webkit-animation: spin 1s infinite linear;
  animation: spin 1s infinite linear;
  @-webkit-keyframes spin {
    from {
      -webkit-transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

type Props = {
  size?: number;
};
const Spinner: React.FC<Props> = ({ size }) => {
  return <SpinnerContainer size={size ?? 20} />;
};

export default Spinner;
