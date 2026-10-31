import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8000", // your FastAPI server
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
    DeleteCompany: "/delete-company",
    SaveParam: "/save-param",
    ActivityLogs: "/get-activity-logs",
    VisitStats: "/get-visit-stats",
    ChangePassword: "/change-password",
    GetPurposeList: "/get-purpose-list",
    AddPurpose: "/add-purpose",
    DeletePurpose: "/delete-purpose",
    // list / add / update / delete for each content type
    Project: { list: "/get-project-list", add: "/add-project", update: "/update-project", remove: "/delete-project" },
    Experience: { list: "/get-experience-list", add: "/add-experience", update: "/update-experience", remove: "/delete-experience" },
    Skill: { list: "/get-skill-list", add: "/add-skill", update: "/update-skill", remove: "/delete-skill" },
    // links are keyed by label: add-link also updates an existing label
    LinkList: "/get-link-list",
    AddLink: "/add-link",
    DeleteLink: "/delete-link",
}

export {
    api,
    API_URL
};