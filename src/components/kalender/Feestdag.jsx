import React from "react";

export default function Feestdag({ data }) {
  return (
    <div className="mb-2 border-2 bg-red-600  border-red-600 text-white">
      <p className="ml-2">{data.naam}</p>
    </div>
  );
}
