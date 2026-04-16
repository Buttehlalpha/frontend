import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// AUTH
export const registerUser = (data) => api.post("/api/auth/register", data);
export const loginUser = (data) => api.post("/api/auth/login", data);

// STUDY
export const getStudy = (userId) => api.get(`/api/study/${userId}`);
export const addStudy = (data) => api.post("/api/study/add", data);

// ASSIGNMENT
export const addAssignment = (data) => api.post("/api/assignment/add", data);

// GROUPS
export const createGroup = (data) => api.post("/api/groups/create", data);
export const joinGroup = (data) => api.post("/api/groups/join", data);

// AI
export const getAISuggestion = (data) => api.post("/api/ai/suggest", data);

export default api;