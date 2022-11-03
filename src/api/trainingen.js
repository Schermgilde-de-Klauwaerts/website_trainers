import axios from "axios";

const baseUrl = `${process.env.REACT_APP_API_URL}/trainingen`;

export const getAll = async () => {
  const { data } = await axios.get(baseUrl);
  return data;
};

export const getById = async (id) => {
  const { data } = await axios.get(`${baseUrl}/${id}`);
  return data.data;
};

export const getByDate = async (date) => {
  const { data } = await axios.get(`${baseUrl}/date/${date}`);
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
