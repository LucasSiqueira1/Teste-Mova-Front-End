import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://restcountries.com/v2/all",
});

export const api = {
  get(endpoint) {
    return axiosInstance.get(endpoint);
  },
};
