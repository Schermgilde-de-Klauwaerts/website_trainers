import React from "react";

export default function Dag(props) {
  const { dag, previousMonth } = props;

  return (
    <div>
      {previousMonth ? (
        <div className="text-center border-2 border-black h-36 bg-slate-300">
          vorige maand
        </div>
      ) : (
        <div className="text-center font-bold border-2 border-black h-36">
          {dag}
        </div>
      )}
    </div>
  );
}
