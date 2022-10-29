import React, { useState } from "react";

import Navigation from "../components/Navigation";
import EventList from "../components/trainingen/EventList";

import EVENTS_DATA from "../api/mock-data_events";
import TRAINERS from "../api/mock_trainers";
import MAANDEN from "../api/mock_maanden";

export default function Overzicht() {
  const [maand, setMaand] = useState(MAANDEN[new Date().getMonth()]);

  const handleMaandChange = (e) => {
    setMaand(e.target.value);
  };

  return (
    <div className="App">
      <h1 className="text-3xl font-bold my-2 ml-10">Overzicht</h1>
      <Navigation />

      <div className="mx-10 mb-4">
        <label htmlFor="maand" className="text-2xl font-bold mr-2">
          Maand:
        </label>
        <select
          name="maand"
          id="maand"
          defaultValue={maand}
          onChange={handleMaandChange}
        >
          <option value="Januari">Januari</option>
          <option value="Februari">Februari</option>
          <option value="Maart">Maart</option>
          <option value="April">April</option>
          <option value="Mei">Mei</option>
          <option value="Juni">Juni</option>
          <option value="Juli">Juli</option>
          <option value="Augustus">Augustus</option>
          <option value="September">September</option>
          <option value="Oktober">Oktober</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
      </div>

      <EventList
        events={EVENTS_DATA}
        trainers={TRAINERS}
        maand={MAANDEN.indexOf(maand) + 1}
      />
    </div>
  );
}
