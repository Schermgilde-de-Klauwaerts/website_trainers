import axios from "axios";

const baseUrl = `http://localhost:9000/api/events`;

export const getAll = async () => {
  const { data } = await axios.get(baseUrl);
  return data.data;
};
