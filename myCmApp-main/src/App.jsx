import SideBar from "./components/SideBar";
import Notification from "./components/Notification/Notification";
import { Outlet } from "react-router-dom";
import SwapFace from "./pages/SwapFace/SwapFace";

function App() {
  return (
    <>
      <div className="max-w-screen min-h-screen bg-app">
        <div className="flex w-full gap-10 px-5 py-5">
          <div className="sidebar-container">
            <SideBar />
          </div>
          <div className="max-w-screen-lg">
            <Outlet />
          </div>
          <Notification />
        </div>
      </div>
    </>
  );
}

export default App;
