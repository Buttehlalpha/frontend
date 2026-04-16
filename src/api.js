import axios from "axios";

// Base connection to your backend
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ========================
// AUTH APIs
// ========================

// Register user
export const registerUser = (data) => api.post("/api/auth/register", data);

// Login user
export const loginUser = (data) => api.post("/api/auth/login", data);

// Get user profile
export const getProfile = () => api.get("/api/auth/profile");


// ========================
// TASK / MODULE APIs
// ========================

// Get all modules/tasks
export const getModules = () => api.get("/api/modules");

// Create module/task
export const createModule = (data) => api.post("/api/modules", data);

// Update module/task
export const updateModule = (id, data) =>
  api.put(`/api/modules/${id}`, data);

// Delete module/task
export const deleteModule = (id) =>
  api.delete(`/api/modules/${id}`);


// ========================
// AI APIs (if you use OpenAI)
// ========================

export const getAISuggestion = (data) =>
  api.post("/api/ai/suggest", data);

export default api;