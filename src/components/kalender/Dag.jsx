import React from "react";

export default function Dag(dag) {
  return (
    <div
      className="text-center font-bold border-2 border-black h-36"
      key={dag.dag}
    >
      {dag.dag}
    </div>
  );
}
