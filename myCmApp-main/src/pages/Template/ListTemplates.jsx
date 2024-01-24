
function ListTemplates({ tabItem, medias, handleClickTemplate }) {
  return (
    <div className="pr-[20px] mt-[30px] max-h-[80vh] overflow-y-scroll">
      <div>
        <div className="flex flex-wrap gap-[20px] box-border">
          {medias.map((item, index) => {
            return (
              <div
                key={index}
                className="rounded-2xl overflow-hidden relative cursor-pointer w-[calc(100%/2-10px)] sm:w-[calc(100%/3-(20px*2/3))]  md:w-[calc(100%/4-(20px*3/4))] xl:w-[calc(100%/5-(20px*4/5))]"
                onClick={() => handleClickTemplate(item)}
              >
                <img
                  src={tabItem === "images" ? item.image : item.thumbnail}
                  alt="Image template"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ListTemplates;
