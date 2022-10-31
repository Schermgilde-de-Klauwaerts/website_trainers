import React, { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";

import Navigation from "../components/Navigation";
import Maand from "../components/kalender/Maand";
import Modal from "../components/Modal";

import MAANDEN from "../api/mock_maanden";
import DAGEN from "../api/mock_dagen";
import AANTALDAGENPERMAAND from "../api/mock_aantal_dagen_per_maand";
import EVENTS_DATA from "../api/mock-data_events";
import TRAINERS from "../api/mock_trainers";

import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

export default function Kalender() {
  const [maand, setMaand] = useState(new Date().getMonth());
  const [events, setEvents] = useState(EVENTS_DATA);
  const [isOpen, setIsOpen] = useState(false);

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
      console.log(events);
    },
    [events]
  );

  useEffect(() => {
    console.log(events);
  }, [events]);

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
          className="border-2 border-black"
          onClick={() => setIsOpen(true)}
        >
          Add Event
        </button>
        <Modal
          open={isOpen}
          onClose={() => setIsOpen(false)}
          trainers={TRAINERS}
          addEvent={addEvent}
        ></Modal>
      </div>

      <Maand
        maand={maand}
        dagen={DAGEN}
        aantalDagenPerMaand={AANTALDAGENPERMAAND}
        events={events}
      />
    </div>
  );
}
