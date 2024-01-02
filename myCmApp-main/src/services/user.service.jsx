import { apiAuth } from "../utils/axiosConfig";

export const changeAvatar = (id, formData) =>
  apiAuth.post(`/changeavatar/${id}`, formData);
