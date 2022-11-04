import React, { useState, useCallback } from "react";

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
import { useWedstrijden } from "../contexts/WedstrijdenProvider";

export default function Kalender() {
  const {
    trainingen,
    error,
    loading,
    createTraining,
    deleteTraining,
    updateTraining,
  } = useTrainingen();
  const { wedstrijden, createWedstrijd, deleteWedstrijd, updateWedstrijd } =
    useWedstrijden();

  const [maand, setMaand] = useState(new Date().getMonth());
  const [jaar, setJaar] = useState(new Date().getFullYear());
  const [currentEvent, setCurrentEvent] = useState({});

  const [kampen, setKampen] = useState([]);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);

  const getEventsByDay = useCallback(
    (type, day) => {
      let data = [];
      if (type === "training") {
        data = trainingen.filter((training) => {
          return day === training.datum;
        });
      } else if (type === "wedstrijd") {
        data = wedstrijden.filter((wedstrijd) => {
          return day === wedstrijd.datum;
        });
      } else if (type === "kamp") {
        data = kampen.filter((kamp) => {
          return day === kamp.datum;
        });
      }
      return data;
    },
    [trainingen, kampen, wedstrijden]
  );

  const addEvent = useCallback(
    async (type, event) => {
      if (type === "training") {
        await createTraining(event);
      } else if (type === "wedstrijd") {
        await createWedstrijd(event);
      } else if (type === "kamp") {
        setKampen([...kampen, event]);
      }
      setCurrentEvent({});
    },
    [createTraining, createWedstrijd, kampen]
  );

  const updateEvent = useCallback(
    async (type, event) => {
      if (type === "training") {
        await updateTraining(event);
      } else if (type === "wedstrijd") {
        await updateWedstrijd(event);
      } else if (type === "kamp") {
        setKampen([...kampen, event]);
      }
      setCurrentEvent({});
    },
    [updateTraining, updateWedstrijd, kampen]
  );

  const handleDelete = useCallback(
    async (type, idToDelete) => {
      if (type === "training") {
        await deleteTraining(idToDelete);
      } else if (type === "wedstrijd") {
        await deleteWedstrijd(idToDelete);
      } else if (type === "kamp") {
        setKampen([...kampen, idToDelete]);
      }
    },
    [deleteTraining, deleteWedstrijd, kampen]
  );

  const setEventToUpdate = useCallback(
    (type, id) => {
      //   if (type === "training") {
      //     setCurrentEvent(id === null ? {} : trainingen.find((t) => t.id === id));
      //   } else if (type === "wedstrijd") {
      //     setCurrentEvent(
      //       id === null ? {} : wedstrijden.find((w) => w.id === id)
      //     );
      //   } else if (type === "kamp") {
      //     setCurrentEvent(id === null ? {} : kampen.find((k) => k.id === id));
      //   }
      console.log(type, id);
    },
    [trainingen, wedstrijden, kampen]
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

      {!JSON.stringify(currentEvent) === "{}" ? (
        <EditModal
          open={isOpenEditModal}
          onClose={() => setIsOpenEditModal(false)}
          trainers={TRAINERS}
          currentEvent={currentEvent}
          updateEvent={updateEvent}
        ></EditModal>
      ) : null}

      <div>
        <Loader loading={loading} />
        <Error error={error} />
        {!loading && !error ? (
          <Maand
            maand={maand}
            jaar={jaar}
            dagen={DAGEN}
            aantalDagenPerMaand={AANTALDAGENPERMAAND}
            eventsForDay={getEventsByDay}
            handleDelete={handleDelete}
            handleUpdate={setEventToUpdate}
          />
        ) : null}
      </div>
    </div>
  );
}
