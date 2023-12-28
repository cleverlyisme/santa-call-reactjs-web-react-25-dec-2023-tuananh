import { useEffect, useId, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";

import MenuBar from "../../components/MenuBar/MenuBar";
import UploadImageIcon from "../../assets/UploadImageIcon.svg";
import TransferIcon from "../../assets/TransferIcon.svg";
import DirectLeftIcon from "../../assets/DirectLeftIcon.svg";

function SwapFace() {
  const [file, setFile] = useState(null);
  const [baseImgSrc, setBaseImageSrc] = useState(null);
  const [uploadImgSrc, setUploadImgSrc] = useState(null);
  const [transferedImgSrc, setTransferedImgSrc] = useState(null);

  const { id } = useParams();
  const location = useLocation();
  const labelRef = useRef();
  const inputId = useId();

  const searchParams = new URLSearchParams(location.search);
  const album_id = searchParams.get("album_id");

  const handleInputChange = (e) => {
    setUploadImgSrc(URL.createObjectURL(e.target.files[0]));
    console.log({ url: URL.createObjectURL(e.target.files[0]) });
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {};

  const getBaseImg = async () => {
    try {
      const respone = await axios.get(
        `https://api.mangasocial.online/get/list_image/1?album=${album_id}`
      );

      if (respone) {
        const images = respone.data.list_sukien_video;
        console.log({ image: images.find((item) => item.id === Number(id)) });
        setBaseImageSrc(images.find((item) => item.id === Number(id))?.image);
      } else {
        console.log("no response");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBaseImg();
  }, []);

  return (
    <div>
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
        <div className="flex flex-col xl:flex-row justify-center items-center bg-white w-full py-10 rounded-lg gap-5 xl:gap-20">
          {uploadImgSrc ? (
            <div className="w-[400px] h-[400px] rounded-lg overflow-hidden">
              <img
                src={uploadImgSrc}
                alt="Face Image"
                className="w-full h-full object-cover"
              />
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
              onClick={handleUpload}
            >
              Upload Image
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center lg:justify-between mt-10 gap-5">
          <div className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] xl:w-[550px] xl:h-[550px] bg-gray-500 rounded-lg overflow-hidden">
            <img
              src={baseImgSrc}
              alt="Image"
              className="w-full h-full object-cover"
            />
          </div>
          <img
            src={TransferIcon}
            alt="Transfer"
            className="w-[50px] h-[50px] rotate-90 lg:rotate-0"
          />

          <div className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] xl:w-[550px] xl:h-[550px] bg-gray-500 rounded-lg overflow-hidden">
            <img
              src={transferedImgSrc}
              alt="Image"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex justify-between items-center mt-10">
          <button className="bg-red-400 py-3 xl:py-4 w-[150px] xl:w-[200px] rounded-lg text-white text-[16px] xl:text-[20px]">
            Download
          </button>

          <button className="flex items-center text-red-400 text-[16px] xl:text-[20px] gap-2">
            <span>Go to detail</span>
            <img src={DirectLeftIcon} alt="Direct" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SwapFace;
