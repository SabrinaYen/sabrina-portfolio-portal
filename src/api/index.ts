import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000", // your FastAPI server
});

// attach the token automatically on every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;