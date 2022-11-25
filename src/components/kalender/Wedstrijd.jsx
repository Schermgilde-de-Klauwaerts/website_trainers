import React from "react";

export default function Wedstrijd({ data }) {
  return (
    <div className="mb-2 border-2 bg-green-600  border-green-600 text-white font-bold">
      <p className="ml-2">{data.naam}</p>
    </div>
  );
}
