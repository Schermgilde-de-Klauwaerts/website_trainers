import React from "react";

import Wedstrijd from "./Wedstrijd";
import Training from "./Training";

function CurrentMonthDay({ datum, eventsForDay, handleDelete }) {
  const trainingen = eventsForDay("training", datum);
  const wedstrijden = eventsForDay("wedstrijd", datum);
  return (
    <div className="text-center border-2 border-black h-36">
      <div className="mb-1">{datum.split("-")[2]}</div>
      {trainingen.length !== 0
        ? trainingen.map((training, index) => (
            <Training key={index + 1} data={training} onDelete={handleDelete} />
          ))
        : null}
      {wedstrijden.length !== 0
        ? wedstrijden.map((wedstrijd, index) => (
            <Wedstrijd key={index + 1} data={wedstrijd} />
          ))
        : null}
    </div>
  );
}

function PreviousMonthDay() {
  return (
    <div className="text-center border-2 border-black h-36 bg-slate-300"></div>
  );
}

export default function Dag({
  dag,
  maand,
  jaar,
  previousMonth,
  eventsForDay,
  handleDelete,
}) {
  const datum = `${jaar}-${maand + 1 < 10 ? "0" : ""}${maand + 1}-${
    dag < 10 ? "0" : ""
  }${dag}`;
  return (
    <div key={dag}>
      {previousMonth ? (
        <PreviousMonthDay />
      ) : (
        <CurrentMonthDay
          datum={datum}
          eventsForDay={eventsForDay}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
}
