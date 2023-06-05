import React from 'react';
import LeafletMap from '../components/LeafletMap';
import '../assets/css/visualization.css';
import {MenuBar} from "../components/MenuBar"
import Stage from "../components/Stage"
import ProgressBar from "@ramonak/react-progress-bar";

export default function Visualization() {
  return (
    <div id='container'>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <MenuBar />
      <div style={{height: 65}}/> 
      {/* This feels really wrong ^, there must be some other way to start the page lower than the appbar, 
      is it putting it on app.tsx page rather than every page right */}
      <ProgressBar 
        className='progress-bar'
        barContainerClassName='progress-bar-container'
        labelClassName='progress-bar-label'
        bgColor='#5E7444'
        /* Make some call to websocket here for progress value */
        completed={60}
        animateOnRender={true}
      />
      <div id='classification'>
        <Stage />
        <LeafletMap />
      </div>
    </div>
  )
}