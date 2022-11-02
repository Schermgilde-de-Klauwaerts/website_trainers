import React, { useCallback } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

function PreviousMonthDay() {
  return (
    <div className="text-center border-2 border-black h-36 bg-slate-300"></div>
  );
}

function Training({ data, editEvent, deleteEvent }) {
  return (
    <div
      className={
        data.trainer === ""
          ? "flex border-2 border-red-700"
          : "flex border-2 border-blue-700"
      }
    >
      {data.trainer === "" ? null : (
        <p className="font-bold ml-2">{data.trainer.split(" ")[0]}:</p>
      )}
      <div className="flex ml-2">
        <p>{data.startuur}</p>
        <p> - </p>
        <p>{data.einduur}</p>
      </div>
      <button className="my-auto ml-auto mr-2" onClick={() => editEvent(data)}>
        <AiFillEdit className="my-auto" />
      </button>
      <button className="my-auto mr-2" onClick={() => deleteEvent(data.id)}>
        <AiFillDelete className="my-auto" />
      </button>
    </div>
  );
}

function Wedstrijd({ data, editEvent, deleteEvent }) {
  const handleDelete = useCallback(
    async (event) => {
      event.preventDefault();
      deleteEvent(data.id);
    },
    [deleteEvent, data.id]
  );

  return (
    <div
      className={
        data.trainer === ""
          ? "flex flex-col border-2 border-red-700"
          : "flex flex-col border-2 border-green-700"
      }
    >
      <div className="flex flex-row">
        <p className="font-bold ml-2 mr-auto">{data.notities}</p>
        <button onClick={() => editEvent(data)}>
          <AiFillEdit className="mr-2 my-auto" />
        </button>
        <button className="my-auto mr-2" onClick={handleDelete}>
          <AiFillDelete className="my-auto" />
        </button>
      </div>
      <p className="mx-auto">{data.trainer.split(" ")[0]}</p>
    </div>
  );
}

function CurrentMonthDay({ dag, events = [], editEvent, onDelete }) {
  return (
    <div className="text-center border-2 border-black h-36">
      <div>{dag}</div>
      {events.map((e) =>
        e.soort === "Training" ? (
          <Training
            key={e.soort + e.trainer}
            data={e}
            editEvent={editEvent}
            deleteEvent={onDelete}
          />
        ) : (
          <Wedstrijd
            key={e.soort + e.trainer}
            data={e}
            editEvent={editEvent}
            deleteEvent={onDelete}
          />
        )
      )}
    </div>
  );
}

export default function Dag(props) {
  const { dag, previousMonth, eventsForDay, editEvent, onDelete } = props;

  return (
    <div key={dag}>
      {previousMonth ? (
        <PreviousMonthDay />
      ) : (
        <CurrentMonthDay
          dag={dag}
          events={eventsForDay}
          editEvent={editEvent}
          onDelete={onDelete}
        />
      )}
    </div>
  );
}
