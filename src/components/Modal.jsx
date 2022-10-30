import React from "react";
import ReactDom from "react-dom";
import { useCallback, useState } from "react";
// import { useItems } from "../contexts/ItemsProvider";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#FFF",
  padding: "50px",
  zIndex: 1000,
};

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, .7)",
  zIndex: 1000,
};

export default function Modal({ open, children, onClose, trainers }) {
  const methods = useForm();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;
  // const { createItem, loading } = useItems();

  const [message, setMessage] = useState();
  // const [imageUploaden, setImageUploaden] = useState(loading);

  const onSubmit = useCallback(
    async (data) => {
      try {
        const { name, price } = data;
        // await createItem({ name, price, korting: 0, imageUrl });
        setMessage("Item succesvol aangemaakt");
      } catch (error) {
        setMessage("Er ging iets fout, probeer opnieuw");
      } finally {
        // setImageUploaden(false);
      }
    }
    // [createItem]
  );

  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-6">
          {message && (
            <span className="col-span-6 text-gray-600 mb-2">{message}</span>
          )}
          <label
            htmlFor="typeEvent"
            className="col-span-6 text-gray-600 bg-white border-t-2 border-l-2 border-r-2 border-gray-600 w-24 py-1 px-2"
          >
            Type Event
          </label>
          <select
            name="typeEvent"
            id="typeEvent"
            className="col-span-6 border-2 bg-white border-gray-600 mb-2 h-12 pl-2"
          >
            <option value=""> -- Selecteer een type -- </option>
            <option value="Training">Training</option>
            <option value="Wedstrijd">Wedstrijd</option>
          </select>
          <label
            htmlFor="trainer"
            className="col-span-6 text-gray-600 bg-white border-t-2 border-l-2 border-r-2 border-gray-600 w-min py-1 px-2"
          >
            Trainer
          </label>
          <select
            name="trainer"
            id="trainer"
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
            htmlFor="date"
            className="col-span-6 text-gray-600 bg-white border-t-2 border-l-2 border-r-2 border-gray-600 w-min py-1 px-2"
          >
            DATUM
          </label>
          <input
            type="datetime-local"
            id="date"
            name="date"
            value="2018-06-12T19:30"
            {...register("date", { required: "Datum is verplicht" })}
            className="col-span-6 border-2 bg-white border-gray-600 mb-2 h-12 pl-2"
          ></input>
          <ErrorMessage
            errors={errors}
            name="date"
            render={({ message }) => (
              <p className="col-span-6 text-red-500 mb-2">{message}</p>
            )}
          />
          <label
            htmlFor="notities"
            className="col-span-6 text-gray-600 bg-white border-t-2 border-l-2 border-r-2 border-gray-600 w-min py-1 px-2"
          >
            NOTITIES
          </label>
          <input
            type="text"
            id="notities"
            placeholder="Extra info, naam van de wedstrijd,..."
            // disabled={imageUploaden}
            {...register("notities")}
            className="col-span-6 border-2 border-gray-600 mb-2 h-12 pl-2"
          />
          <ErrorMessage
            errors={errors}
            name="notities"
            render={({ message }) => (
              <p className="col-span-6 text-red-500 mb-2">{message}</p>
            )}
          />
          <button
            type="submit"
            // disabled={imageUploaden}
            className="disabled:opacity-50 col-span-2 border-2 border-green-500 bg-green-500 text-white py-1 px-3 mb-4 h-12"
          >
            ADD
          </button>
          <button
            type="reset"
            // disabled={imageUploaden}
            className="disabled:opacity-50 col-span-2 border-2 border-orange-500 bg-orange-500 text-white py-1 px-3 mb-4 ml-2 h-12"
            onClick={() => reset()}
          >
            RESET
          </button>
          <button
            onClick={onClose}
            className="disabled:opacity-50 col-span-2 border-2 border-red-500 bg-red-500 text-white py-1 px-3 mb-4 ml-2 h-12"
          >
            ANNULEER
          </button>
        </form>
      </div>
    </>,
    document.getElementById("portal")
  );
}
