import React from "react";

function PreviousMonthDay(dag) {
  return (
    <div className="text-center border-2 border-black h-36 bg-slate-300"></div>
  );
}

function Training({ data }) {
  return (
    <div
      className={
        data.trainer === ""
          ? "flex border-2 border-red-700"
          : "flex border-2 border-blue-700"
      }
    >
      {data.trainer === "" ? null : (
        <p className="font-bold ml-2">{data.trainer}:</p>
      )}
      <div className="flex ml-2">
        <p>{data.startuur}</p>
        <p> - </p>
        <p>{data.einduur}</p>
      </div>
    </div>
  );
}

function Wedstrijd({ data }) {
  return (
    <div
      className={
        data.trainer === ""
          ? "flex flex-col border-2 border-red-700"
          : "flex flex-col border-2 border-green-700"
      }
    >
      <p className="font-bold mx-2">{data.notities}</p>
      <p className="">{data.trainer}</p>
    </div>
  );
}

function CurrentMonthDay({ dag, events = [] }) {
  return (
    <div className="text-center border-2 border-black h-36">
      <div>{dag}</div>
      {events.map((e) =>
        e.soort === "Training" ? (
          <Training key={e.soort + e.trainer} data={e} />
        ) : (
          <Wedstrijd key={e.soort + e.trainer} data={e} />
        )
      )}
    </div>
  );
}

export default function Dag(props) {
  const { dag, previousMonth, eventsForDay, addEvent } = props;

  return (
    <div key={dag}>
      {previousMonth ? (
        <PreviousMonthDay dag={dag} />
      ) : (
        <CurrentMonthDay dag={dag} events={eventsForDay} addEvent={addEvent} />
      )}
    </div>
  );
}
