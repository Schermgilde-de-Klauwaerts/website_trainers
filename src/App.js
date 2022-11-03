import React from "react";
import { Routes, Route } from "react-router-dom";

import Kalender from "./pages/Kalender";
import Overzicht from "./pages/Overzicht";
import Documenten from "./pages/Documenten";
import Login from "./pages/Login";

import { TrainingenProvider } from "./contexts/TrainingenProvider";

function App() {
  return (
    <TrainingenProvider>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="kalender" element={<Kalender />} />
        <Route path="overzicht" element={<Overzicht />} />
        <Route path="documenten" element={<Documenten />} />
        <Route path="*" element={<Kalender />} />
      </Routes>
    </TrainingenProvider>
  );
}

export default App;
