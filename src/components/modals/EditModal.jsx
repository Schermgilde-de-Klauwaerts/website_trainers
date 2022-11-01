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

export default function EditModal({ onClose, trainers, updateEvent, event }) {
  const methods = useForm();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;
  // const { createItem, loading } = useItems();

  const [message, setMessage] = useState();
  const [type, setType] = useState(event.soort);
  const [trainer, setTrainer] = useState(event.trainer);
  const [startuur, setStartuur] = useState(event.startuur);
  const [einduur, setEinduur] = useState(event.einduur);
  const [notities, setNotities] = useState(event.notities);

  // const [imageUploaden, setImageUploaden] = useState(loading);

  // const onSubmit = useCallback(
  //   async (data) => {
  //     try {
  //       const { name, price } = data;
  //       // await createItem({ name, price, korting: 0, imageUrl });
  //       setMessage("Item succesvol aangemaakt");
  //     } catch (error) {
  //       setMessage("Er ging iets fout, probeer opnieuw");
  //     } finally {
  //       // setImageUploaden(false);
  //     }
  //   }
  //   [createItem]
  // );

  const onSubmit = useCallback(
    async (data) => {
      const { trainer, type, startuur, einduur, notities } = data;
      updateEvent({
        id: event.id,
        soort: type,
        trainer: trainer,
        datum: event.datum,
        startuur: startuur,
        einduur: einduur,
        notities: notities,
      });
      onClose();
    },
    [updateEvent, onClose, event]
  );

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-6">
          {message && (
            <span className="col-span-6 text-gray-600 mb-2">{message}</span>
          )}
          <label
            htmlFor="type"
            className="col-span-6 text-gray-600 bg-white border-t-2 border-l-2 border-r-2 border-gray-600 w-min py-1 px-2"
          >
            TYPE
          </label>
          <select
            name="type"
            id="type"
            defaultValue={type}
            onChange={(e) => setType(e.target.value)}
            className="col-span-6 border-2 bg-white border-gray-600 mb-2 h-12 pl-2"
            {...register("type", { required: "Type is verplicht" })}
          >
            <option value="Training">Training</option>
            <option value="Wedstrijd">Wedstrijd</option>
          </select>
          <ErrorMessage
            errors={errors}
            name="type"
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
            defaultValue={trainer}
            onChange={(e) => setTrainer(e.target.value)}
            {...register("trainer")}
            className="col-span-6 border-2 bg-white border-gray-600 mb-2 h-12 pl-2"
          >
            {trainers.map((trainer) => (
              <option key={trainer} value={trainer}>
                {trainer}
              </option>
            ))}
          </select>
          <label
            htmlFor="startuur"
            className="col-span-3 text-gray-600 bg-white border-t-2 border-l-2 border-r-2 border-gray-600 w-min py-1 px-2"
            hidden={event.soort === "Wedstrijd" ? "hidden" : ""}
          >
            STARTUUR
          </label>
          <label
            htmlFor="einduur"
            className="col-span-3 text-gray-600 bg-white border-t-2 border-l-2 border-r-2 border-gray-600 w-min py-1 px-2"
            hidden={event.soort === "Wedstrijd" ? "hidden" : ""}
          >
            EINDUUR
          </label>
          <input
            type="time"
            id="startuur"
            name="startuur"
            defaultValue={startuur}
            onChange={(e) => setStartuur(e.target.value)}
            {...register("startuur")}
            className="col-span-3 border-2 bg-white border-gray-600 mb-2 h-12 pl-2 mr-2"
            hidden={event.soort === "Wedstrijd" ? "hidden" : ""}
          ></input>
          <input
            type="time"
            id="einduur"
            name="einduur"
            defaultValue={einduur}
            onChange={(e) => setEinduur(e.target.value)}
            {...register("einduur")}
            className="col-span-3 border-2 bg-white border-gray-600 mb-2 h-12 pl-2"
            hidden={event.soort === "Wedstrijd" ? "hidden" : ""}
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
            defaultValue={notities}
            onChange={(e) => setNotities(e.target.value)}
            // disabled={imageUploaden}
            {...register("notities")}
            className="col-span-6 border-2 border-gray-600 mb-2 h-12 pl-2"
          />
          <button
            type="submit"
            // disabled={imageUploaden}
            className="disabled:opacity-50 col-span-2 border-2 border-green-500 bg-green-500 text-white py-1 px-3 mb-4 h-12"
          >
            BEWERK
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
