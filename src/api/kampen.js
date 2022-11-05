import { axios } from ".";

export const getAll = async () => {
  const { data } = await axios.get("kampen");
  return data.data;
};

export const getById = async (id) => {
  const { data } = await axios.get(`kampen/${id}`);
  return data.data;
};

export const getByDate = async (date) => {
  const { data } = await axios.get(`kampen/date/${date}`);
  return data.data;
};

export const deleteById = async (id) => {
  const { data } = await axios.delete(`kampen/${id}`);
  return data.data;
};

export const save = async (kampen) => {
  const { id, ...values } = kampen;
  await axios({
    method: id ? "PUT" : "POST",
    url: `kampen/${id ?? ""}`,
    data: values,
  });
};
