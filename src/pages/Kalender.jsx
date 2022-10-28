import React from "react";

import Navigation from "../components/Navigation";
import Maand from "../components/kalender/Maand";

import MAANDEN from "../api/mock_maanden";
import DAGEN from "../api/mock_dagen";

export default function Kalender() {
  return (
    <div>
      <h1 className="text-3xl font-bold my-2 ml-10">Kalender</h1>
      <Navigation />

      <Maand maand={MAANDEN[0]} dagen={DAGEN} />
    </div>
  );
}
