import { useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import EditIcon from "../../assets/EditIcon.svg";
import DoneIcon from "../../assets/DoneIcon.svg";

function EditProfile({ account }) {
  const [editUsername, setEditUsername] = useState(false);
  const [username, setUsername] = useState(account.user_name);

  const percent = 66;

  const progresses = [
    { index: 1, text: "Upload your profile image" },
    { index: 2, text: "Add your trusted payment method" },
    { index: 3, text: "Verify your email address" },
  ];

  const handleChangeUsername = () => {
    setEditUsername(!editUsername);
  };

  return (
    <div className="flex flex-col w-full md:w-full xl:w-[70%] gap-10">
      <div className="text-[22px] font-semibold text-red-400">
        <span>Edit Profile</span>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center bg-white px-10 py-6 rounded-lg overflow-hidden gap-5">
        <div className="flex flex-col gap-4">
          <span className="text-[26px] font-bold text-red-400">
            Complete Your Profile
          </span>
          {progresses.map((item) => (
            <div key={item.index} className="flex items-center gap-2">
              <div className="rounded-lg flex justify-center items-center bg-red-400 text-white px-[12px] py-[2px]">
                <span className="text-[16px] font-bold">{item.index}</span>
              </div>
              <span className="text-gray-400">{item.text}</span>
            </div>
          ))}
        </div>

        <div className="w-[100px] h-[100px]">
          <CircularProgressbar
            value={percent}
            text={`${percent}%`}
            className="w-full h-full"
            styles={buildStyles({
              textColor: "#f87171",
              pathColor: "#56B64E",
              trailColor: "#E1EEE0",
            })}
          />
        </div>
      </div>

      <div className="flex flex-col bg-white px-10 py-6 rounded-lg overflow-hidden gap-2">
        <span className="text-[26px] font-bold text-red-400">Profile</span>
        <span className="text-[16px] text-gray-400">Basic infor...</span>
        <div className="flex flex-wrap sm:flex-nowrap justify-between items-center gap-3 text-[20px]">
          <label
            htmlFor="name"
            className="w-[fit-content] text-gray-600 order-1"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-gray-100 rounded-lg px-6 py-4 order-3 sm:order-2"
            disabled={!editUsername}
          />

          <div
            className="flex text-red-400 gap-2 cursor-pointer order-2 sm:order-3 w-[fit-content]"
            onClick={() =>
              editUsername
                ? handleChangeUsername()
                : setEditUsername(!editUsername)
            }
          >
            <img
              src={editUsername ? DoneIcon : EditIcon}
              alt="Edit"
              className="w-[20px] h-auto"
            />
            <span>{editUsername ? "Done" : "Edit"}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col bg-white px-10 py-6 rounded-lg overflow-hidden gap-2">
        <span className="text-[26px] font-bold text-red-400">
          Login Details
        </span>
        <span className="text-[16px] text-gray-400">
          Manage your email address mobile number and password
        </span>
      </div>
    </div>
  );
}

export default EditProfile;
