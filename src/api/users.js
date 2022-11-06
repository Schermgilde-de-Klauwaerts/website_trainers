import { axios } from ".";

export const login = async (name, password) => {
  const { data } = await axios.post(`users/login`, {
    name,
    password,
  });
  return data;
};

export const getById = async (id) => {
  const { data } = await axios.get(`users/${id}`);
  return data;
};
