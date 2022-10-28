import React from "react";

import Navigation from "../components/Navigation";
import TrainingList from "../components/trainingen/TrainingList";

export default function Overzicht() {
  return (
    <div className="App">
      <h1 className="text-3xl font-bold">Overzicht</h1>
      <Navigation />

      <TrainingList />
    </div>
  );
}
