import axios from "axios";

const baseUrl = `http://localhost:9000/api/events`;

export const getAll = async () => {
  const { data } = await axios.get(baseUrl);
  return data.data;
};

export const deleteById = async (id) => {
  const { data } = await axios.delete(`${baseUrl}/${id}`);
  return data.data;
};

export const save = async (transaction) => {
  await axios.post(baseUrl, transaction);
};
