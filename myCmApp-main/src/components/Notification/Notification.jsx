import "../Notification/Notification.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import notificationIcon from "../../assets/NotificationIcon.svg";

function Notification() {
  const avatarUrl = useSelector((state) => state.user.account.link_avatar);

  const [urlImg, setUrlImg] = useState(null);

  const getAvatar = () => {
    setUrlImg(avatarUrl);
  };

  useEffect(() => {
    getAvatar();
  }, []);

  return (
    <div className="absolute top-0 right-0 z-10">
      <div className="container mr-5 md:mr-10 mt-10">
        <img
          src={notificationIcon}
          className="cursor-pointer h-[25px] w-[25px] sm:h-[30px] sm:w-[30px] mr-3 sm:mr-5"
        />
        <div className="user-img">
          <img
            src={urlImg}
            className="cursor-pointer h-[40px] w-[40px] sm:h-[50px] sm:w-[50px]"
          />
        </div>
      </div>
    </div>
  );
}

export default Notification;
