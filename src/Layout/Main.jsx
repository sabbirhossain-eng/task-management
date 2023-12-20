import { Outlet } from "react-router-dom";
import NavBar from "../shared/NavBar";
import Footers from "../shared/Footers";

const Main = () => {
  return (
    <div>
      <NavBar />
      <div className="pt-24 min-h-[calc(100vh-68px)]  mx-auto px-4 md:px-8">
        <Outlet />
      </div>
      <Footers/>
    </div>
  );
};

export default Main;
