import React from "react";

import Navigation from "../components/Navigation";
import EventList from "../components/trainingen/EventList";

import EVENTS_DATA from "../api/mock-data_events";
import TRAINERS from "../api/mock_trainers";

export default function Overzicht() {
  return (
    <div className="App">
      <h1 className="text-3xl font-bold my-2 ml-10">Overzicht</h1>
      <Navigation />

      <EventList events={EVENTS_DATA} trainers={TRAINERS}/>
    </div>
  );
}
