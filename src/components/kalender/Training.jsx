import React from "react";

export default function Training({ data }) {
  if (!data.trainer && !data.startuur && !data.einduur) {
    return (
      <div className=" flex border-2 border-red-600 bg-red-600 text-white text-center">
        <div className="ml-2">Training</div>
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
    </div>
  );
}
