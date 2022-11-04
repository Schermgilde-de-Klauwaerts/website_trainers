import React from "react";
import { AiFillDelete } from "react-icons/ai";

export default function Wedstrijd({ data, onDelete }) {
  return (
    <div
      className={
        data.trainer === null
          ? "flex border-2 border-red-400 bg-red-600 text-white"
          : "flex flex-col border-2 bg-green-600  border-green-600 text-white"
      }
    >
      <div className="flex flex-row">
        <p className="font-bold ml-2">{data.naam}:</p>{" "}
        {!data.trainer ? null : (
          <p className="ml-2">{data.trainer.split(" ")[0]}</p>
        )}
        {!data.functie ? null : <p className="ml-2">({data.functie}) </p>}
        <button
          className="my-auto ml-auto mr-2"
          onClick={() => onDelete("wedstrijd", data.id)}
        >
          <AiFillDelete className="my-auto" />
        </button>
      </div>
    </div>
  );
}
