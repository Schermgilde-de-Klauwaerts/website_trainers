import React from "react";

function PreviousMonthDay() {
  return (
    <div className="text-center border-2 border-black h-36 bg-slate-300">
      vorige maand
    </div>
  );
}

function CurrentMonthDay(dag) {
  return (
    <div className="text-center border-2 border-black h-36">{dag.dag}</div>
  );
}

export default function Dag(props) {
  const { dag, previousMonth } = props;

  return (
    <div>
      {previousMonth ? <PreviousMonthDay /> : <CurrentMonthDay dag={dag} />}
    </div>
  );
}
