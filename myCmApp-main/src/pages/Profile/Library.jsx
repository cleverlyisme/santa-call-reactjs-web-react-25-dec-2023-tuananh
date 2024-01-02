import { useEffect, useState } from "react";
import axios from "axios";

import ListItem from "./ListItem";

function Library() {
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  const getMedias = async () => {
    try {
      const imagesResponse = await axios.get(
        "https://api.mangasocial.online/get/list_image/1?album=1"
      );
      const videosResponse = await axios.get(
        "https://api.mangasocial.online/get/list_image/1?album=1"
      );
      if (imagesResponse && videosResponse) {
        setImages(imagesResponse.data?.list_sukien_video);
        setVideos(imagesResponse.data?.list_sukien_video);
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
    <div className="flex flex-col w-full md:w-full xl:w-[70%]">
      <div className="text-[22px] font-semibold text-red-400 mb-[20px]">
        <span>Library</span>
      </div>

      <div className="text-[22px] font-semibold text-green-800 mb-[20px]">
        <span>Your photos</span>
      </div>

      <ListItem type="image" medias={images} />

      <div className="text-[22px] font-semibold text-green-800 mb-[20px] mt-10">
        <span>Your videos</span>
      </div>
      <ListItem type="video" medias={videos} />
    </div>
  );
}

export default Library;
