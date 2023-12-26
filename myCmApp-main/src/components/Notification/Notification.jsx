import "../Notification/Notification.css";
import notificationIcon from "../../assets/NotificationIcon.svg";
import { useState } from "react";
function Notification() {
  const [urlImg, setUrlImg] = useState(localStorage.getItem("image"));

  return (
    <div className="absolute top-0 right-0 z-10">
      <div className="container">
        <img src={notificationIcon} className="cursor-pointer" />
        <div className="user-img">
          <img src={urlImg} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export default Notification;
