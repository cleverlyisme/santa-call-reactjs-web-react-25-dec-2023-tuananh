import axios from "axios";

const apiAuth = axios.create({
  baseURL: "https://metatechvn.store",
});

const api = axios.create({
  baseURL: "https://api.mangasocial.online",
});

[apiAuth, api].map((item) =>
  item.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  )
);

export { apiAuth, api };
