import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000", // your FastAPI server
});

// attach the token automatically on every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const API_URL = {
    Login:"/login",
    Checkpoint: "/me",
    GetParam:"/get-param",
    GetCompanyList:"/get-company-list",
    AddCompany:"/add-company",
    DeleteCompany: "/delete-company"
}

export {
    api,
    API_URL
};