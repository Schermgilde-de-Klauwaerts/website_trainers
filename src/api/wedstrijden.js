import { axios } from ".";

export const getAll = async () => {
  const { data } = await axios.get("wedstrijden");
  return data.data;
};

export const getById = async (id) => {
  const { data } = await axios.get(`wedstrijden/${id}`);
  return data.data;
};

export const getByDate = async (date) => {
  const { data } = await axios.get(`wedstrijden/date/${date}`);
  return data.data;
};

export const deleteById = async (id) => {
  const { data } = await axios.delete(`wedstrijden/${id}`);
  return data.data;
};

export const save = async (wedstrijd) => {
  const { id, ...values } = wedstrijd;
  await axios({
    method: id ? "PUT" : "POST",
    url: `wedstrijden/${id ?? ""}`,
    data: values,
  });
};
