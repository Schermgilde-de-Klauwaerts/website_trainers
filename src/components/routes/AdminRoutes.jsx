import React from "react";
import { useMemo } from "react";
import { useSession } from "../../contexts/AuthProvider";
import { Outlet } from "react-router";
import Login from "../../pages/Login";

export default function AdminRoutes() {
  const { isAuthed, hasAdminRole } = useSession();

  const canShowRoute = useMemo(() => {
    return isAuthed && hasAdminRole();
  }, [hasAdminRole, isAuthed]);

  return canShowRoute ? <Outlet /> : <Login />;
}
