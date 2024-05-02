import * as React from 'react';
import * as ReactDom from "react-dom";
import 'leaflet/dist/leaflet.css';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Home from "./pages/HomePage";
import Visualization from "./pages/Visualization";
import Profile from "./pages/Profile";
import AboutUs from './pages/AboutUs';
import Services from './pages/Services';
import PageLoader from './components/PageLoader';
import { MenuBar } from './components/MenuBar';
import { useEffect, useState } from 'react';

export default function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="page-layout">
        <PageLoader />
      </div>
    );
  }

  return (
    <div id='app'>
      <Router>
      <MenuBar></MenuBar>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/AboutUs' element={<AboutUs/>}/>
        <Route path='/Visualization' element={<Visualization/>}/>
        <Route path='/Profile' element={<Profile/>}/>
        <Route path='/Services' element={<Services/>}/>
        <Route path='/PageLoader' element={<PageLoader/>}/>
      </Routes>
      </Router>
    </div>
  );
}