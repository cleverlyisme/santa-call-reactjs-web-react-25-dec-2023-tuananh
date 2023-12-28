import { useState } from "react";

import SearchBar from "../../components/SearchBar/SearchBar";
import TransferIcon from "../../assets/TransferIcon.svg";
import DirectLeftIcon from "../../assets/DirectLeftIcon.svg";

function SwapVideo() {
  const [searchKey, setSearchKey] = useState("");

  const handleSearch = () => {
    console.log(searchKey);
  };

  return (
    <div>
      <SearchBar
        searchKey={searchKey}
        setSearchKey={setSearchKey}
        handleSearch={handleSearch}
      />
      <div className="flex flex-col mt-12">
        <div className="text-[22px] font-semibold text-red-400 mb-[20px]">
          <span>Swap videos</span>
        </div>

        <div className="flex flex-col lg:flex-row items-center lg:justify-between mt-10 gap-5">
          <div className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] xl:w-[550px] xl:h-[550px] bg-gray-500 rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1543589077-47d81606c1bf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2hyaXN0bWFzfGVufDB8fDB8fHww"
              alt="Image"
              className="w-full h-full object-cover"
            />
          </div>
          <img
            src={TransferIcon}
            alt="Transfer"
            className="w-[50px] h-[50px] rotate-90 lg:rotate-0"
          />

          <div className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] xl:w-[550px] xl:h-[550px] bg-gray-500 rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1543589077-47d81606c1bf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2hyaXN0bWFzfGVufDB8fDB8fHww"
              alt="Image"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex justify-between items-center mt-10">
          <button className="bg-red-400 py-3 xl:py-4 w-[150px] xl:w-[200px] rounded-lg text-white text-[16px] xl:text-[20px]">
            Download
          </button>

          <button className="flex items-center text-red-400 text-[16px] xl:text-[20px] gap-2">
            <span>Go to detail</span>
            <img src={DirectLeftIcon} alt="Direct" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SwapVideo;
