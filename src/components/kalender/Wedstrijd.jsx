import React, { useCallback } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

export default function Wedstrijd({ data, onDelete, onUpdate }) {
  const handleDelete = useCallback(
    (event) => {
      event.preventDefault();
      onDelete("wedstrijd", data.id);
    },
    [data.id, onDelete]
  );
  const handleUpdate = useCallback(
    (event) => {
      event.preventDefault();
      onUpdate("wedstrijd", data.id);
    },
    [data.id, onUpdate]
  );
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
        <button className="my-auto ml-auto mr-2" onClick={handleUpdate}>
          <AiFillEdit className="my-auto" />
        </button>
        <button className="my-auto mr-2" onClick={handleDelete}>
          <AiFillDelete className="my-auto" />
        </button>
      </div>
    </div>
  );
}
