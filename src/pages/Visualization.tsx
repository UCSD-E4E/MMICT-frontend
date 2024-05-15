import React from 'react';
import LeafletMap from '../components/LeafletMap';
import '../assets/css/visualization.css';
import Stage from "../components/Stage";
import ProgressBar from "@ramonak/react-progress-bar";
import VisualizationForm from '../components/VisualizationForm';

export default function Visualization() {
  return (
    <div id='container'>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
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
        <div id='left-menu'>
          <Stage/>
          <VisualizationForm/>
        </div>
        <div id='right-menu'>
          <LeafletMap />
        </div>
      </div>
    </div>
  )
}