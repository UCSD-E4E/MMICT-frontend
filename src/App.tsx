import * as React from 'react';
import * as ReactDom from "react-dom";
import 'leaflet/dist/leaflet.css';
import './App.css';
import {createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from "./pages/HomePage"
import Visualization from "./pages/Visualization"
import Profile from "./pages/Profile"
import AboutUs from './pages/AboutUs';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/AboutUs" ,
    element: <AboutUs />
  }, 
  {
    path: "/Visualization" ,
    element: <Visualization />
  },
  {
    path: "/Profile" ,
    element: <Profile />
  }
])
export default function App() {
  return (
    <RouterProvider router={router} />
  );
}