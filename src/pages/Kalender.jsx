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

import * as trainingenApi from "../api/trainingen";
import * as wedstrijdenApi from "../api/wedstrijden";
import * as kampenApi from "../api/kampen";

export default function Kalender() {
  const [maand, setMaand] = useState(new Date().getMonth());
  const [jaar, setJaar] = useState(new Date().getFullYear());

  const [trainingen, setTrainingen] = useState([]);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const refreshTrainingen = useCallback(async () => {
    try {
      setLoading(true);
      const data = await trainingenApi.getAll();
      setTrainingen(data);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshTrainingen();
  }, [refreshTrainingen]);

  const handleDelete = useCallback(async (idToDelete) => {
    try {
      setError(null);
      await trainingenApi.deleteById(idToDelete);
      setTrainingen((events) => events.filter(({ id }) => id !== idToDelete));
    } catch (error) {
      console.error(error);
      setError(error);
    }
  }, []);

  const createEvent = useCallback(
    async (type, event) => {
      try {
        setError(null);
        await trainingenApi.save({
          ...event,
        });
        await refreshTrainingen();
      } catch (error) {
        console.error(error);
        setError(error);
      }
    },
    [refreshTrainingen]
  );

  const getEventsByDay = useCallback(async (day) => {
    try {
      setError(null);
      const trainingen = await trainingenApi.getByDate(day);
      const wedstrijden = await wedstrijdenApi.getByDate(day);
      const kampen = await kampenApi.getByDate(day);
      return trainingen;
    } catch (error) {
      console.error(error);
      setError(error);
    }
  }, []);

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
          addEvent={createEvent}
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

      <Loader loading={loading} />
      <Error error={error} />
      {!loading && !error
        ? // <Maand
          //   maand={maand}
          //   jaar={jaar}
          //   dagen={DAGEN}
          //   aantalDagenPerMaand={AANTALDAGENPERMAAND}
          //   trainingen={trainingen}
          //   editEvent={editTraining}
          //   onDelete={handleDelete}
          // />
          null
        : null}
    </div>
  );
}
