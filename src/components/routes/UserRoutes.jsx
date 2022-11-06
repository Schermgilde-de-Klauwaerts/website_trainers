import React from "react";
import { useSession } from "../../contexts/AuthProvider";
import { Outlet } from "react-router";
import Login from "../../pages/Login";

export default function UserRoutes() {
  const { isAuthed } = useSession();
  return isAuthed ? <Outlet /> : <Login />;
}
