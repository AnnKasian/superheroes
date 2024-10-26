import axios from "axios";

import { handleError } from "./libs/middlewares/middlewares.js";

const createAppClient = () => {
  const baseUrl = import.meta.env.VITE_APP_SERVER_URL;

  const client = axios.create({
    baseURL: baseUrl,
  });

  client.interceptors.response.use((response) => response, handleError());

  return client;
};

export { createAppClient };
