import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../SignUp/SignUp";
import PrivetRoute from "./PrivateRoute";
import DashboardMain from "../Layout/DashboardMain";
import Dashboard from "../pages/Dashboard/Dashboard/Dashboard";
import AddTask from "../pages/Dashboard/AddTask/AddTask";
import TaskManagementDashboard from "../pages/Dashboard/TaskManagementDashboard/TaskManagementDashboard";
import TaskUpdate from "../pages/Dashboard/TaskUpdate/TaskUpdate";
import Blog from "../pages/Blog/Blog";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: '/blog',
        element: <Blog/>
      },
      {
        path: '/about',
        element: <About/>
      },
      {
        path: '/contact',
        element: <Contact/>
      },
      {
        path: "/signUp",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivetRoute>
        <DashboardMain />
      </PrivetRoute>
    ),
    children: [
      {
        path: 'user_Dashboard',
        element:<Dashboard/>
      },
      {
        path:'addTask',
        element:<AddTask/>
      },
      {
        path: 'taskUpdate/:id',
        element:<TaskUpdate/>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/tasks/${params.id}`),
      },
      {
        path: 'tm_Dashboard',
        element: <TaskManagementDashboard/>
      }
    ]
  },
]);
