import React, { useCallback } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useSession } from "../../contexts/AuthProvider";

export default function Training({ data, onDelete, onUpdate }) {
  const { hasAdminRole } = useSession();
  const handleDelete = useCallback(
    (event) => {
      event.preventDefault();
      onDelete("training", data.id);
    },
    [data.id, onDelete]
  );
  const handleUpdate = useCallback(
    (event) => {
      event.preventDefault();
      onUpdate("training", data.id);
    },
    [data.id, onUpdate]
  );
  if (!data.trainer && !data.startuur && !data.einduur) {
    return (
      <div className=" flex border-2 border-red-600 bg-red-600 text-white text-center">
        <div className="ml-2">Training</div>

        {hasAdminRole() ? (
          <>
            <button className="my-auto ml-auto mr-2" onClick={handleUpdate}>
              <AiFillEdit className="my-auto" />
            </button>
            <button className="my-auto mr-2" onClick={handleDelete}>
              <AiFillDelete className="my-auto" />
            </button>
          </>
        ) : null}
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
      {hasAdminRole() ? (
        <>
          {" "}
          <button className="my-auto ml-auto mr-2" onClick={handleUpdate}>
            <AiFillEdit className="my-auto" />
          </button>
          <button className="my-auto mr-2" onClick={handleDelete}>
            <AiFillDelete className="my-auto" />
          </button>
        </>
      ) : null}
    </div>
  );
}
