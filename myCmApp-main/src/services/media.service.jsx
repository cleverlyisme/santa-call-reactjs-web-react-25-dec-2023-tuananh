import { apiAuth, api } from "../utils/axiosConfig";

export const getAllAlbums = () => apiAuth.get("/get/list_image/all/1");
