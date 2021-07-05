import { Page } from "../../components/page";
import styled from "@emotion/styled";
import { rootsVandrern } from "../../images";
import { device } from "../../utils/mixins";
import React, { useState } from "react";
import Modal from "react-modal";

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
  // todo mobile-media
  width: 50vw;
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
        <Text>Lørdag 16. juli arrangeres Rootslekene 2021!</Text>
        {/* TODO BILDE HEr. RAMME MED MYE GREOER?*/}
        <Text>
          I en prestisjefylt femkamp med varierte øvelser skal deltakerne testes
          både psykisk og fysisk, før vinneren av Rootslekene kåres. Vinneren
          kan skilte med stor ære, samt at man tar med seg&nbsp;
          <span
            style={{ textDecoration: "underline" }}
            onClick={() => setModalOpen(true)}
          >
            Rootsvandreren
          </span>
          &nbsp;hjem til evig eie i et helt år!
        </Text>
        {/*  todo image of gutta*/}
        <Modal
          isOpen={modalOpen}
          onRequestClose={closeModal}
          style={modalStyles}
        >
          <Image src={rootsVandrern} />
          <p style={{ color: "black" }}>Rootsvandreren</p>
          {/*<CrossIcon onClick={closeModal} />*/}
        </Modal>

        <p>Generelle regler:</p>
        {/*  TODO create and make componet*/}
      </Container>
    </Page>
  );
};

export default IntroPage;
