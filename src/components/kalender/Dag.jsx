import React from "react";

function PreviousMonthDay(dag) {
  return <div>vorige maand</div>;
}

function CurrentMonthDay({ dag, events = [] }) {
  return (
    <>
      <div>{dag}</div>
      {events.map((e) => (
        <div key={e.trainer} className="flex flew-row border-2 border-blue-700">
          <p className="font-bold mx-2">{e.trainer}:</p>
          <p>{e.startuur}</p>
          <p> - </p>
          <p>{e.einduur}</p>
        </div>
      ))}
    </>
  );
}

export default function Dag(props) {
  const { dag, previousMonth, eventsForDay } = props;

  return (
    <div key={dag} className="text-center border-2 border-black h-36">
      {previousMonth ? (
        <PreviousMonthDay dag={dag} />
      ) : (
        <CurrentMonthDay dag={dag} events={eventsForDay} />
      )}
    </div>
  );
}
