import LeafletMap from '../components/LeafletMap';
import '../assets/css/visualization.css';
import Stage from "../components/Stage";
import ProgressBar from "@ramonak/react-progress-bar";
import { useState } from 'react';

export default function Visualization() {
  const [statusLabel, setStatusLabel] = useState<string>("")
  const [progressValue, setProgressValue] = useState<string>("0");
  const [geoJsons, setGeoJsons] = useState<string[]>([]);
  
  const updateStatus = (status: string, progress: string)=>{
    setStatusLabel(status);
    setProgressValue(progress);
  }
  const updateGeoJson = (geoJson: string)=>{
    setGeoJsons([... (geoJsons ?? []), geoJson]);
  }

  return (
    <div id='container'>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <ProgressBar 
        className='progress-bar'
        barContainerClassName='progress-bar-container'
        labelClassName='progress-bar-label'
        bgColor='#5E7444'
        customLabel={statusLabel + ": " + progressValue + "%"}
        completed={progressValue}
        animateOnRender={true}
      />
      <div id='classification'>
        <div id='left-menu'>
          <Stage
           wsStatusUpdate={updateStatus}
           wsGeoJsonUpdate={updateGeoJson}
          />
        </div>
        <div id='right-menu'>
          <LeafletMap
            geoJsons={geoJsons}
          />
        </div>
      </div>
    </div>
  )
}