import React from "react";
import styled from "@emotion/styled";

type Props = {
  dark?: boolean;
};

const SpinnerContainer = styled.div`
  .spinner {
    margin-top: 8px;
    margin-left: 12px;
    height: 20px;
    width: 20px;
    border-left: 1px solid;
    border-right: 1px solid;
    border-bottom: 1px solid;
    border-top: none;
    border-radius: 20px;
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
  }
  .spinner--dark {
    border-color: black;
  }
`;

const Spinner = ({ dark = false }: Props) => {
  return (
    <SpinnerContainer className={`spinner ${dark ? "spinner--dark" : ""}`} />
  );
};

export default Spinner;
