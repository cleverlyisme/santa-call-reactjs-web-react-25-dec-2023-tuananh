import SideBar from "./components/SideBar";
import Notification from "./components/Notification/Notification";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <div className="max-w-screen min-h-screen bg-app">
        <div className="flex justify-center lg:justify-start w-full gap-10 px-3 sm:px-5 md:px-10 py-10">
          <div className="hidden lg:block">
            <SideBar />
          </div>
          <div className="w-[80vw] md:w-[70vw] lg:w-[65vw] xl:w-[75vw]">
            <Outlet />
          </div>
          <Notification />
        </div>
      </div>
    </>
  );
}

export default App;
