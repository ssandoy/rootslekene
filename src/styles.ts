import styled from "@emotion/styled";
import { device } from "./utils/mixins";

export const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export const Text = styled.p`
  color: white;
  text-align: center;
`;

export const SmallText = styled.p`
  color: white;
  text-align: center;
  font-size: 0.9rem;
`;

export const Image = styled.img`
  width: 400px;
  @media ${device.FOR_PHONE_ONLY} {
    width: 240px;
  }
`;
