import React from "react";
import { Routes, Route } from "react-router-dom";

import Kalender from "./pages/Kalender";
import Overzicht from "./pages/Overzicht";
import Documenten from "./pages/Documenten";
import Login from "./pages/Login";

import { TrainingenProvider } from "./contexts/TrainingenProvider";
import { WedstrijdenProvider } from "./contexts/WedstrijdenProvider";
import { AuthProvider } from "./contexts/AuthProvider";

import UserRoutes from "./components/routes/UserRoutes";
import AdminRoutes from "./components/routes/AdminRoutes";

function App() {
  return (
    <AuthProvider>
      <WedstrijdenProvider>
        <TrainingenProvider>
          <Routes>
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<Kalender />} />
            <Route element={<UserRoutes />}>
              <Route path="kalender" element={<Kalender />} />
              <Route element={<AdminRoutes />}>
                <Route path="overzicht" element={<Overzicht />} />
                <Route path="documenten" element={<Documenten />} />
              </Route>
            </Route>
          </Routes>
        </TrainingenProvider>
      </WedstrijdenProvider>
    </AuthProvider>
  );
}

export default App;
