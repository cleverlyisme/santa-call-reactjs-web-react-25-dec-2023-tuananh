import SideBar from "./components/SideBar";
import Notification from "./components/Notification/Notification";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <div className="max-w-screen min-h-screen bg-app">
        <div className="flex justify-center md:justify-start w-full gap-10 px-3 sm:px-5 md:px-10 py-10">
          <div className="hidden md:block">
            <SideBar />
          </div>
          <div className="w-[80vw] sm:w-[70vw] md:w-[60vw] lg:w-[65vw] xl:w-[75vw]">
            <Outlet />
          </div>
          <Notification />
        </div>
      </div>
    </>
  );
}

export default App;
