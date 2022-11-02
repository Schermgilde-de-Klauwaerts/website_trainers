import axios from "axios";

const baseUrl = `http://localhost:9000/api/trainingen`;

export const getAll = async () => {
  const { data } = await axios.get(baseUrl);
  return data.data;
};

export const getById = async (id) => {
  const { data } = await axios.get(`${baseUrl}/${id}`);
  return data.data;
};

export const deleteById = async (id) => {
  const { data } = await axios.delete(`${baseUrl}/${id}`);
  return data.data;
};

export const save = async (training) => {
  const { id, ...values } = training;
  await axios({
    method: id ? "PUT" : "POST",
    url: `${baseUrl}/${id ?? ""}`,
    data: values,
  });
};
