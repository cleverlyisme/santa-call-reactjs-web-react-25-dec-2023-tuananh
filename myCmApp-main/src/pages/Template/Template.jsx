import { useEffect, useState } from "react";
import SearchIcon from "../../assets/SearchIcon.svg";
import "./Template.css";
import galaryIcon from "../../assets/galleryIcon.svg";
import galaryIconActive from "../../assets/galleryIconActive.svg";
import videoIcon from "../../assets/videoIcon.svg";
import videoIconActive from "../../assets/videoIconActive.svg";
import axios from "axios";
import Modal from "./Modal";
import MenuBar from "../../components/MenuBar/MenuBar";

function Template() {
  const [searchKey, setSearchKey] = useState("");
  const [videos, setVideos] = useState([]);
  const [images, setImages] = useState([]);
  const [custome, setCustome] = useState("images");
  const [hoveredCustome, setHoveredCustome] = useState(null);
  const [currentMedia, setCurrentMedia] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleSearch = () => {
    console.log(searchKey);
  };

  const setPreviousMedia = () => {
    if (!currentMedia) return;

    const previousMedia =
      currentMedia.type === "face"
        ? images.find(
            (item, index) =>
              index + 1 ===
              images.indexOf(images.find((item) => item.id === currentMedia.id))
          )
        : videos.find(
            (item, index) =>
              index + 1 ===
              videos.indexOf(images.find((item) => item.id === currentMedia.id))
          );

    setCurrentMedia(
      previousMedia ? { type: currentMedia.type, ...previousMedia } : null
    );
  };

  const setNextMedia = () => {
    if (!currentMedia) return;

    const nextMedia =
      currentMedia.type === "face"
        ? images.find((item, index) => {
            if (currentMedia.id === images[index - 1]?.id) return item;
          })
        : videos.find((item, index) => {
            if (currentMedia.id === videos[index - 1]?.id) return item;
          });

    setCurrentMedia(
      nextMedia ? { type: currentMedia.type, ...nextMedia } : null
    );
  };

  const getTemplates = async () => {
    try {
      let respone = await axios.get(
        custome === "images"
          ? "https://api.mangasocial.online/get/list_image/1?album=1"
          : "https://api.mangasocial.online/get/list_image/1?album=1"
      );
      if (respone) {
        custome === "images"
          ? setImages(respone.data?.list_sukien_video)
          : setVideos(respone.data?.list_sukien_video);
        console.log("respose:", respone);
      } else {
        console.log("no response");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTemplates();
  }, [custome]);

  return (
    <div className="home-container">
      <div className="searchBar flex items-center mt-5 gap-2 sm:gap-4">
        <MenuBar />
        <div className="search relative">
          <img
            src={SearchIcon}
            alt="Search"
            className="imgSearch"
            onClick={() => handleSearch()}
          />
          <input
            type="text"
            placeholder="Search or type"
            value={searchKey}
            className="placeholder-gray-400 placeholder-opacity-75 text-xs sm:text-sm w-[40vw]"
            onChange={(event) => setSearchKey(event.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-4 mt-12">
        <div
          className={`images-custome flex items-center gap-2 p-3 sm:p-4 rounded-lg ${
            custome === "images" || hoveredCustome === "images"
              ? "bg-red-400 text-rose-100"
              : "bg-white text-red-400"
          }`}
        >
          <img
            src={
              custome === "images" || hoveredCustome === "images"
                ? galaryIconActive
                : galaryIcon
            }
            alt="Images"
          />
          <button
            className="text-sm sm:text-base"
            onClick={() => setCustome("images")}
            onMouseEnter={() => setHoveredCustome("images")}
            onMouseLeave={() => setHoveredCustome(null)}
          >
            Images
          </button>
        </div>
        <div
          className={`videos-custome flex items-center gap-2 p-3 sm:p-4 rounded-lg ${
            custome === "videos" || hoveredCustome === "videos"
              ? "bg-red-400 text-rose-100"
              : "bg-white text-red-400"
          }`}
        >
          <img
            src={
              custome === "videos" || hoveredCustome === "videos"
                ? videoIconActive
                : videoIcon
            }
            alt="Videos"
          />
          <button
            className="text-sm sm:text-base"
            onClick={() => setCustome("videos")}
            onMouseEnter={() => setHoveredCustome("videos")}
            onMouseLeave={() => setHoveredCustome(null)}
          >
            Videos
          </button>
        </div>
      </div>
      <div className="templates-container">
        {custome === "images" ? (
          <>
            <div className="title">
              <span className="sp1">All images templates</span>
            </div>
            <div>
              <div className="templates">
                {images.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="template cursor-pointer w-[calc(100%/2-10px)] sm:w-[calc(100%/3-(20px*2/3))]  md:w-[calc(100%/4-(20px*3/4))] xl:w-[calc(100%/5-(20px*4/5))]"
                      onClick={() => {
                        setOpenModal(true);
                        setCurrentMedia({ type: "face", ...item });
                      }}
                    >
                      <img
                        src={item.image}
                        alt="Image template"
                        loading="lazy"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="title">
              <span className="sp1">All videos templates</span>
            </div>
            <div>
              <div className="templates">
                {videos.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="template relative cursor-pointer w-[calc(100%/2-10px)] sm:w-[calc(100%/3-(20px*2/3))]  md:w-[calc(100%/4-(20px*3/4))] xl:w-[calc(100%/5-(20px*4/5))]"
                      onClick={() => {
                        setOpenModal(true);
                        setCurrentMedia({ type: "video", ...item });
                      }}
                    >
                      <img
                        src={item.image}
                        alt="Video template"
                        loading="lazy"
                      />
                      <span className="absolute top-2 left-3 text-white text-xs font-medium">
                        2:00 min
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
      <Modal
        openModal={openModal}
        setOpenModal={setOpenModal}
        currentMedia={currentMedia}
        setCurrentMedia={setCurrentMedia}
        setPreviousMedia={setPreviousMedia}
        setNextMedia={setNextMedia}
      />
    </div>
  );
}

export default Template;
