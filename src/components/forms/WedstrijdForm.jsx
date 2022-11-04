import { ErrorMessage } from "@hookform/error-message";
import React from "react";

export default function WedstrijdForm({ register, trainers, errors }) {
  return (
    <>
      <label
        htmlFor="naam"
        className="col-span-6 text-gray-600 bg-white border-t-2 border-l-2 border-r-2 border-gray-600 w-40 py-1 px-2"
      >
        NAAM WEDSTRIJD
      </label>
      <input
        type="text"
        id="naam"
        placeholder="Mini Klauw, Circuit Jeunes Lames,..."
        {...register("naam", {
          required: "Naam van de wedstrijd is verplicht",
        })}
        className="col-span-6 border-2 border-gray-600 mb-2 h-12 pl-2"
      />
      <ErrorMessage
        errors={errors}
        name="naam"
        render={({ message }) => (
          <p className="col-span-6 text-red-500 mb-2">{message}</p>
        )}
      />
      <label
        htmlFor="locatie"
        className="col-span-6 text-gray-600 bg-white border-t-2 border-l-2 border-r-2 border-gray-600 w-min py-1 px-2"
      >
        LOCATIE
      </label>
      <input
        type="text"
        id="locatie"
        placeholder="Sint-Niklaas, Gent,..."
        {...register("locatie", {
          required: "Locatie van de wedstrijd is verplicht",
        })}
        className="col-span-6 border-2 border-gray-600 mb-2 h-12 pl-2"
      />
      <ErrorMessage
        errors={errors}
        name="locatie"
        render={({ message }) => (
          <p className="col-span-6 text-red-500 mb-2">{message}</p>
        )}
      />
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

      <div className="col-span-6 text-gray-600 bg-white border-2 border-gray-600 w-min py-1 px-2">
        FUNCTIE
      </div>
      <div className="flex flex-col col-span-6 my-2 pl-2">
        <div className="flex flex-row mb-2">
          <input
            type="radio"
            id="functie1"
            name="functie"
            value="coach"
            {...register("functie")}
          />
          <label className="ml-2" htmlFor="functie1">
            Coach
          </label>
        </div>
        <div className="flex flex-row mb-2">
          <input
            type="radio"
            id="functie2"
            name="functie"
            value="scheidsrechter"
            {...register("functie")}
          />
          <label className="ml-2" htmlFor="functie2">
            Scheidsrechter
          </label>
        </div>
      </div>
      <label
        htmlFor="notities"
        className="col-span-6 text-gray-600 bg-white border-t-2 border-l-2 border-r-2 border-gray-600 w-min py-1 px-2"
      >
        NOTITIES
      </label>
      <input
        type="text"
        id="notities"
        placeholder="Toevoeging, extra info,..."
        // disabled={imageUploaden}
        {...register("notities")}
        className="col-span-6 border-2 border-gray-600 mb-2 h-12 pl-2"
      />
    </>
  );
}
