import React, { useState } from "react";
import { Image, modalStyles, Text } from "../../styles";
import Modal from "react-modal";
import { rootsVandrern } from "../../images";

// todo slider from last years
export const Intro2022: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <>
      <Text style={{ marginTop: 40 }}>
        <b>Dato: 14-16. juli!</b>
      </Text>
      <Text>Vi gjentar suksessen med Rootslekene!</Text>
      <Text>
        I fjor gjennomgikk deltakerne syv jevne og neglebitende konkurranser.
        <br />
        Etter mye kriging, krangling og chugging så var det Larsi som kunne
        smykke seg med tittelen som vinner av Rootslekene 2021 - og han kunne
        dermed ta med seg{" "}
        <span
          style={{ textDecoration: "underline" }}
          onClick={() => setModalOpen(true)}
        >
          Rootsvandrer'n
        </span>{" "}
        hjem til odel og eie for året!
      </Text>

      <Text>
        Nå dukker det opp en sultefóret og revansjesugen gjeng som får bryne seg
        på nye og enda større leker i kampen om vandrepokalen og udødelig ære!
      </Text>
      <Text>Måtte den beste vinne. Lykke til!</Text>
      <Modal isOpen={modalOpen} onRequestClose={closeModal} style={modalStyles}>
        <Image src={rootsVandrern} />
        <p style={{ color: "black" }}>Rootsvandrer'n</p>
      </Modal>
    </>
  );
};
