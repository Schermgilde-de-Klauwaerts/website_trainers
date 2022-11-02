import { useEffect, useState } from "react";
import Dag from "./Dag";

export default function Maand({
  maand,
  jaar,
  dagen,
  aantalDagenPerMaand,
  trainingen,
  editEvent,
  onDelete,
}) {
  const [events, setTrainingen] = useState([]);
  const [aantalDagen, setAantalDagen] = useState(aantalDagenPerMaand[maand]);
  const [trainingenForMonth, setTrainingenForMonth] = useState([]);

  console.log(trainingenForMonth);

  useEffect(async () => {
    const trainingen = await trainingen;
    setTrainingen(trainingen);
    setAantalDagen(aantalDagenPerMaand[maand]);
    setTrainingenForMonth(
      trainingen.filter(
        (training) =>
          training.datum.split("-")[1].toString() === (maand + 1).toString()
      )
    );
  }, [aantalDagenPerMaand, maand, trainingen]);

  const calculateFirstDay = () => {
    const date = new Date(jaar, maand, 1);
    return date.getDay() === 0 ? 0 : date.getDay() - 1;
  };

  const trainingenForDay = (day) => {
    console.log(trainingenForMonth);
    return trainingenForMonth.filter(
      (training) =>
        training.datum.split(" ")[1].split("/")[0] === day.toString()
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
            eventsForDay={trainingenForDay(index + 1)}
            editEvent={editEvent}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
