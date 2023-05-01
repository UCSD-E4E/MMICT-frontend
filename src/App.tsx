import * as React from 'react';
import * as ReactDom from "react-dom";
import 'leaflet/dist/leaflet.css';
import './App.css';
import {createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Login from './pages/Login';
import Register from "./pages/Register"
import Home from "./pages/HomePage"
import Visualization from "./pages/Visualization"
import Settings from "./pages/Settings"
import Logout from "./pages/Logout"


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/Login" ,
    element: <Login />
  },
  {
    path: "/Register" ,
    element: <Register />
  },
  {
    path: "/Visualization" ,
    element: <Visualization />
  },
  {
    path: "/Settings" ,
    element: <Settings />
  },
  {
    path: "/Logout" ,
    element: <Logout />
  }
])
export default function App() {
  return (
    <RouterProvider router={router} />
  );
}