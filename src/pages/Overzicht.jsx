import React, { useState } from "react";

import Navigation from "../components/Navigation";
import EventList from "../components/trainingen/EventList";

import TRAINERS from "../api/mocks/mock_trainers";
import MAANDEN from "../api/mocks/mock_maanden";
import { useCallback } from "react";
import { useEffect } from "react";

import * as trainingenApi from "../api/trainingen";

export default function Overzicht() {
  const [trainingen, setTrainingen] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [maand, setMaand] = useState(MAANDEN[new Date().getMonth()]);

  const refreshTrainingen = useCallback(async () => {
    try {
      setLoading(true);
      const data = await trainingenApi.getAll();
      setTrainingen(data);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshTrainingen();
  }, [refreshTrainingen]);

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
        events={trainingen}
        trainers={TRAINERS}
        maand={MAANDEN.indexOf(maand) + 1}
      />
    </div>
  );
}
