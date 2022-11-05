import { axios } from ".";

export const getAll = async () => {
  const { data } = await axios.get("trainingen");
  return data;
};

export const getById = async (id) => {
  const { data } = await axios.get(`trainingen/${id}`);
  return data.data;
};

export const getByDate = async (date) => {
  const { data } = await axios.get(`trainingen/date/${date}`);
  return data.data;
};

export const deleteById = async (id) => {
  const { data } = await axios.delete(`trainingen/${id}`);
  return data.data;
};

export const save = async (training) => {
  const { id, ...values } = training;
  await axios({
    method: id ? "PUT" : "POST",
    url: `trainingen/${id ?? ""}`,
    data: values,
  });
};
