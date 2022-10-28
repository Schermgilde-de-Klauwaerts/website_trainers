import React, { useState } from "react";

import Navigation from "../components/Navigation";
import Maand from "../components/kalender/Maand";

import MAANDEN from "../api/mock_maanden";
import DAGEN from "../api/mock_dagen";

import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

export default function Kalender() {
  const [maand, setMaand] = useState(0);

  const verlaagMaand = () => {
    if (maand > 0) {
      setMaand(maand - 1);
    }
  };

  const verhoogMaand = () => {
    if (maand < MAANDEN.length - 1) {
      setMaand(maand + 1);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold my-2 ml-10">Kalender</h1>
      <Navigation />

      <div className="flex flex-row justify-center my-4">
        <button className="text-3xl mx-4" onClick={verlaagMaand}>
          <AiFillCaretLeft />
        </button>
        <h1 className="text-3xl text-center font-bold w-48">
          {MAANDEN[maand]}
        </h1>
        <button className="text-3xl mx-4" onClick={verhoogMaand}>
          <AiFillCaretRight />
        </button>
      </div>

      <Maand maand={MAANDEN[0]} dagen={DAGEN} />
    </div>
  );
}
