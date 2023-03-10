import React from 'react';
import LeafletMap from '../components/LeafletMap';
import '../assets/css/visualization.css';
import Header from "../components/Header"

export default function Visualization() {
  return (
    <div id='container'>
      <Header />
      <div id='navbar'>
        <div id='navbar-left'>
          <p>Mangrove ICT</p>
        </div>
        <div id='navbar-right'>
          <p>
            Settings
          </p>
          <p>
            Logout
          </p>
        </div>
      </div>
      <div id='progress-bar'>
        <p>progress bar component 100%</p>
      </div>
      <div id='classification'>
        <div id='stage'>
          stage component
        </div>
        <LeafletMap />
      </div>
    </div>
  )
}