import { useEffect, useState } from "react";

export default function Maand({ maanden, maand, dagen, aantalDagenPerMaand }) {
  const [aantalDagen, setAantalDagen] = useState(
    aantalDagenPerMaand[maanden.indexOf(maand)]
  );

  useEffect(() => {
    setAantalDagen(aantalDagenPerMaand[maanden.indexOf(maand)]);
  }, [aantalDagenPerMaand, maand, maanden]);

  return (
    <div className="mx-16">
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
        {[...Array(aantalDagen)].map((dag) => (
          <div
            className="text-center font-bold border-2 border-black h-36"
            key={dag}
          >
            {dag}
          </div>
        ))}
      </div>
    </div>
  );
}
