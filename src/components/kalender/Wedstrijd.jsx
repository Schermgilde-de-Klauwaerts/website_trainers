import React from "react";

export default function Wedstrijd({ data }) {
  return (
    <div
      className={
        data.trainer === null
          ? "flex border-2 border-red-400 bg-red-600 text-white"
          : "flex border-2 bg-green-600  border-green-600 text-white"
      }
    >
      <p className="font-bold ml-2">{data.naam}:</p>{" "}
      {!data.trainer ? null : (
        <p className="ml-2">{data.trainer.split(" ")[0]}</p>
      )}
      {!data.functie ? null : <p className="ml-2">({data.functie}) </p>}
    </div>
  );
}
