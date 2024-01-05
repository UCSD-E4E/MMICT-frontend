import * as React from 'react';
import * as ReactDom from "react-dom";
import 'leaflet/dist/leaflet.css';
import './App.css';
import {createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { AuthenticationGuard } from "./components/auth-guard";
import Home from "./pages/HomePage";
import Visualization from "./pages/Visualization";
import Profile from "./pages/Profile";
import AboutUs from './pages/AboutUs';
import Services from './pages/Services';
import PageLoader from './components/PageLoader';
import { MenuBar } from './components/MenuBar';
import { useEffect, useState } from 'react';

const router = createBrowserRouter([
  {
    path: "/aboutUs" ,
    element: <AboutUs />
  }, 
  {
    path: "/visualization" ,
    element: <AuthenticationGuard component={Visualization} />
  },
  {
    path: "/profile" ,
    element: <AuthenticationGuard component={Profile} />
  },
  {
    path: "/services",
    element: <Services />,
  },
  {
    path: "/pageLoader",
    element: <PageLoader />,
  },
  {
    path: "/",
    element: <Home />,
  }
])
export default function App() {
  const [isHomeRoute, setIsHomeRoute] = useState(window.location.pathname === "/");
  const { isLoading } = useAuth0();

  useEffect(() => {
    const handleRouteChange = () => setIsHomeRoute(window.location.pathname === "/");
    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  if (isLoading) {
    return (
      <div className="page-layout">
        <PageLoader />
      </div>
    );
  }

  return (
    <div id='app'>
      <MenuBar isHomeRoute={isHomeRoute}></MenuBar>
      <RouterProvider router={router} />
    </div>
  );
}