import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import SearchBar from "../../components/SearchBar/SearchBar";

function Home() {
  const navigate = useNavigate();
  const [searchKey, setSearchKey] = useState("");
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  const breakpoints = {
    1024: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1280: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
    1536: {
      slidesPerView: 4,
      spaceBetween: 50,
    },
  };

  const handleSearch = () => {
    console.log(searchKey);
  };

  const getSwapEvent = async () => {
    try {
      const imagesRespone = await axios.get(
        "https://metatechvn.store/lovehistory/page/1?id_user=0"
      );
      const videosRespone = await axios.get(
        "https://metatechvn.store/lovehistory/page/1?id_user=0"
      );
      if (imagesRespone && videosRespone) {
        setImages(imagesRespone.data?.list_sukien[5].sukien);
        setVideos(imagesRespone.data?.list_sukien[5].sukien);
        console.log("respose:", imagesRespone);
      } else {
        console.log("no response");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSwapEvent();
  }, []);

  return (
    <div>
      <SearchBar
        searchKey={searchKey}
        setSearchKey={setSearchKey}
        handleSearch={handleSearch}
      />
      <div className="flex flex-col gap-[20px] mt-12 mb-5">
        <div className="image-swap">
          <div className="flex flex-col mb-[10px]">
            <span className="text-[22px] font-semibold text-red-400">
              Images
            </span>
            <div className="flex justify-between text-green-600">
              <span className="font-normal">Swap Image</span>
              <span
                className="cursor-pointer hover:underline"
                onClick={() => navigate("/template")}
              >
                View...
              </span>
            </div>
          </div>
          <Swiper
            slidesPerView={2}
            spaceBetween={20}
            pagination={{
              clickable: true,
            }}
            breakpoints={breakpoints}
          >
            {images.map((item, index) => {
              console.log(item);
              return (
                <SwiperSlide key={index} className="cursor-pointer">
                  <img
                    src={item.link_nam_goc}
                    alt="Image"
                    className="max-h-[200px]"
                  />
                  <div className="flex flex-col gap-1 px-4 py-2">
                    <span className="truncate text-sm uppercase font-extralight text-green-600">
                      {item.ten_su_kien}
                    </span>
                    <span className="truncate text-base font-normal text-green-600">
                      {item.noi_dung_su_kien}
                    </span>
                    <span className="text-xs font-extralight text-gray-400">
                      18 images
                    </span>
                    <div className="absolute bottom-4 right-4 w-4 h-4 rounded-full bg-green-800"></div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        <div className="video-swap">
          <div className="flex flex-col mb-[10px]">
            <span className="text-[22px] font-semibold text-red-400">
              Videos
            </span>
            <div className="flex justify-between text-green-600">
              <span className="font-normal">Swap Video</span>
              <span
                className="cursor-pointer hover:underline"
                onClick={() => navigate("/template")}
              >
                View...
              </span>
            </div>
          </div>
          <Swiper
            slidesPerView={2}
            spaceBetween={20}
            pagination={{
              clickable: true,
            }}
            breakpoints={breakpoints}
          >
            {videos.map((item, index) => (
              <SwiperSlide key={index} className="cursor-pointer">
                <img
                  src={item.link_nam_goc}
                  alt="Video"
                  className="max-h-[200px]"
                />
                <div className="flex flex-col gap-1 px-4 py-2">
                  <span className="truncate text-sm uppercase font-extralight text-green-600">
                    {item.ten_su_kien}
                  </span>
                  <span className="truncate text-base font-normal text-green-600">
                    {item.noi_dung_su_kien}
                  </span>
                  <span className="text-xs font-extralight text-gray-400">
                    2:00 min
                  </span>
                  <div className="absolute bottom-4 right-4 w-4 h-4 rounded-full bg-green-800"></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default Home;
