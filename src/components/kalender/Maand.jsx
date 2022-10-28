import { useEffect, useState } from "react";
import Dag from "./Dag";

export default function Maand({ maanden, maand, dagen, aantalDagenPerMaand }) {
  const [aantalDagen, setAantalDagen] = useState(
    aantalDagenPerMaand[maanden.indexOf(maand)]
  );

  useEffect(() => {
    setAantalDagen(aantalDagenPerMaand[maanden.indexOf(maand)]);
  }, [aantalDagenPerMaand, maand, maanden]);

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
        {[...Array(aantalDagen)].map((dag, index = 0) => (
          <Dag dag={index + 1} key={index + 1} />
        ))}
      </div>
    </div>
  );
}
