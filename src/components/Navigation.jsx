import React from "react";
import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <div className="ml-16">
      <ul class="list-disc">
        <li>
          <Link to="/kalender">Kalender</Link>
        </li>
        <li>
          <Link to="/overzicht">Overzicht</Link>
        </li>
        <li>
          <Link to="/documenten">Documenten</Link>
        </li>
      </ul>
    </div>
  );
}
