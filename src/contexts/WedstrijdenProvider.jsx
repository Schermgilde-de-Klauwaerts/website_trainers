import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
  useMemo,
} from "react";
import * as wedstrijdenApi from "../api/wedstrijden";

export const WedstrijdenContext = createContext();
export const useWedstrijden = () => useContext(WedstrijdenContext);

export const WedstrijdenProvider = ({ children }) => {
  const [initialLoad, setInitialLoad] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [wedstrijden, setWedstrijden] = useState([]);

  const refreshWedstrijden = useCallback(async () => {
    try {
      setError();
      setLoading(true);
      const data = await wedstrijdenApi.getAll();
      setWedstrijden(data.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!initialLoad) {
      refreshWedstrijden();
      setInitialLoad(true);
    }
  }, [initialLoad, refreshWedstrijden]);

  const createWedstrijd = useCallback(
    async ({ datum, dag, naam, locatie, trainer, functie, notities }) => {
      setError();
      setLoading(true);
      try {
        await wedstrijdenApi.save({
          datum,
          dag,
          naam,
          locatie,
          trainer,
          functie,
          notities,
        });
        await refreshWedstrijden();
      } catch (error) {
        setError(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [refreshWedstrijden]
  );

  const updateWedstrijd = useCallback(
    async ({ id, datum, dag, naam, locatie, trainer, functie, notities }) => {
      setError();
      setLoading(true);
      try {
        await wedstrijdenApi.save({
          id,
          datum,
          dag,
          naam,
          locatie,
          trainer,
          functie,
          notities,
        });
        await refreshWedstrijden();
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [refreshWedstrijden]
  );

  const deleteWedstrijd = useCallback(
    async (id) => {
      try {
        setError();
        setLoading(true);
        await wedstrijdenApi.deleteById(id);
        refreshWedstrijden();
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [refreshWedstrijden]
  );

  const getWedstrijdById = useCallback(
    async (id) => {
      try {
        setError();
        setLoading(true);
        const wedstrijd = await wedstrijdenApi.getById(id);
        await refreshWedstrijden();
        return wedstrijd;
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [refreshWedstrijden]
  );

  const value = useMemo(
    () => ({
      wedstrijden,
      error,
      loading,
      createWedstrijd,
      deleteWedstrijd,
      updateWedstrijd,
      getWedstrijdById,
    }),
    [
      wedstrijden,
      error,
      loading,
      createWedstrijd,
      deleteWedstrijd,
      updateWedstrijd,
      getWedstrijdById,
    ]
  );

  return (
    <WedstrijdenContext.Provider value={value}>
      {children}
    </WedstrijdenContext.Provider>
  );
};
