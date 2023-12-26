import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import SearchIcon from "../../assets/SearchIcon.svg";
import "../Home/Home.css";

function Home() {
  const navigate = useNavigate();
  const [searchKey, setSearchKey] = useState("");
  const [image, setImage] = useState([]);

  const handleSearch = () => {
    console.log(searchKey);
  };

  const getSwapEvent = async () => {
    try {
      let respone = await axios.get(
        "https://metatechvn.store/lovehistory/page/1?id_user=0"
      );
      if (respone) {
        setImage(respone.data?.list_sukien[5].sukien);
        console.log("respose:", respone);
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
            placeholder="Search or type"
            value={searchKey}
            className="placeholder-gray-400 placeholder-opacity-75 text-sm"
            onChange={(event) => setSearchKey(event.target.value)}
          />
        </div>
      </div>
      <div className="swap-container">
        <div className="image-swap">
          <div className="title">
            <span className="sp1">Images</span>
            <div className="flex justify-between text-green-600">
              <span className="sp2">Swap Image</span>
              <span
                className="cursor-pointer hover:underline"
                onClick={() => navigate("/template")}
              >
                View...
              </span>
            </div>
          </div>
          <Swiper slidesPerView={3} spaceBetween={30}>
            {image.map((item, index) => {
              console.log(item);
              return (
                <SwiperSlide key={index} className="cursor-pointer">
                  <img src={item.link_nam_goc} />
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
                    <div className="absolute bottom-4 right-4 w-5 h-5 rounded-full bg-green-800"></div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        <div className="video-swap">
          <div className="title">
            <span className="sp1">Videos</span>
            <div className="flex justify-between text-green-600">
              <span className="sp2">Swap Video</span>
              <span
                className="cursor-pointer hover:underline"
                onClick={() => navigate("/template")}
              >
                View...
              </span>
            </div>
          </div>
          <Swiper
            slidesPerView={3}
            spaceBetween={10}
            pagination={{
              clickable: true,
            }}
          >
            {image.map((item, index) => (
              <SwiperSlide key={index} className="cursor-pointer">
                <img src={item.link_nam_goc} />
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
                  <div className="absolute bottom-4 right-4 w-5 h-5 rounded-full bg-green-800"></div>
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
