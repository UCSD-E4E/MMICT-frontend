import * as React from 'react';
import * as ReactDom from "react-dom";
import 'leaflet/dist/leaflet.css';
import './App.css';
import {createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from "./pages/HomePage";
import Visualization from "./pages/Visualization";
import Profile from "./pages/Profile";
import AboutUs from './pages/AboutUs';
import Services from './pages/Services';
import { MenuBar } from './components/MenuBar';
import { useEffect, useState } from 'react';

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
  },
  {
    path: "/Services",
    element: <Services />,
  }
])
export default function App() {
  const [isHomeRoute, setIsHomeRoute] = useState(window.location.pathname === "/");

  useEffect(() => {
    const handleRouteChange = () => setIsHomeRoute(window.location.pathname === "/");
    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  return (
    <div id='app'>
      <MenuBar isHomeRoute={isHomeRoute}></MenuBar>
      <RouterProvider router={router} />
    </div>
  );
}