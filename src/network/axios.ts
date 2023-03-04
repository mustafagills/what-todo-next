/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-console */
import axios from "axios";
import { API_TIMEOUT, API_URL, CF_ACCESS_KEY } from "../utils/constants";

const apiClient = axios.create({
  timeout: API_TIMEOUT,
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
    cfACcessKey: CF_ACCESS_KEY,
  },
});

apiClient.interceptors.response.use((response) => {
  return response;
});

export const getRequest = async (route: string, params?: unknown) => {
  const source = axios.CancelToken.source();

  setTimeout(() => {
    source.cancel();
  }, API_TIMEOUT);

  const response = await apiClient.get(`${API_URL}${route}`, {
    cancelToken: source.token,
    params,
  });
  return response;
};

export const postRequest = async (route: string, body: unknown) => {
  const source = axios.CancelToken.source();

  setTimeout(() => {
    source.cancel();
  }, API_TIMEOUT);

  const response = await apiClient.post(API_URL + route, body, {
    cancelToken: source.token,
  });

  return response;
};

export const putRequest = async (route: string, body: unknown) => {
  const source = axios.CancelToken.source();

  setTimeout(() => {
    source.cancel();
  }, API_TIMEOUT);

  const response = await apiClient.put(API_URL + route, body, {
    cancelToken: source.token,
  });
  return response;
};

export const patchRequest = async (route: string, body: unknown) => {
  const source = axios.CancelToken.source();

  setTimeout(() => {
    source.cancel();
  }, API_TIMEOUT);

  const response = await apiClient.patch(API_URL + route, body, {
    cancelToken: source.token,
  });
  return response;
};

export const deleteRequest = async (route: string) => {
  const source = axios.CancelToken.source();

  setTimeout(() => {
    source.cancel();
  }, API_TIMEOUT);

  const response = await apiClient.delete(API_URL + route);

  return response;
};

export default apiClient;
