import React, { useCallback } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

export default function Training({ data, onDelete, onUpdate }) {
  const handleDelete = useCallback(
    (event) => {
      event.preventDefault();
      onDelete(data.id);
    },
    [data.id, onDelete]
  );
  const handleUpdate = useCallback(
    (event) => {
      event.preventDefault();
      onUpdate(data.id);
    },
    [data.id, onUpdate]
  );
  if (!data.trainer && !data.startuur && !data.einduur) {
    return (
      <div className="border-2 border-red-600 bg-red-600 text-white text-center">
        <p>Training</p>

        <button className="my-auto ml-auto mr-2" onClick={handleUpdate}>
          <AiFillEdit className="my-auto" />
        </button>
        <button className="my-auto mr-2" onClick={handleDelete}>
          <AiFillDelete className="my-auto" />
        </button>
      </div>
    );
  }
  return (
    <div
      className={
        !data.trainer
          ? "flex border-2 border-red-600 bg-red-600 text-white"
          : "flex border-2 border-blue-600 bg-blue-600 text-white"
      }
    >
      {!data.trainer ? null : (
        <p className="font-bold ml-2">{data.trainer.split(" ")[0]}:</p>
      )}
      {!data.startuur || !data.einduur ? null : (
        <div className="flex ml-2">
          <p>{data.startuur || null}</p>
          <p> - </p>
          <p>{data.einduur || null}</p>
        </div>
      )}
      <button className="my-auto ml-auto mr-2" onClick={handleUpdate}>
        <AiFillEdit className="my-auto" />
      </button>
      <button className="my-auto mr-2" onClick={handleDelete}>
        <AiFillDelete className="my-auto" />
      </button>
    </div>
  );
}
