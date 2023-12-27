import { useRef, useState } from "react";

import MenuBar from "../../components/MenuBar/MenuBar";
import UploadImageIcon from "../../assets/UploadImageIcon.svg";
import TransferIcon from "../../assets/TransferIcon.svg";

function SwapFace() {
  const [imageSrc, setImageSrc] = useState("");
  const uploadRef = useRef();

  return (
    <div>
      <input className="hidden" type="file" ref={uploadRef} accept="image/*" />
      <div className="searchBar flex items-center mt-10 md:mt-24 mb-[30px] gap-2 sm:gap-4">
        <MenuBar />
      </div>
      <div className="flex flex-col">
        <div className="text-[22px] font-semibold text-red-400 mb-[20px]">
          <span>Upload your face</span>
        </div>
        <div className="flex flex-col xl:flex-row justify-center items-center bg-white w-full py-10 rounded-lg gap-5 xl:gap-20">
          <div
            className="flex flex-col justify-center items-center rounded-lg w-[fit-content] px-5 xl:px-20 py-10 border-4 border-gray-300 border-dashed gap-5 cursor-pointer"
            onClick={() => uploadRef.current?.click()}
          >
            <img src={UploadImageIcon} alt="Upload" className="w-[50px]" />
            <span className="text-[22] text-red-400">
              Upload image filt PNG, JPG, JPEG, ...
            </span>
          </div>

          <div className="flex flex-col justify-between items-center xl:items-start gap-10 xl:gap-20">
            <div className="flex flex-col items-center xl:items-start">
              <span className="uppercase text-gray-400">Download image</span>
              <span className="text-red-400 font-semibold text-[20px]">
                Your Image Need To Move...
              </span>
            </div>

            <button className="bg-red-400 py-4 w-[200px] rounded-lg text-white">
              Upload Image
            </button>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row items-center xl:justify-between mt-10 gap-5">
          <div className="w-[400px] h-[400px] xl:w-[550px] xl:h-[550px] bg-gray-500 rounded-lg"></div>
          <img
            src={TransferIcon}
            alt="Transfer"
            className="w-[50px] h-[50px] rotate-90 xl:rotate-0"
          />

          <div className="w-[400px] h-[400px] xl:w-[550px] xl:h-[550px] bg-gray-500 rounded-lg "></div>
        </div>

        <div>
          <button className="bg-red-400 py-4 w-[200px] rounded-lg text-white text-[20px] mt-10">
            Download
          </button>
        </div>
      </div>
    </div>
  );
}

export default SwapFace;
