import React from "react";

function PreviousMonthDay(dag) {
  return (
    <div className="text-center border-2 border-black h-36 bg-slate-300"></div>
  );
}

function CurrentMonthDay({ dag, events = [] }) {
  return (
    <div className="text-center border-2 border-black h-36">
      <div>{dag}</div>
      {events.map((e) => (
        <div key={e.trainer} className="flex flew-row border-2 border-blue-700">
          <p className="font-bold mx-2">{e.trainer}:</p>
          <p>{e.startuur}</p>
          <p> - </p>
          <p>{e.einduur}</p>
        </div>
      ))}
    </div>
  );
}

export default function Dag(props) {
  const { dag, previousMonth, eventsForDay } = props;

  return (
    <div key={dag}>
      {previousMonth ? (
        <PreviousMonthDay dag={dag} />
      ) : (
        <CurrentMonthDay dag={dag} events={eventsForDay} />
      )}
    </div>
  );
}
