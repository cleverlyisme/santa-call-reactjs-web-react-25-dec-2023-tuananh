import { apiMeta } from "../utils/axiosConfig";

export const signIn = (formData) => apiMeta.post("/login", formData);

export const signUp = (formData) => apiMeta.post("/register/user", formData);

export const resetPassword = (formData) => apiMeta.post("/reset", formData);
