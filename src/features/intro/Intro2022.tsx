import React from "react";
import { Text } from "../../styles";
import styled from "@emotion/styled";

const Link = styled.a`
  color: white;
`;
export const Intro2022: React.FC = () => {
  return (
    <>
      <Text style={{ marginTop: 40 }}>
        <b>Dato: 14-16. juli!</b>
      </Text>
      <Text>Vi gjentar suksessen med Rootslekene fra fjoråret!</Text>
      <Text>Mer info kommer.</Text>
      <Text>
        Har du forslag til konkurranser for neste års leker? Send de inn{" "}
        <Link target="_blank" href="https://forms.gle/Nf25W8cBkwP9E8gs7">
          her
        </Link>
      </Text>
    </>
  );
};
