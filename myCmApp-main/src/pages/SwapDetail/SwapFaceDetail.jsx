import { useEffect, useState } from "react";
import axios from "axios";

import Detail from "./Detail";
import TabBar from "../../components/TabBar/TabBar";
import MenuBar from "../../components/MenuBar/MenuBar";

function SwapFaceDetail() {
  const [videos, setVideos] = useState([]);
  const [images, setImages] = useState([]);
  const [tabItem, setTabItem] = useState("images");

  const getMedias = async () => {
    try {
      let respone = await axios.get(
        tabItem === "images"
          ? "https://api.mangasocial.online/get/list_image/1?album=1"
          : "https://api.mangasocial.online/get/list_image/1?album=1"
      );
      if (respone) {
        tabItem === "images"
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
    getMedias();
  }, [tabItem]);

  return (
    <div>
      <MenuBar />
      <TabBar tabItem={tabItem} setTabItem={setTabItem} />
      <div className="flex flex-col max-h-[80vh] rounded-lg overflow-y-scroll pr-[5px] md:pr-[20px] mt-[30px]">
        <div className="text-[22px] font-semibold text-red-400 mb-[20px]">
          <span>All Details</span>
        </div>
        <Detail
          swap="face"
          tabItem={tabItem}
          medias={tabItem === "images" ? images : videos}
        />
      </div>
    </div>
  );
}

export default SwapFaceDetail;
