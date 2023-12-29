import { useEffect, useState } from "react";
import axios from "axios";

import MenuBar from "../../components/MenuBar/MenuBar";
import ListItem from "./ListItem";

function Profile() {
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  const getMedias = async () => {
    try {
      const imagesRespone = await axios.get(
        "https://api.mangasocial.online/get/list_image/1?album=1"
      );
      const videosRespone = await axios.get(
        "https://api.mangasocial.online/get/list_image/1?album=1"
      );
      if (imagesRespone && videosRespone) {
        setImages(imagesRespone.data?.list_sukien_video);
        setVideos(imagesRespone.data?.list_sukien_video);
        console.log("respose1:", imagesRespone);
        console.log("respose2:", videosRespone);
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
      <div className="flex items-center md:mt-10 lg:mt-24 mb-[20px] gap-2 sm:gap-4">
        <MenuBar />
      </div>

      <div className="px-4 sm:px-0 flex flex-col-reverse items-center xl:items-start xl:flex-row gap-10">
        <div className="flex flex-col w-[80vw] md:w-[60vw]">
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

        <div className="w-[80vw] sm:w-[30vw] md:w-[40vw] lg:w-[40vw] xl:w-[40vw] flex flex-col overflow-hidden mt-10">
          <div className=" bg-red-400 p-3 rounded-t-lg">
            <span className="text-[18px] font-medium text-white">Profile</span>
          </div>
          <div className="h-[300px] rounded-b-lg bg-white"></div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
