import React, { useState, useCallback } from "react";

import Navigation from "../components/Navigation";
import EventList from "../components/trainingen/EventList";

import TRAINERS from "../api/mocks/mock_trainers";
import MAANDEN from "../api/mocks/mock_maanden";

import { useTrainingen } from "../contexts/TrainingenProvider";
import { useWedstrijden } from "../contexts/WedstrijdenProvider";
import Loader from "../components/Loader";
import Error from "../components/Error";

import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

export default function Overzicht() {
  const { trainingen, error, loading } = useTrainingen();
  const { wedstrijden } = useWedstrijden();

  const [maand, setMaand] = useState(new Date().getMonth());
  const [jaar, setJaar] = useState(new Date().getFullYear());

  const getEvents = useCallback(() => {
    let data = [];
    data = trainingen.filter((training) => {
      return (
        maand === new Date(training.datum).getMonth() &&
        jaar === new Date(training.datum).getFullYear()
      );
    });
    data = data.concat(
      wedstrijden.filter((wedstrijd) => {
        return (
          maand === new Date(wedstrijd.datum).getMonth() &&
          jaar === new Date(wedstrijd.datum).getFullYear()
        );
      })
    );
    return data;
  }, [trainingen, wedstrijden, maand, jaar]);

  const verlaagMaand = useCallback(() => {
    setJaar(maand === 0 ? jaar - 1 : jaar);
    setMaand(maand === 0 ? 11 : maand - 1);
  }, [maand, jaar]);

  const verhoogMaand = useCallback(() => {
    setJaar(maand === 11 ? jaar + 1 : jaar);
    setMaand((maand + 1) % 12);
  }, [maand, jaar]);

  return (
    <div className="App">
      <h1 className="text-3xl font-bold my-2 ml-10">Overzicht</h1>
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

      <div>
        <Loader loading={loading} />
        <Error error={error} />
        {!loading &&
        !error &&
        trainingen.length !== 0 &&
        wedstrijden.length !== 0 ? (
          <EventList
            events={getEvents()}
            trainers={TRAINERS}
            maand={maand + 1}
            jaar={jaar}
          />
        ) : null}
      </div>
    </div>
  );
}
