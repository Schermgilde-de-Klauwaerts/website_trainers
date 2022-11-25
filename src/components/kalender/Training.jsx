import React from "react";

export default function Training({ data }) {
  return (
    <div className="mb-2 border-2 border-blue-600 bg-blue-600 text-white">
      <div className="flex justify-center ml-2">
        <p>{data.startuur}</p>
        <p> - </p>
        <p>{data.einduur}</p>
      </div>
    </div>
  );
}
