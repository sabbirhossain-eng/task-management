import { NavLink, Outlet } from "react-router-dom";
// import useAuth from "../Components/Hooks/useAuth";
import { MdDashboardCustomize, MdOutlineManageHistory } from "react-icons/md";
import NavBar from "../shared/NavBar";
import { VscGitPullRequestCreate } from "react-icons/vsc";

const DashboardMain = () => {
 
  return (
    <div>
      <NavBar/>
      <div className="flex flex-col md:flex-row mx-auto">
        {/* Link */}
        <div className="w-auto lg:w-56 pt-24 pb-10 md:pb-0 md:min-h-screen border-blue-400 border-b-2 md:border-r-2">
          <ul className="menu  md:ml-6 font-medium capitalize space-y-4">
            <div className="flex items-center">
              <MdDashboardCustomize className="text-xl text-blue-400 mr-2" />
              <NavLink
                to="/dashboard/user_Dashboard"
                className={({ isActive }) =>
                  isActive ? "underline underline-offset-8 text-blue-400" : ""
                }
              >
                Dashboard
              </NavLink>
            </div>
            <div className="divider"></div>
            <div className="flex items-center">
              <VscGitPullRequestCreate className="text-xl text-blue-400 mr-2" />
              <NavLink
                to="/dashboard/addTask"
                className={({ isActive }) =>
                  isActive ? "underline underline-offset-8 text-blue-400" : ""
                }
              >
                Add Task
              </NavLink>
            </div>
            <div className="flex items-center">
              <MdOutlineManageHistory className="text-xl text-blue-400 mr-2" />
              <NavLink
                to="/dashboard/tm_Dashboard"
                className={({ isActive }) =>
                  isActive ? "underline underline-offset-8 text-blue-400" : ""
                }
              >
                Task Management Dashboard
              </NavLink>
            </div>
          </ul>
        </div>
        {/* dashboard content */}
        <div className="flex-1 p-8 pt-24 min-h-[calc(100vh-68px)]">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default DashboardMain;
