import { useEffect, useState } from "react";
import SearchIcon from "../../assets/SearchIcon.svg";
import "./Template.css";
import galaryIcon from "../../assets/galleryIcon.svg";
import galaryIconActive from "../../assets/galleryIconActive.svg";
import videoIcon from "../../assets/videoIcon.svg";
import videoIconActive from "../../assets/videoIconActive.svg";
import axios from "axios";

function Template() {
  const [searchKey, setSearchKey] = useState("");
  const [videos, setVideos] = useState([]);
  const [images, setImages] = useState([]);
  const [custome, setCustome] = useState("images");
  const [hoveredCustome, setHoveredCustome] = useState(null);
  const [openModal, setOpenModal] = useState(true);

  const handleSearch = () => {
    console.log(searchKey);
  };

  const getTemplates = async () => {
    try {
      let respone = await axios.get(
        custome === "images"
          ? "https://metatechvn.store/lovehistory/page/1?id_user=0"
          : "https://metatechvn.store/lovehistory/page/1?id_user=0"
      );
      if (respone) {
        custome === "images"
          ? setImages(respone.data?.list_sukien[5].sukien)
          : setVideos(respone.data?.list_sukien[5].sukien);
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
      <div className="searchBar">
        <img
          src={SearchIcon}
          className="imgSearch"
          onClick={() => handleSearch()}
        />
        <div className="search">
          <input
            type="text"
            value={searchKey}
            placeholder="Search or type"
            className="placeholder-gray-400 placeholder-opacity-75 text-sm"
            onChange={(event) => setSearchKey(event.target.value)}
          />
        </div>
      </div>

      <div className="custome">
        <div
          className={`images-custome ${
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
          />
          <button
            onClick={() => setCustome("images")}
            onMouseEnter={() => setHoveredCustome("images")}
            onMouseLeave={() => setHoveredCustome(null)}
          >
            Images
          </button>
        </div>
        <div
          className={`videos-custome ${
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
          />
          <button
            onClick={() => setCustome("videos")}
            onMouseEnter={() => setHoveredCustome("videos")}
            onMouseLeave={() => setHoveredCustome(null)}
          >
            Videos
          </button>
        </div>
      </div>
      <div className="templates-container">
        {custome === "videos" ? (
          <>
            <div className="title">
              <span className="sp1">All videos templates</span>
            </div>
            <div>
              <div className="templates">
                {videos.map((item, index) => {
                  console.log({ item });
                  return (
                    <div key={index} className="template relative">
                      <img src={item.link_nam_goc} />
                      <span className="absolute top-2 left-3 text-white text-xs font-medium">
                        2:00 min
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="title">
              <span className="sp1">All images templates</span>
            </div>
            <div>
              <div className="templates">
                {images.map((item, index) => {
                  return (
                    <div key={index} className="template">
                      <img src={item.link_nam_goc} />
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Template;
