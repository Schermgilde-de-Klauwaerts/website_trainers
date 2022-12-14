import React from "react";

import Wedstrijd from "./Wedstrijd";
import Training from "./Training";

function CurrentMonthDay({ datum, eventsForDay, jaaroverzicht }) {
  const trainingen = eventsForDay("training", datum);
  const wedstrijden = eventsForDay("wedstrijd", datum);
  const feestdagen = eventsForDay("feestdag", datum);
  if (feestdagen.length > 0) {
    return (
      <div className="text-center border-2 border-black h-36">
        <div className="mb-1">{datum.split("-")[2]}</div>
        <div className="mb-2 border-2 bg-red-600  border-red-600 text-white">
          {jaaroverzicht ? null : (
            <p className="ml-2 font-bold">{feestdagen[0].naam}</p>
          )}
        </div>
      </div>
    );
  }
  return (
    <div className="text-center border-2 border-black h-36">
      <div className="mb-1">{datum.split("-")[2]}</div>
      {trainingen.length !== 0
        ? trainingen.map((training, index) => (
            <Training
              key={index + 1}
              data={training}
              jaaroverzicht={jaaroverzicht}
            />
          ))
        : null}
      {wedstrijden.length !== 0
        ? wedstrijden.map((wedstrijd, index) => (
            <Wedstrijd
              key={index + 1}
              data={wedstrijd}
              jaaroverzicht={jaaroverzicht}
            />
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
  jaaroverzicht,
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
          jaaroverzicht={jaaroverzicht}
        />
      )}
    </div>
  );
}
