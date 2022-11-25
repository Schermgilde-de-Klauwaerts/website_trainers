import React from "react";

export default function Wedstrijd({ data, jaaroverzicht }) {
  return (
    <div className="mb-2 border-2 bg-green-600  border-green-600 text-white font-bold">
      {jaaroverzicht ? null : <p className="ml-2">{data.naam}</p>}
    </div>
  );
}
