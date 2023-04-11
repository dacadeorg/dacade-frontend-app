import axios, { AxiosInstance } from "axios";

/**
 * Creates axios instance
 * @date 4/6/2023 - 12:45:55 PM
 *
 * @returns {*}
 */
const createAxiosInstance: () => AxiosInstance = () => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return instance;
};

const axiosInstance = createAxiosInstance();

export default axiosInstance;
