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

export default function Modal({ open, children, onClose }) {
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
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-4">
          {message && (
            <span
              data-cy="message_addItem"
              className="col-span-4 text-gray-600 mb-2"
            >
              {message}
            </span>
          )}
          <label
            htmlFor="name"
            className="col-span-4 text-gray-600 bg-white border-t-2 border-l-2 border-r-2 border-gray-600 w-min py-1 px-2"
          >
            NAME
          </label>
          <input
            type="text"
            id="name"
            placeholder="Geef een naam"
            // disabled={imageUploaden}
            {...register("name", { required: "Naam is verplicht" })}
            className="col-span-4 border-2 bg-white border-gray-600 mb-2 h-12 pl-2"
            data-cy="input_name_addItem"
          />
          <ErrorMessage
            errors={errors}
            name="name"
            render={({ message }) => (
              <p className="col-span-4 text-red-500 mb-2">{message}</p>
            )}
          />
          <label
            htmlFor="price"
            className="col-span-4 text-gray-600 bg-white border-t-2 border-l-2 border-r-2 border-gray-600 w-min py-1 px-2"
          >
            PRICE
          </label>
          <input
            type="number"
            id="price"
            placeholder="Geef een prijs"
            step="0.01"
            min="0.01"
            // disabled={imageUploaden}
            {...register("price", {
              required: "Prijs is verplicht",
              min: 0.01,
            })}
            className="col-span-4 border-2 border-gray-600 mb-2 h-12 pl-2"
            data-cy="input_price_addItem"
          />
          <ErrorMessage
            errors={errors}
            name="price"
            render={({ message }) => (
              <p className="col-span-4 text-red-500 mb-2">{message}</p>
            )}
          />
          <button
            type="submit"
            // disabled={imageUploaden}
            className="disabled:opacity-50 col-span-3 border-2 border-green-500 bg-green-500 text-white py-1 px-3 mb-4 h-12"
            data-cy="submit_addItem"
          >
            ADD
          </button>
          <button
            type="reset"
            // disabled={imageUploaden}
            className="disabled:opacity-50 col-span-1 border-2 border-red-500 bg-red-500 text-white py-1 px-3 mb-4 ml-2 h-12"
            onClick={() => reset()}
            data-cy="reset_addItem"
          >
            RESET
          </button>
        </form>
        <button onClick={onClose} className="border-2 border-black">
          Close Modal
        </button>
      </div>
    </>,
    document.getElementById("portal")
  );
}
