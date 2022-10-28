import React from "react";

import Navigation from "../components/Navigation";
import Maand from "../components/kalender/Maand";

import MAANDEN from "../api/mock_maanden";
import DAGEN from "../api/mock_dagen";

export default function Kalender() {
  return (
    <div className="App">
      <h1 className="text-3xl font-bold">Kalender</h1>
      <Navigation />

      <Maand maand={MAANDEN[0]} dagen={DAGEN} />
    </div>
  );
}
