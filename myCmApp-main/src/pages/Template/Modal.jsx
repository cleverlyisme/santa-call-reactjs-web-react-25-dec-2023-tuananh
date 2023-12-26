import { useNavigate } from "react-router-dom";

import ArrowLeftIcon from "../../assets/ArrowLeftIcon.svg";
import ArrowRightIcon from "../../assets/ArrowRightIcon.svg";

function Modal({ openModal, setOpenModal, currentMedia, setCurrentMedia }) {
  const navigate = useNavigate();
  if (!openModal) return null;
  return (
    <div
      className="fixed w-screen h-screen top-0 left-0 flex justify-evenly items-center bg-black bg-opacity-70 z-20"
      onClick={() => {
        setOpenModal(false);
        setCurrentMedia(null);
      }}
    >
      <img
        src={ArrowLeftIcon}
        alt="Previous"
        className="cursor-pointer hover:opacity-50"
        onClick={(e) => {
          e.stopPropagation();
        }}
      />
      <div className="flex flex-col gap-10">
        <div
          className="bg-gray-500 rounded-xl w-[40vw] h-[60vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {currentMedia?.type === "face" ? (
            <img
              src={currentMedia.image}
              alt="Image"
              className="w-full h-full"
            />
          ) : (
            <video className="rounded-xl w-[40vw] h-[60vh]" controls>
              <source
                src={"https://futurelove.online/image/video_sk/302.mp4"}
                type="video/mp4"
              />{" "}
              Your browser does not support the video tag.
            </video>
          )}
        </div>
        <div className="flex justify-between">
          <button
            className="bg-red-400 text-white px-14 py-3 rounded-lg"
            onClick={(e) => {
              e.stopPropagation();
              navigate(
                currentMedia.type === "face" ? "/swap-face" : "/swap-video"
              );
            }}
          >
            Swap {currentMedia.type}
          </button>
        </div>
      </div>
      <img
        src={ArrowRightIcon}
        alt="Next"
        className="cursor-pointer hover:opacity-50"
        onClick={(e) => {
          e.stopPropagation();
        }}
      />
    </div>
  );
}

export default Modal;
