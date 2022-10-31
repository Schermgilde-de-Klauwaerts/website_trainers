import { useEffect, useState } from "react";
import Dag from "./Dag";

export default function Maand({
  maand,
  dagen,
  aantalDagenPerMaand,
  events,
  editEvent,
}) {
  const [aantalDagen, setAantalDagen] = useState(aantalDagenPerMaand[maand]);
  const [jaar, setJaar] = useState(new Date().getFullYear());
  const [eventsForMonth, setEventsForMonth] = useState(
    events.filter(
      (event) =>
        event.datum.split(" ")[1].split("/")[1].toString() ===
        (maand + 1).toString()
    )
  );

  useEffect(() => {
    setAantalDagen(aantalDagenPerMaand[maand]);
    setJaar(new Date().getFullYear());
    setEventsForMonth(
      events.filter(
        (event) =>
          event.datum.split(" ")[1].split("/")[1] === (maand + 1).toString()
      )
    );
  }, [aantalDagenPerMaand, maand, events]);

  const calculateFirstDay = () => {
    const date = new Date(jaar, maand, 1);
    return date.getDay() === 0 ? 0 : date.getDay() - 1;
  };

  const eventsForDay = (day) => {
    return eventsForMonth.filter(
      (event) => event.datum.split(" ")[1].split("/")[0] === day.toString()
    );
  };

  return (
    <div className="mx-16 mb-16">
      <div className="grid grid-cols-7">
        {dagen.map((dag) => (
          <div
            className="text-center font-bold border-2 border-black"
            key={dag}
          >
            {dag}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {[...Array(calculateFirstDay())].map((dag, index) => (
          <Dag dag={index} key={index + 1} previousMonth />
        ))}
        {[...Array(aantalDagen)].map((dag, index) => (
          <Dag
            dag={index + 1}
            key={index + 1}
            eventsForDay={eventsForDay(index + 1)}
            editEvent={editEvent}
          />
        ))}
      </div>
    </div>
  );
}
