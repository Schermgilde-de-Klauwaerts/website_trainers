// import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
// import { useLogin, useSession } from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect } from "react";

export default function Login() {
  // const navigate = useNavigate();
  // const { loading, error } = useSession();
  // const isAuthed = false;
  // const login = useLogin();
  // const login = true;
  // const methods = useForm();
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = methods;

  // useEffect(() => {
  //   if (isAuthed) {
  //     navigate("/kalender", { replace: true });
  //   }
  // }, [isAuthed, navigate]);

  // const onSubmit = useCallback(
  //   async (data) => {
  //     const succes = await login(String(data.email), String(data.password));
  //     if (succes) {
  //       navigate("/shop", { replace: true });
  //     }
  //   },
  //   [login, navigate]
  // );

  return (
    <div className="mx-auto bg-green-300 h-screen w-screen">
      <h1 className="text-center font-bold text-gray-600 text-4xl pt-6 mb-4">
        Login
      </h1>
      <form
        className="w-11/12 md:w-8/12 lg:w-1/4 mx-auto grid grid-cols-1 border-t-2 border-green-700 pt-8"
        // onSubmit={handleSubmit(onSubmit)}
      >
        {/* {error ? (
          <p className="text-red-500 mb-2">{JSON.stringify(error)}</p>
        ) : null} */}
        <label
          htmlFor="gebruikersnaam"
          type="text"
          className="text-gray-600 bg-white border-t-2 border-l-2 border-r-2 border-gray-600 w-min py-1 px-2"
        >
          GEBRUIKERSNAAM
        </label>
        <input
          type="text"
          placeholder="Gebruikersnaam"
          // {...register("gebruikersnaam", { required: "gebruikersnaam is verplicht" })}
          className="border-2 border-gray-600 mb-2 h-12 pl-2"
          data-cy="login_gebruikersnaam_input"
        />
        {/* <ErrorMessage
          // errors={errors}
          name="gebruikersnaam"
          render={({ message }) => (
            <p className="text-red-500 mb-2">{message}</p>
          )}
        /> */}
        <label
          htmlFor="password"
          className="text-gray-600 bg-white border-t-2 border-l-2 border-r-2 border-gray-600 w-min py-1 px-2"
        >
          WACHTWOORD
        </label>
        <input
          type="password"
          placeholder="Wachtwoord"
          // {...register("password", { required: "Wachtwoord is verplicht" })}
          className="border-2 border-gray-600 mb-2 h-12 pl-2"
          data-cy="login_password_input"
        />

        {/* <ErrorMessage
          // errors={errors}
          name="password"
          render={({ message }) => (
            <p className="text-red-500 mb-2">{message}</p>
          )}
        /> */}

        <button
          type="submit"
          // disabled={loading}
          className="disabled:opacity-50 border-2 border-green-700 bg-green-700 text-white h-12 mt-2 px-2"
          data-cy="login_submit_btn"
        >
          LOGIN
        </button>
      </form>
    </div>
  );
}
