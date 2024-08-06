import * as React from 'react';
import * as ReactDom from "react-dom";
import 'leaflet/dist/leaflet.css';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./pages/HomePage";
import Visualization from "./pages/Visualization";
import Profile from "./pages/Profile";
import AboutUs from './pages/AboutUs';
import Services from './pages/Services';
import PageLoader from './components/PageLoader';
import { MenuBar } from './components/MenuBar';

export default function App() {
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