import React from 'react';
import LeafletMap from '../components/LeafletMap';
import '../assets/css/visualization.css';
import Header from "../components/Header"
import Stage from "../components/Stage.js"

export default function Visualization() {
  return (
    <div id='container'>
      <Header />
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