import React from "react";
import { Routes, Route } from "react-router-dom";

import Kalender from "./pages/Kalender";
import Overzicht from "./pages/Overzicht";
import Documenten from "./pages/Documenten";

function App() {
  return (
    <Routes>
      <Route index element={<Kalender />} />
      <Route path="kalender" element={<Kalender />} />
      <Route path="overzicht" element={<Overzicht />} />
      <Route path="documenten" element={<Documenten />} />
      <Route path="*" element={<Kalender />} />
    </Routes>
  );
}

export default App;
