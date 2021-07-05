import { Page } from "../../components/page";
import styled from "@emotion/styled";
import { rootsVandrern } from "../../images";
import { device } from "../../utils/mixins";

const Container = styled.div`
  width: 80vw;
`;
const Text = styled.p`
  color: white;
`;

const Image = styled.img`
  // todo mobile-media
  width: 50vw;
  @media ${device.FOR_PHONE_ONLY} {
    width: 240px;
  }
`;

const IntroPage: React.FC = () => {
  return (
    <Page title="Intro">
      <Container>
        <div>TEST</div>
        <Text>
          Den 16. juli skal Rootslekene 2021 avholdes. Arrangementet finner sted
          på Torvhaugen 11, XX.
        </Text>
        <Text>
          I en prestisjefylt femkamp med varierte øvelser skal deltakerne testes
          både psykisk og fysisk, før vinneren av Rootslekene kåres. Vinneren
          kan skilte med stor 're, samt at man tar med seg Rootsvandreren hjem
          til evig eie i et helt [r!
        </Text>
        {/*  todo image of gutta*/}
        {/*  todo maybe link to modal?*/}
        <Image src={rootsVandrern} />
      </Container>
    </Page>
  );
};

export default IntroPage;
