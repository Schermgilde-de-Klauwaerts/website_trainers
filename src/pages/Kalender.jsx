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

import {
  AiFillCaretLeft,
  AiFillCaretRight,
  AiFillPlusCircle,
} from "react-icons/ai";

import { useTrainingen } from "../contexts/TrainingenProvider";
import { useWedstrijden } from "../contexts/WedstrijdenProvider";
import { useLogout, useSession } from "../contexts/AuthProvider";
import { Link } from "react-router-dom";

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
  const { hasAdminRole } = useSession();
  const logout = useLogout();

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
      if (type === "training") {
        const event = id === null ? {} : trainingen.find((t) => t.id === id);
        setCurrentEvent({ type: "training", ...event });
        setCurrentEvent({ type: "training", ...event });
        setIsOpenEditModal(true);
      } else if (type === "wedstrijd") {
        const event = id === null ? {} : wedstrijden.find((w) => w.id === id);
        setCurrentEvent({ type: "wedstrijd", ...event });
        setCurrentEvent({ type: "wedstrijd", ...event });
        setIsOpenEditModal(true);
      } else if (type === "kamp") {
        setCurrentEvent(id === null ? {} : kampen.find((k) => k.id === id));
      }
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

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  return (
    <div>
      {hasAdminRole() ? (
        <>
          <h1 className="text-3xl font-bold my-2 ml-10">Kalender</h1>
          <Navigation />
        </>
      ) : (
        <Link
          className="ml-16 underline border-2 border-black py-1 px-2 "
          onClick={handleLogout}
          to="/login"
        >
          Logout
        </Link>
      )}

      <h1 className="text-3xl text-center font-bold w-48 mx-auto mt-4">
        {jaar}
      </h1>
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

      {hasAdminRole() ? (
        <div className="flex flex-row justify-center mb-4">
          <button
            className="flex flex-row border-2 border-black px-2 py-1"
            onClick={() => setIsOpenModal(true)}
          >
            <AiFillPlusCircle className="text-3xl mx-2 my-auto" />{" "}
            <p className="my-auto">training, wedstrijd of kamp</p>
          </button>
          <Modal
            open={isOpenModal}
            onClose={() => setIsOpenModal(false)}
            trainers={TRAINERS}
            addEvent={addEvent}
          ></Modal>
        </div>
      ) : null}

      {hasAdminRole() &&
      isOpenEditModal &&
      JSON.stringify(currentEvent) !== "{}" ? (
        <EditModal
          open={isOpenEditModal}
          onClose={() => setIsOpenEditModal(false)}
          trainers={TRAINERS}
          event={currentEvent}
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
