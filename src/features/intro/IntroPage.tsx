import { Page } from "../../components/page";
import styled from "@emotion/styled";
import { rootsVandrern } from "../../images";
import { device } from "../../utils/mixins";
import React, { useState } from "react";
import Modal from "react-modal";

import {
  drita,
  eskil,
  jacuzzi,
  jacuzzi2,
  robert,
  spiker,
} from "../../images/slideshow";
import BeerIcon from "./BeerIncon";

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const Container = styled.div`
  width: 80vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Text = styled.p`
  color: white;
  text-align: center;
`;

const Image = styled.img`
  width: 50vw;
  @media ${device.FOR_PHONE_ONLY} {
    width: 240px;
  }
`;

const SliderContainer = styled.div`
  width: 20vw;
  margin-bottom: 24px;
  @media ${device.FOR_PHONE_ONLY} {
    width: 80vw;
  }
`;

const SlideContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

// todo egen side?
const SLIDER_LIST: { image: string; text: string }[] = [
  { image: eskil, text: "Eskil om noen få timer" },
  { image: drita, text: "Sveiseblind gjeng" },
  { image: robert, text: "" },
  { image: jacuzzi, text: "Ung og lovende" },
  { image: jacuzzi2, text: "Ikke like ung og lovende" },
  { image: spiker, text: "Det spikres" },
];
const IntroPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <Page title="">
      <Container>
        <BeerIcon />
        <Text style={{ marginTop: 40 }}>
          <b>Lørdag 17. juli braker det løs!</b>
        </Text>
        <Text>
          Gjennom en prestisjefylt femkamp skal vinneren av Rootslekene 2021
          kåres.
        </Text>
        <Text>
          Lekene består av et knippe varierte øvelser som vil teste utøverne
          både fysisk og mentalt. Her gjelder å ha god kontroll på både
          alkoholtoleranse, tenningsnivå og ikke minst koordinasjonen etter X
          antall enheter!
        </Text>
        <Text>
          Etter endt konkurranse så vil vinneren kunne smykke seg med evig ære,
          samt at man tar med seg&nbsp;
          <span
            style={{ textDecoration: "underline" }}
            onClick={() => setModalOpen(true)}
          >
            Rootsvandrer`n
          </span>
          &nbsp;hjem til odel og eie - frem til neste års leker!
        </Text>
        <Text>Let the games begin!</Text>
        <Modal
          isOpen={modalOpen}
          onRequestClose={closeModal}
          style={modalStyles}
        >
          <Image src={rootsVandrern} />
          <p style={{ color: "black" }}>Rootsvandrer`n</p>
        </Modal>
        {/*<h3>Tidligere minner</h3>*/}
        {/*<p>*/}
        {/*  Her er et knippe av høydepunkter fra tidligere Rootsleker,*/}
        {/*  Rootsfestivaler for å sette stemningen!*/}
        {/*</p>*/}
        {/*<SliderContainer>*/}
        {/*  <ReactSlickSlider {...settings}>*/}
        {/*    {SLIDER_LIST.map((slider) => (*/}
        {/*      <SlideContainer>*/}
        {/*        <img alt="slider" src={slider.image} width="100%" />*/}
        {/*        <p>{slider.text}</p>*/}
        {/*      </SlideContainer>*/}
        {/*    ))}*/}
        {/*  </ReactSlickSlider>*/}
        {/*</SliderContainer>*/}
      </Container>
    </Page>
  );
};

export default IntroPage;
