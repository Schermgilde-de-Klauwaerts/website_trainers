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

import * as eventsApi from "../api/events";

export default function Kalender() {
  const [maand, setMaand] = useState(new Date().getMonth());
  const [events, setEvents] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  // const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  // const [eventToEdit, setEventToEdit] = useState(EVENTS_DATA[0]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const refreshEvents = useCallback(async () => {
    try {
      setLoading(true);
      const data = await eventsApi.getAll();
      setEvents(data);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    refreshEvents();
  }, [refreshEvents]);

  const addEvent = useCallback(
    (data) => {
      const { trainer, type, datum, startuur, einduur, notities } = data;

      const dag = datum.split("-")[2];
      const maand = datum.split("-")[1];
      const jaar = datum.split("-")[0];

      let date = new Date(Date.UTC(jaar, maand - 1, dag));

      const options = {
        weekday: "long",
        year: "numeric",
        month: "numeric",
        day: "numeric",
      };

      date = date.toLocaleDateString("nl-BE", options);

      console.log(date);

      setEvents([
        ...events,
        {
          id: 5,
          soort: type,
          trainer: trainer,
          datum: date,
          startuur: startuur,
          einduur: einduur,
          notities: notities,
        },
      ]);
    },
    [events]
  );

  const editEvent = useCallback((data) => {
    // setEventToEdit(data);
    // setIsOpenEditModal(true);
    console.log("edit " + data.id);
  }, []);

  const updateEvent = useCallback(
    (data) => {
      const { id, trainer, type, datum, startuur, einduur, notities } = data;
      const event = events.find((event) => event.id === id);
      const index = events.indexOf(event);
      events.splice(index, 1, {
        id: id,
        soort: type,
        trainer: trainer,
        datum: datum,
        startuur: startuur,
        einduur: einduur,
        notities: notities,
      });
    },
    [events]
  );

  const handleDelete = useCallback(async (idToDelete) => {
    try {
      setError(null);
      await eventsApi.deleteById(idToDelete);
      setEvents((events) => events.filter(({ id }) => id !== idToDelete)); // 👈 2
    } catch (error) {
      console.error(error);
      setError(error);
    }
  }, []);

  const createEvent = useCallback(
    async (event) => {
      try {
        setError(null);
        await eventsApi.save({
          ...event,
        });
        await refreshEvents();
      } catch (error) {
        console.error(error);
        setError(error);
      }
    },
    [refreshEvents]
  );

  const verlaagMaand = () => {
    if (maand > 0) {
      setMaand(maand - 1);
    }
  };

  const verhoogMaand = () => {
    if (maand < MAANDEN.length - 1) {
      setMaand(maand + 1);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold my-2 ml-10">Kalender</h1>
      <Navigation />

      <div className="flex flex-row justify-center my-4">
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
          Voeg een training, wedstrijd,... toe
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
      {!loading && !error ? (
        <Maand
          maand={maand}
          dagen={DAGEN}
          aantalDagenPerMaand={AANTALDAGENPERMAAND}
          events={events}
          editEvent={editEvent}
          onDelete={handleDelete}
        />
      ) : null}
    </div>
  );
}
