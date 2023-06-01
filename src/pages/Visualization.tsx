import React from 'react';
import LeafletMap from '../components/LeafletMap';
import '../assets/css/visualization.css';
import AppBar from "../components/MenuBar"
import Stage from "../components/Stage"

export default function Visualization() {
  return (
    <div id='container'>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <AppBar />
      <div style={{height: 65}}/> 
      {/* This feels really wrong ^, there must be some other way to start the page lower than the appbar, 
      is it putting it on app.tsx page rather than every page right */}
      <div id='progress-bar'>
        <p>progress bar component 100%</p>
      </div>
      <div id='classification'>
        <Stage />
        <LeafletMap />
      </div>
    </div>
  )
}