import { Page } from "../../components/page";
import styled from "@emotion/styled";
import { rootsVandrern } from "../../images";
import { device } from "../../utils/mixins";
import React, { useState } from "react";
import Modal from "react-modal";

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
  width: 400px;
  @media ${device.FOR_PHONE_ONLY} {
    width: 240px;
  }
`;
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
          Gjennom en prestisjefylt sekskamp skal vinneren av Rootslekene 2021
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
        <Text>Lykke til!</Text>
        <Modal
          isOpen={modalOpen}
          onRequestClose={closeModal}
          style={modalStyles}
        >
          <Image src={rootsVandrern} />
          <p style={{ color: "black" }}>Rootsvandrer`n</p>
        </Modal>
      </Container>
    </Page>
  );
};

export default IntroPage;
