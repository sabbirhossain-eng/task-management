import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../shared/NavBar";
import Footers from "../shared/Footers";

const Main = () => {
  const location = useLocation();
  const hidden = location.pathname.includes("/login") ||location.pathname.includes("/signUp");
  return (
    <div>
      <NavBar />
      <div className="pt-24 min-h-[calc(100vh-68px)]  mx-auto px-4 md:px-8">
        <Outlet />
      </div>
      <div>
        {hidden || <Footers/>}
      </div>
    </div>
  );
};

export default Main;
