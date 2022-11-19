import React from "react";
import { Routes, Route } from "react-router-dom";

import Kalender from "./pages/Kalender";

function App() {
  return (
    <Routes>
      <Route path="*" element={<Kalender />} />
    </Routes>
  );
}

export default App;
