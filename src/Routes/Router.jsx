import {createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../SignUp/SignUp";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      children:[
        {
          path: '/',
          element: <Home/>
        },
        {
          path: '/signUp',
          element: <SignUp/>
        },
        {
          path: '/login',
          element: <Login/>
        }
      ]
    },
  ]);