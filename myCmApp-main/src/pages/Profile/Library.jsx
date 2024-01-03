import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";
import axios from "axios";

import LibraryList from "./components/LibraryList";
import VideoModal from "./components/VideoModal";

function Library() {
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [openVideoModal, setOpenVideoModal] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);

  const handleViewAlbum = (item) => {
    navigate(`/profile/album/${item.id}`);
  };

  const handleViewVideo = (item) => {
    setOpenVideoModal(true);
    setCurrentVideo(item);
  };

  const setNextVideo = () => {
    if (!currentVideo) return;

    const previousVideo = videos.find(
      (item, index) =>
        index - 1 ===
        videos.indexOf(videos.find((item) => item.id === currentVideo.id))
    );

    setCurrentVideo(previousVideo);
  };

  const setPreviousVideo = () => {
    if (!currentVideo) return;

    const previousVideo = videos.find(
      (item, index) =>
        index + 1 ===
        videos.indexOf(videos.find((item) => item.id === currentVideo.id))
    );

    setCurrentVideo(previousVideo);
  };

  const downloadVideo = async () => {
    if (!currentVideo) return;

    try {
      const link = currentVideo.link_video;
      const fileName = link.split("/").pop();

      await saveAs(link, fileName);
    } catch (error) {
      toast.error("Error: " + error.message);
      console.log({ err: error.message });
    }
  };

  const getMedias = async () => {
    try {
      const imagesResponse = await axios.get(
        "https://api.mangasocial.online/get/list_image/1?album=1"
      );
      const videosResponse = await axios.get(
        "https://api.mangasocial.online/lovehistory/listvideo/santa/1?category=3"
      );
      if (imagesResponse && videosResponse) {
        setImages(imagesResponse.data?.list_sukien_video);
        setVideos(videosResponse.data?.list_sukien_video);
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

      <div className="flex justify-between mb-[20px]">
        <span className="text-[22px] font-semibold text-green-800">
          Your photos
        </span>
      </div>

      <LibraryList type="image" medias={images} handleView={handleViewAlbum} />

      <div className="flex justify-between mb-[20px] mt-10">
        <span className="text-[22px] font-semibold text-green-800">
          Your videos
        </span>
      </div>
      <LibraryList type="video" medias={videos} handleView={handleViewVideo} />
      <VideoModal
        openVideoModal={openVideoModal}
        setOpenVideoModal={setOpenVideoModal}
        currentVideo={currentVideo}
        setCurrentVideo={setCurrentVideo}
        setNextVideo={setNextVideo}
        setPreviousVideo={setPreviousVideo}
        downloadVideo={downloadVideo}
      />
    </div>
  );
}

export default Library;
