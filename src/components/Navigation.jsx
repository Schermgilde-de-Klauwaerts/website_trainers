import React from "react";
import { useCallback } from "react";
import { Link } from "react-router-dom";
import { useLogout, useSession } from "../contexts/AuthProvider";

export default function Navigation() {
  const logout = useLogout();

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);
  return (
    <div className="ml-16 mb-4">
      <ul className="list-disc">
        <li>
          <Link to="/kalender">Kalender</Link>
        </li>
        <li>
          <Link to="/overzicht">Overzicht</Link>
        </li>
        <li>
          <Link to="/documenten">Documenten</Link>
        </li>

        <button className="mt-2 border-2 border-black py-1 px-2 ">
          <Link onClick={handleLogout} to="/login">
            Logout
          </Link>
        </button>
      </ul>
    </div>
  );
}
