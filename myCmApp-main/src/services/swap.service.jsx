import { apiAuth, api } from "../utils/axiosConfig";

export const uploadImg = (formData) =>
  apiAuth.post("/upload-gensk/200?type=src_nam", formData);

export const swapAlbumImages = (albumId, imgSrc) =>
  api.get(
    `/getdata/swap/listimage?device_them_su_kien=gdgdgf&ip_them_su_kien=dfbdfbdf&id_user=144&list_folder=album_${albumId}`,
    { headers: { link1: imgSrc } }
  );
