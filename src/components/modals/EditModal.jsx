import React from "react";
import ReactDom from "react-dom";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import TrainingForm from "../forms/TrainingForm";
import WedstrijdForm from "../forms/WedstrijdForm";

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

const WEEKDAY = [
  "Zondag",
  "Maandag",
  "Dinsdag",
  "Woensdag",
  "Donderdag",
  "Vrijdag",
  "Zaterdag",
];

export default function EditModal({
  open,
  onClose,
  trainers,
  event,
  updateEvent,
}) {
  const methods = useForm();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const [message, setMessage] = useState();

  const onSubmit = useCallback(
    async (data) => {
      console.log(data);
      const id = event.id;
      const { datum } = data;
      const datumObject = new Date(
        datum.split("-")[0],
        datum.split("-")[1] - 1,
        datum.split("-")[2]
      );
      const dag = WEEKDAY[datumObject.getDay("nl-BE")];
      updateEvent(event.type.toLowerCase(), { id, dag, ...data });
      onClose();
    },
    [updateEvent, onClose, event.id, event.type]
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
          {event.type === "training" ? (
            <TrainingForm
              trainers={trainers}
              errors={errors}
              register={register}
              event={event}
            />
          ) : (
            <WedstrijdForm
              trainers={trainers}
              errors={errors}
              register={register}
              event={event}
            />
          )}
          <button
            type="submit"
            // disabled={imageUploaden}
            className="disabled:opacity-50 col-span-2 border-2 border-green-500 bg-green-500 text-white py-1 px-3 mb-4 h-12"
          >
            AANPASSEN
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
