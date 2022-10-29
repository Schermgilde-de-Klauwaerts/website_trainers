import { useEffect, useState } from "react";
import Dag from "./Dag";

export default function Maand({ maand, dagen, aantalDagenPerMaand, events }) {
  const [aantalDagen, setAantalDagen] = useState(aantalDagenPerMaand[maand]);

  const [jaar, setJaar] = useState(new Date().getFullYear());

  useEffect(() => {
    setAantalDagen(aantalDagenPerMaand[maand]);
  }, [aantalDagenPerMaand, maand]);

  const calculateFirstDay = () => {
    const date = new Date(jaar, maand, 1);
    return date.getDay() === 0 ? 0 : date.getDay() - 1;
  };

  console.log(calculateFirstDay());

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
