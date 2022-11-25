import React, { useState, useCallback } from "react";

import Maand from "../components/kalender/Maand";

import MAANDEN from "../api/mocks/mock_maanden";
import DAGEN from "../api/mocks/mock_dagen";
import AANTALDAGENPERMAAND from "../api/mocks/mock_aantal_dagen_per_maand";

import TRAININGEN from "../api/mocks/mock_trainingen";
import WEDSTRIJDEN from "../api/mocks/mock_wedstrijden";
import KAMPEN from "../api/mocks/mock_kampen";
import FEESTDAGEN from "../api/mocks/mock_feestdagen";

import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

export default function Kalender() {
  const [maand, setMaand] = useState(new Date().getMonth());
  const [jaar, setJaar] = useState(new Date().getFullYear());
  const [jaaroverzicht, setJaaroverzicht] = useState(false);

  const getEventsByDay = (type, day) => {
    let data = [];
    if (type === "training") {
      data = TRAININGEN.filter((training) => {
        return day === training.datum;
      });
    } else if (type === "wedstrijd") {
      data = WEDSTRIJDEN.filter((wedstrijd) => {
        return day === wedstrijd.datum;
      });
    } else if (type === "kamp") {
      data = KAMPEN.filter((kamp) => {
        return day === kamp.datum;
      });
    } else if (type === "feestdag") {
      data = FEESTDAGEN.filter((feestdag) => {
        return day === feestdag.datum;
      });
    }
    return data;
  };

  const verlaagMaand = useCallback(() => {
    setJaar(maand === 0 ? jaar - 1 : jaar);
    setMaand(maand === 0 ? 11 : maand - 1);
  }, [maand, jaar]);

  const verhoogMaand = useCallback(() => {
    setJaar(maand === 11 ? jaar + 1 : jaar);
    setMaand((maand + 1) % 12);
  }, [maand, jaar]);

  return (
    <>
      {/* <div>
        <button className="border-2 border-black m-4 text-center px-2">
          {jaaroverzicht ? "maand" : "jaar"}
        </button>
      </div>

      <div className="grid grid-cols-2">
        {MAANDEN.map((m) => (
          <div className="flex flex-col justify-center">
            <div className="mx-auto my-2 text-3xl font-bold">{m}</div>
            <Maand
              maand={maand}
              jaar={jaar}
              dagen={DAGEN}
              aantalDagenPerMaand={AANTALDAGENPERMAAND}
              eventsForDay={getEventsByDay}
              jaaroverzicht
            />
          </div>
        ))}
      </div> */}

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
      <Maand
        maand={maand}
        jaar={jaar}
        dagen={DAGEN}
        aantalDagenPerMaand={AANTALDAGENPERMAAND}
        eventsForDay={getEventsByDay}
        jaaroverzicht={jaaroverzicht}
      />
    </>
  );
}
