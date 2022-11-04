import { ErrorMessage } from "@hookform/error-message";
import React from "react";

export default function TrainingForm({ register, trainers, errors }) {
  return (
    <>
      <label
        htmlFor="trainer"
        className="col-span-6 text-gray-600 bg-white border-t-2 border-l-2 border-r-2 border-gray-600 w-min py-1 px-2"
      >
        TRAINER
      </label>
      <select
        name="trainer"
        id="trainer"
        {...register("trainer")}
        className="col-span-6 border-2 bg-white border-gray-600 mb-2 h-12 pl-2"
      >
        <option value=""> -- Selecteer een trainer -- </option>
        {trainers.map((trainer) => (
          <option key={trainer} value={trainer}>
            {trainer}
          </option>
        ))}
      </select>
      <label
        htmlFor="datum"
        className="col-span-6 text-gray-600 bg-white border-t-2 border-l-2 border-r-2 border-gray-600 w-min py-1 px-2"
      >
        DATUM
      </label>
      <input
        type="date"
        id="datum"
        name="datum"
        {...register("datum", { required: "Datum is verplicht" })}
        className="col-span-6 border-2 bg-white border-gray-600 mb-2 h-12 pl-2"
      ></input>
      <ErrorMessage
        errors={errors}
        name="datum"
        render={({ message }) => (
          <p className="col-span-6 text-red-500 mb-2">{message}</p>
        )}
      />
      <label
        htmlFor="startuur"
        className="col-span-3 text-gray-600 bg-white border-t-2 border-l-2 border-r-2 border-gray-600 w-min py-1 px-2"
      >
        STARTUUR
      </label>
      <label
        htmlFor="einduur"
        className="col-span-3 text-gray-600 bg-white border-t-2 border-l-2 border-r-2 border-gray-600 w-min py-1 px-2"
      >
        EINDUUR
      </label>
      <input
        type="time"
        id="startuur"
        name="startuur"
        {...register("startuur")}
        className="col-span-3 border-2 bg-white border-gray-600 mb-2 h-12 pl-2 mr-2"
      ></input>
      <input
        type="time"
        id="einduur"
        name="einduur"
        {...register("einduur")}
        className="col-span-3 border-2 bg-white border-gray-600 mb-2 h-12 pl-2"
      ></input>
      <label
        htmlFor="notities"
        className="col-span-6 text-gray-600 bg-white border-t-2 border-l-2 border-r-2 border-gray-600 w-min py-1 px-2"
      >
        NOTITIES
      </label>
      <input
        type="text"
        id="notities"
        placeholder="Bijv: naam van de wedstrijd, extra info,..."
        // disabled={imageUploaden}
        {...register("notities")}
        className="col-span-6 border-2 border-gray-600 mb-2 h-12 pl-2"
      />
    </>
  );
}
