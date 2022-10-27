import React from "react";

import Navigation from "../components/Navigation";
import TrainingList from "../components/trainingen/TrainingList";

export default function Kalender() {
  return (
    <div className="App">
      <h1>Kalender</h1>
      
      <Navigation />

      <TrainingList />
    </div>
  );
}
