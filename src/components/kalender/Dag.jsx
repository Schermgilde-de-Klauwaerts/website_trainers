import React from "react";

function PreviousMonthDay(dag) {
  return <div>vorige maand</div>;
}

function CurrentMonthDay({ dag, events = [] }) {
  return (
    <>
      <div>{dag}</div>
      {events.map((event) => (
        <div>{event.trainer}</div>
      ))}
    </>
  );
}

export default function Dag(props) {
  const { dag, previousMonth, eventsForDay } = props;

  return (
    <div className="text-center border-2 border-black h-36">
      {previousMonth ? (
        <PreviousMonthDay dag={dag} />
      ) : (
        <CurrentMonthDay dag={dag} events={eventsForDay} />
      )}
    </div>
  );
}
