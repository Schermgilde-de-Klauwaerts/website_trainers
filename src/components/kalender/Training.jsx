import React from "react";

export default function Training({ data, jaaroverzicht }) {
  return (
    <div className="mb-2 border-2 border-yellow-400 bg-yellow-400 text-white">
      {jaaroverzicht ? null : (
        <div className="flex justify-center ml-2 font-bold">
          <p>{data.startuur}</p>
          <p> - </p>
          <p>{data.einduur}</p>
        </div>
      )}
    </div>
  );
}
