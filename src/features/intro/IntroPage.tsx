import { Page } from "../../components/page";
import styled from "@emotion/styled";
import { rootsVandrern } from "../../images";
import { device } from "../../utils/mixins";
import React, { useState } from "react";
import Modal from "react-modal";
import ReactSlickSlider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { drita, jacuzzi, robert, sorbyen } from "../../images/slideshow";

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
`;
const Text = styled.p`
  color: white;
`;

const Image = styled.img`
  width: 50vw;
  @media ${device.FOR_PHONE_ONLY} {
    width: 240px;
  }
`;

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
};

const IntroPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <Page title="">
      <Container>
        <Text>Lørdag 16. juli arrangeres Rootslekene 2021!</Text>
        <ReactSlickSlider {...settings}>
          <img alt="drita" src={drita} width={200} />
          <img alt="jac" src={jacuzzi} width={200} />
          <img alt="rob" src={robert} width={200} />
          <img alt="sor" src={sorbyen} width={200} />
        </ReactSlickSlider>
        <Text>
          I en prestisjefylt femkamp med varierte øvelser skal deltakerne testes
          både psykisk og fysisk, før vinneren av Rootslekene 2021 kåres.
          Vinneren kan skilte med stor ære, samt at man tar med seg&nbsp;
          <span
            style={{ textDecoration: "underline" }}
            onClick={() => setModalOpen(true)}
          >
            Rootsvandreren
          </span>
          &nbsp;hjem til evig eie i et helt år!
        </Text>
        <Text>May the games begin!</Text>
        <Modal
          isOpen={modalOpen}
          onRequestClose={closeModal}
          style={modalStyles}
        >
          <Image src={rootsVandrern} />
          <p style={{ color: "black" }}>Rootsvandreren</p>
        </Modal>

        <p>Generelle regler:</p>
        {/*  TODO create and make componet*/}
      </Container>
    </Page>
  );
};

export default IntroPage;
