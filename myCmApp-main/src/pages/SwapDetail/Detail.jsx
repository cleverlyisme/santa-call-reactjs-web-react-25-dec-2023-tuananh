function Detail({ swap, tabItem, medias }) {
  console.log({ swap });
  return (
    <div className="flex flex-col rounded-lg p-10 bg-white gap-10">
      {medias.map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-center md:flex-row gap-8 md:gap-12"
        >
          <div className="w-[300px] h-[300px] md:w-[400px] md:h-[300px] rounded-lg overflow-hidden">
            <img
              src={item.image}
              alt={tabItem}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="truncate capitalize flex flex-col justify-center w-[fit-content] gap-2">
            <span className="text-[16px] text-gray-400">Christmas Day</span>
            <span className="truncate-2 capitalize text-[20px] text-red-400 font-normal">
              Your Image Need To Move...
            </span>
            <span className="truncate-2 capitalize text-[20px] font-medium text-green-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
              sapiente ipsam molestiae perferendis fugit, officia quo, obcaecati
              quae ut reiciendis quos odit distinctio, beatae commodi nihil
              iste? Explicabo, commodi repellat.
            </span>
            <span className="capitalize text-[16px] text-gray-400 mb-5">
              Total 10 {tabItem}
            </span>
            <button className="capitalize bg-red-400 px-2 py-3 xl:py-4 w-[150px] xl:w-[200px] rounded-lg text-white text-[14px] xl:text-[16px]">
              Download {tabItem}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Detail;
