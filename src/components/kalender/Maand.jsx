import { useEffect, useState } from "react";
import Dag from "./Dag";

export default function Maand({ maand, dagen, aantalDagenPerMaand, events }) {
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
    setEventsForMonth(
      events.filter(
        (event) =>
          event.datum.split(" ")[1].split("/")[1].toString() ===
          (maand + 1).toString()
      )
    );
  }, [aantalDagenPerMaand, maand, events]);

  console.log(eventsForMonth);

  const calculateFirstDay = () => {
    const date = new Date(jaar, maand, 1);
    return date.getDay() === 0 ? 0 : date.getDay() - 1;
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
          <Dag dag={index + 1} key={index + 1} />
        ))}
      </div>
    </div>
  );
}
