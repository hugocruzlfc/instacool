import Axios from "axios";

const TOKEN_KEY = "CLONTAGRAM_TOKEN";

export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const deleteToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const initAxiosInterceptors = () => {
  Axios.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `bearer ${token}`;
    }
    return config;
  });

  Axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        deleteToken();
        window.location = "/login";
      } else {
        return Promise.reject(error);
      }
    }
  );
};
