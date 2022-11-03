import React, { useState, useCallback, useEffect } from "react";

import Navigation from "../components/Navigation";
import Maand from "../components/kalender/Maand";
import Modal from "../components/modals/Modal";
import EditModal from "../components/modals/EditModal";
import Error from "../components/Error";
import Loader from "../components/Loader";

import MAANDEN from "../api/mocks/mock_maanden";
import DAGEN from "../api/mocks/mock_dagen";
import AANTALDAGENPERMAAND from "../api/mocks/mock_aantal_dagen_per_maand";
import TRAINERS from "../api/mocks/mock_trainers";

import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

import { useTrainingen } from "../contexts/TrainingenProvider";

export default function Kalender() {
  const { trainingen, error, loading, createTraining } = useTrainingen();

  const [maand, setMaand] = useState(new Date().getMonth());
  const [jaar, setJaar] = useState(new Date().getFullYear());

  const [wedstrijden, setWedstrijden] = useState([]);
  const [kampen, setKampen] = useState([]);

  const [isOpenModal, setIsOpenModal] = useState(false);

  const getEventsByDay = useCallback(
    (type, day) => {
      try {
        let data = [];
        if (type === "training") {
          data = trainingen.filter((training) => {
            return day === training.datum;
          });
        } else if (type === "wedstrijd") {
          data = wedstrijden.filter((training) => {
            return day === training.datum;
          });
        } else if (type === "kamp") {
          data = kampen.filter((training) => {
            return day === training.datum;
          });
        }
        return data;
      } catch (error) {
        console.error(error);
      }
    },
    [trainingen, kampen, wedstrijden]
  );

  const addEvent = useCallback(
    (type, event) => {
      if (type === "training") {
        createTraining(event);
      } else if (type === "wedstrijd") {
        setWedstrijden([...wedstrijden, event]);
      } else if (type === "kamp") {
        setKampen([...kampen, event]);
      }
    },
    [createTraining, wedstrijden, kampen]
  );

  const verlaagMaand = useCallback(() => {
    setJaar(maand === 0 ? jaar - 1 : jaar);
    setMaand(maand === 0 ? 11 : maand - 1);
  }, [maand, jaar]);

  const verhoogMaand = useCallback(() => {
    setJaar(maand === 11 ? jaar + 1 : jaar);
    setMaand((maand + 1) % 12);
  }, [maand, jaar]);

  return (
    <div>
      <h1 className="text-3xl font-bold my-2 ml-10">Kalender</h1>
      <Navigation />

      <h1 className="text-3xl text-center font-bold w-48 mx-auto">{jaar}</h1>
      <div className="flex flex-row justify-center mb-4">
        <button className="text-3xl mx-4" onClick={verlaagMaand}>
          <AiFillCaretLeft />
        </button>
        <h1 className="text-3xl text-center font-bold w-48">
          {MAANDEN[maand]}
        </h1>
        <button className="text-3xl mx-4" onClick={verhoogMaand}>
          <AiFillCaretRight />
        </button>
      </div>

      <div className="text-center mb-4">
        <button
          className="border-2 border-black px-2 py-1"
          onClick={() => setIsOpenModal(true)}
        >
          Voeg een training, wedstrijd of kamp toe
        </button>
        <Modal
          open={isOpenModal}
          onClose={() => setIsOpenModal(false)}
          trainers={TRAINERS}
          addEvent={addEvent}
        ></Modal>
      </div>

      {/* {isOpenEditModal ? (
        <EditModal
          onClose={() => setIsOpenEditModal(false)}
          trainers={TRAINERS}
          updateEvent={updateEvent}
          event={eventToEdit}
        ></EditModal>
      ) : null} */}

      <div>
        <Loader loading={loading} />
        <Error error={error} />
        {!loading && !error && trainingen.length !== 0 ? (
          <Maand
            maand={maand}
            jaar={jaar}
            dagen={DAGEN}
            aantalDagenPerMaand={AANTALDAGENPERMAAND}
            eventsForDay={getEventsByDay}
            trainingen={trainingen}
          />
        ) : null}
      </div>
    </div>
  );
}
