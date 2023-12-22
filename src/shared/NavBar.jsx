import {
    Navbar,
    MobileNav,
    Typography,
    IconButton,
  } from "@material-tailwind/react";
  import { useEffect, useState } from "react";
  import { NavLink } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import useAuth from "../Components/Hooks/useAuth";
  

const NavBar = () => {
    const [openNav, setOpenNav] = useState(false);
    const {user} = useAuth();

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
 
  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 text-lg font-normal"
      >
        <NavLink
        className={({ isActive }) => (isActive ? "underline underline-offset-8 text-blue-400" : "")}
        to="/"
      >
        Home
      </NavLink>
      </Typography>
      {user? <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 text-lg font-normal"
      >
        <NavLink
        className={({ isActive }) => (isActive ? "underline underline-offset-8 text-blue-400" : "")}
        to="/dashboard/user_Dashboard"
      >
        Dashboard
      </NavLink>
      </Typography> : ''}
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 text-lg font-normal"
      >
        <NavLink
         className={({ isActive }) => (isActive ? "underline underline-offset-8 text-blue-400" : "")} 
        to="/blog" >
          Blog
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 text-lg font-normal"
      >
        <NavLink 
         className={({ isActive }) => (isActive ? "underline underline-offset-8 text-blue-400" : "")}
        to="/About" >
          About
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 text-lg font-normal"
      >
        <NavLink 
         className={({ isActive }) => (isActive ? "underline underline-offset-8 text-blue-400" : "")}
        to="/contact" >
          Contact
        </NavLink>
      </Typography>
      {/* profile */}
      <Typography>
      <ProfileMenu/>
      </Typography>
    </ul>
  );


    return (
        <div>
         <Navbar className=" bg-white top-0 z-10 h-max max-w-full rounded-none px-4 lg:px-8 fixed">
        <div className="flex items-center justify-between text-white ">
          <Typography
            as="a"
            href="/"
            className="mr-4 cursor-pointer py-1.5 font-medium"
          >
            <h2 className="text-xl text-blue-400 font-semibold">Task Management</h2>
          </Typography>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-blue-400 hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <MobileNav open={openNav}>{navList}</MobileNav>
      </Navbar>
    </div>
    );
};

export default NavBar;