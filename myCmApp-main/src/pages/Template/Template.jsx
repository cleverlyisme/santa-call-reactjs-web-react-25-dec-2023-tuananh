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
  // const [imgaes, setImages] = useState([]);
  const [custome, setCustome] = useState("images");
  const [hoveredCustome, setHoveredCustome] = useState(null);

  const handleSearch = () => {
    console.log(searchKey);
  };

  const getTemplates = async () => {
    try {
      let respone = await axios.get(
        "https://metatechvn.store/lovehistory/video/1"
      );
      if (respone) {
        setVideos(respone.data?.list_sukien_video[5].sukien_video);
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
  }, []);

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
      <div className="templates">
        {custome === "videos" ? (
          <>
            <div className="title">
              <span className="sp1">All videos templates</span>
            </div>
            <div>
              <div className="template">
                {videos.map((item, index) => {
                  console.log(item.link_image);
                  return (
                    <div key={index} className="">
                      <img src={item.link_image} style={{ width: "200px" }} />
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
              <div className="template">
                {videos.map((item, index) => {
                  console.log(item.link_image);
                  return (
                    <div key={index} className="">
                      <img src={item.link_image} style={{ width: "200px" }} />
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
