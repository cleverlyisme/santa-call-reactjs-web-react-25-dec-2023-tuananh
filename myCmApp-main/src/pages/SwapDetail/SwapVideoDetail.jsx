import { useEffect, useState } from "react";
import axios from "axios";

import Detail from "./Detail";
import MenuBar from "../../components/MenuBar/MenuBar";

function SwapVideoDetail() {
  const [videos, setVideos] = useState([]);

  const getMedias = async () => {
    try {
      let response = await axios.get(
        "https://api.mangasocial.online/lovehistory/listvideo/santa/1?category=3"
      );
      if (response) {
        setVideos(response.data?.list_sukien_video);
      } else {
        console.log("no response");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMedias();
  }, []);

  return (
    <div>
      <MenuBar />
      <div className="flex flex-col rounded-lg pr-[5px] md:pr-[20px] mt-[30px]">
        <div className="text-[22px] font-semibold text-red-400 mb-[20px]">
          <span>All Details</span>
        </div>
        <Detail swap="video" type="video" medias={videos} />
      </div>
    </div>
  );
}

export default SwapVideoDetail;
