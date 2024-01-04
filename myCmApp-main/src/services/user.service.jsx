import { apiMeta, apiImg } from "../utils/axiosConfig";

export const changeAvatar = (id, formData) =>
  apiMeta.post(`/changeavatar/${id}`, formData);

export const uploadImg = (data) => apiImg.post("/1/upload", data);
