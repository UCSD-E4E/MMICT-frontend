import React from 'react';
import 'leaflet/dist/leaflet.css';
import './App.css';

import Login from './pages/Login';
import Header from "./components/Header"
import Register from "./pages/Register"
import Home from "./pages/Home"
import Visualization from "./pages/Visualization"
import Settings from "./pages/Settings"
import { Route, Routes } from "react-router-dom"



export default function App() {
  return (
    <div id='container'>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Visualization" element={<Visualization />} />
          <Route path="/Settings" element={<Settings />} />
        </Routes>
      </div>
    </div>

  );
}