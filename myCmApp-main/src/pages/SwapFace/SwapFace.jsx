import { useEffect, useId, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import NProgress from "nprogress";
import JSZip from "jszip";
import JSZipUtils from "jszip-utils";
import { saveAs } from "file-saver";
import UrlImageDownloader from "react-url-image-downloader";
import axios from "axios";

import MenuBar from "../../components/MenuBar/MenuBar";
import UploadImageIcon from "../../assets/UploadImageIcon.svg";
import TransferIcon from "../../assets/TransferIcon.svg";
import DirectLeftIcon from "../../assets/DirectLeftIcon.svg";

const MAX_FILE_SIZE = 5242880;

function SwapFace() {
  const [file, setFile] = useState(null);
  const [originalImg, setOriginalImg] = useState(null);
  const [uploadImgSrc, setUploadImgSrc] = useState(null);
  const [transferedImgSrc, setTransferedImgSrc] = useState(null);
  const [listSrcTransfered, setListSrcTransfered] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const labelRef = useRef();
  const inputId = useId();
  const zip = new JSZip();

  const { id } = useParams();
  const searchParams = new URLSearchParams(location.search);
  const album_id = searchParams.get("album_id");

  const { token } = useSelector((state) => state.user.account);

  const handleInputChange = (e) => {
    try {
      const fileUploaded = e.target.files[0];

      if (fileUploaded.size > MAX_FILE_SIZE)
        throw new Error("Max file size is 5MB");

      setFile(fileUploaded);
      setUploadImgSrc(URL.createObjectURL(fileUploaded));
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  const handleUploadAndSwap = async () => {
    try {
      if (!file) throw new Error("Not found file upload");

      const formData = new FormData();
      formData.append("src_img", file);

      NProgress.start();
      const uploadRespone = await axios.post(
        "https://metatechvn.store/upload-gensk/200?type=src_nam",
        formData
      );

      if (!uploadRespone) throw new Error("Upload image fail");

      const imgUploadSrc = uploadRespone.data;

      const swapRespone = await axios.get(
        `https://api.mangasocial.online/getdata/swap/listimage?device_them_su_kien=gdgdgf&ip_them_su_kien=dfbdfbdf&id_user=144&list_folder=album_${album_id}`,
        { headers: { link1: imgUploadSrc, Authorization: `Bearer ${token}` } }
      );

      if (!swapRespone) throw new Error("Swap face fail");

      const data = swapRespone.data;

      console.log({ data });

      setOriginalImg(
        data.sukien_2_image.link_src_goc.replace(
          "/var/www/build_futurelove/",
          "https://futurelove.online/"
        )
      );
      setTransferedImgSrc(
        data.sukien_2_image.link_da_swap.replace("onlineimage", "online/image")
      );
      setListSrcTransfered(data["link anh da swap"]);
      // setBaseImageSrc(data.sukien_2_image.link_src_goc);
      // setTransferedImgSrc(data.sukien_2_image.link_da_swap);
    } catch (error) {
      toast.error("Fail: " + error.message);
      console.log({ err: error.message });
    }
    NProgress.done();
  };

  const handleDownloadImage = async () => {};

  const handleDownloadAllImages = async () => {
    try {
      if (listSrcTransfered.length < 1)
        throw new Error("No swapped image found");

      let count = 0;
      let zipFilename = "images.zip";
      for (const img of listSrcTransfered) {
        const filename = img.split("/").pop();

        // const fetched = await axios.get(
        //   img.replace("onlineimage", "online/image"),
        //   {
        //     headers: {
        //       Accept: "application/json",
        //       "Content-Type": "application/json",
        //       "Access-Control-Allow-Origin": "*",
        //       "Access-Control-Allow-Headers":
        //         "Origin, X-Requested-With, Content-Type, Accept, Authorization",
        //       "Access-Control-Request-Method":
        //         "GET, POST, DELETE, PUT, OPTIONS",
        //       Authorization: `Bearer ${token}`,
        //     },
        //   }
        // );
        // console.log({ fetch: fetched });
        const file = await JSZipUtils.getBinaryContent(
          img.replace("onlineimage", "online/image")
        );
        console.log(1);
        zip.file(filename, file, { binary: true });
        count++;
        if (count === listSrcTransfered.length) {
          zip.generateAsync({ type: "blob" }).then((content) => {
            saveAs(content, zipFilename);
          });
        }
      }
    } catch (error) {
      toast.error("Error: " + error.message);
      console.log({ err: error.message });
    }
  };

  const getBaseImg = async () => {
    try {
      const respone = await axios.get(
        `https://api.mangasocial.online/get/list_image/1?album=${album_id}`
      );

      if (!respone) {
        navigate("/swap-face");
        return;
      }

      const images = respone.data.list_sukien_video;
      setTransferedImgSrc(images.find((item) => item.id === Number(id))?.image);
    } catch (error) {
      toast.error("Can't find image");
      console.log({ err: error.message });
    }
  };

  useEffect(() => {
    getBaseImg();
  }, []);

  return (
    <div>
      {/* <UrlImageDownloader imageUrl="https://futurelove.online/image/gen_image/5048_864578991738/out/image_5.jpg" /> */}

      <label htmlFor={inputId} ref={labelRef} className="d-none" />
      <input
        id={inputId}
        className="hidden"
        type="file"
        multiple
        accept="image/*"
        onChange={handleInputChange}
      />
      <div className="searchBar flex items-center md:mt-10 lg:mt-24 mb-[20px] gap-2 sm:gap-4">
        <MenuBar />
      </div>
      <div className="flex flex-col">
        <div className="text-[22px] font-semibold text-red-400 mb-[20px]">
          <span>Upload your face</span>
        </div>

        {listSrcTransfered?.length > 0 ? (
          <div className="max-h-[40vh] flex flex-wrap gap-[20px] box-border py-10 rounded-lg overflow-y-scroll">
            {listSrcTransfered.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl overflow-hidden cursor-pointer w-[calc(100%/2-10px)] sm:w-[calc(100%/3-(20px*2/3))]  md:w-[calc(100%/4-(20px*3/4))] xl:w-[calc(100%/5-(20px*4/5))]"
                onClick={() => handleDownloadImage(item)}
              >
                <img
                  src={item.replace("onlineimage", "online/image")}
                  alt="Image swapped"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col xl:flex-row justify-center items-center bg-white w-full py-10 rounded-lg gap-5 xl:gap-20">
            {uploadImgSrc ? (
              <div className="flex flex-col items-center w-[400px] gap-5">
                <img
                  src={uploadImgSrc}
                  alt="Face Image"
                  className="max-w-full max-h-[400px] object-cover rounded-lg"
                />

                <button
                  className="bg-white border border-red-400 py-2 w-[100px] rounded-lg text-red-400"
                  onClick={() => labelRef.current?.click()}
                >
                  Change
                </button>
              </div>
            ) : (
              <div
                className="flex flex-col justify-center items-center rounded-lg w-[fit-content] px-5 xl:px-20 py-10 border-4 border-gray-300 border-dashed gap-5 cursor-pointer"
                onClick={() => labelRef.current?.click()}
              >
                <img src={UploadImageIcon} alt="Upload" className="w-[50px]" />
                <span className="text-[22] text-red-400">
                  Upload image fit PNG, JPG, JPEG, ...
                </span>
              </div>
            )}

            <div className="flex flex-col justify-between items-center xl:items-start gap-10 xl:gap-20">
              <div className="flex flex-col items-center xl:items-start">
                <span className="uppercase text-gray-400">Download image</span>
                <span className="text-red-400 font-semibold text-[20px]">
                  Your Image Need To Move...
                </span>
              </div>

              <button
                className="bg-red-400 py-4 w-[200px] rounded-lg text-white"
                onClick={handleUploadAndSwap}
              >
                Upload & Swap
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row items-center lg:justify-between mt-10 gap-5">
          <div className="flex justify-center items-center w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] xl:w-[550px] xl:h-[550px] bg-gray-500 rounded-lg overflow-hidden">
            {originalImg ? (
              <img
                src={originalImg}
                alt="Image"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-300">No Image</span>
            )}
          </div>
          <img
            src={TransferIcon}
            alt="Transfer"
            className="w-[50px] h-[50px] rotate-90 lg:rotate-0"
          />

          <div className="flex justify-center items-center w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] xl:w-[550px] xl:h-[550px] bg-gray-500 rounded-lg overflow-hidden">
            {transferedImgSrc ? (
              <img
                src={transferedImgSrc}
                alt="Image"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-300">No Image</span>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center mt-10">
          <button
            className="bg-red-400 py-3 xl:py-4 w-[150px] xl:w-[200px] rounded-lg text-white text-[16px] xl:text-[20px]"
            onClick={handleDownloadAllImages}
          >
            Download
          </button>

          <button
            className="flex items-center text-red-400 text-[16px] xl:text-[20px] gap-2"
            onClick={() => navigate("/swap-face")}
          >
            <span>Go to detail</span>
            <img src={DirectLeftIcon} alt="Direct" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SwapFace;
