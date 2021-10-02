import React, { useState } from "react";
import Modal from "react-modal";
import { rootsVandrern } from "../../images";
import { Text, Image, modalStyles } from "../../styles";

export const Intro2021: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <>
      <Text style={{ marginTop: 40 }}>
        <b>Lørdag 17. juli braker det løs!</b>
      </Text>
      <Text>
        Gjennom en prestisjefylt syvkamp skal vinneren av Rootslekene 2021
        kåres.
      </Text>
      <Text>
        Lekene består av et knippe varierte øvelser som vil teste utøverne både
        fysisk og mentalt. Her gjelder å ha god kontroll på både
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
          Rootsvandrer'n
        </span>
        &nbsp;hjem til odel og eie - frem til neste års leker!
      </Text>
      <Text>Lykke til!</Text>
      <Modal isOpen={modalOpen} onRequestClose={closeModal} style={modalStyles}>
        <Image src={rootsVandrern} />
        <p style={{ color: "black" }}>Rootsvandrer'n</p>
      </Modal>
    </>
  );
};
