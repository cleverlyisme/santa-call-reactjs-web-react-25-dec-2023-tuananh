import { apiAuth } from "../utils/axiosConfig";

export const signIn = (formData) => apiAuth.post("/login", formData);

export const signUp = (formData) => apiAuth.post("/register/user", formData);
