import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
  useMemo,
} from "react";
import * as trainingenApi from "../api/trainingen";

export const TrainingenContext = createContext();
export const useTrainingen = () => useContext(TrainingenContext);

export const TrainingenProvider = ({ children }) => {
  const [initialLoad, setInitialLoad] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [trainingen, setTrainingen] = useState([]);

  const refreshTrainingen = useCallback(async () => {
    try {
      setError();
      setLoading(true);
      const data = await trainingenApi.getAll();
      setTrainingen(data.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!initialLoad) {
      refreshTrainingen();
      setInitialLoad(true);
    }
  }, [initialLoad, refreshTrainingen]);

  const createTraining = useCallback(
    async ({ datum, dag, trainer, startuur, einduur, notities }) => {
      setError();
      setLoading(true);
      try {
        await trainingenApi.save({
          datum,
          dag,
          trainer,
          startuur,
          einduur,
          notities,
        });
        await refreshTrainingen();
      } catch (error) {
        setError(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [refreshTrainingen]
  );

  const updateItem = useCallback(
    async ({ id, datum, dag, trainer, startuur, einduur, notities }) => {
      setError();
      setLoading(true);
      try {
        await trainingenApi.save({
          id,
          datum,
          dag,
          trainer,
          startuur,
          einduur,
          notities,
        });
        await refreshTrainingen();
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [refreshTrainingen]
  );

  const deleteTraining = useCallback(
    async (id) => {
      try {
        setError();
        setLoading(true);
        await trainingenApi.deleteById(id);
        refreshTrainingen();
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [refreshTrainingen]
  );

  const getTrainingById = useCallback(
    async (id) => {
      try {
        setError();
        setLoading(true);
        const Training = await trainingenApi.getById(id);
        await refreshTrainingen();
        return Training;
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [refreshTrainingen]
  );

  const value = useMemo(
    () => ({
      trainingen,
      error,
      loading,
      createTraining,
      deleteTraining,
      updateItem,
      getTrainingById,
    }),
    [
      trainingen,
      error,
      loading,
      createTraining,
      deleteTraining,
      updateItem,
      getTrainingById,
    ]
  );

  return (
    <TrainingenContext.Provider value={value}>
      {children}
    </TrainingenContext.Provider>
  );
};