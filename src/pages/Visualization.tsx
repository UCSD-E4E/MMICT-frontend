import {useState} from 'react';
import LeafletMap from '../components/LeafletMap';
import '../assets/css/visualization.css';
import Stage from "../components/Stage";
import ProgressBar from "@ramonak/react-progress-bar";

export default function Visualization() {
  const [stageStyle, setStageStyle] = useState({});
  const [mapStyle, setMapStyle] = useState({});
  const handleOptionsChange = (showOptions: boolean) => {
    if(showOptions){
      setStageStyle({width: "100px", margin: "0px", padding: "0px"})
      setMapStyle({width:"120%"})
    } else {
      setStageStyle({})
      setMapStyle({})
    }
  }
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
        <div id='left-menu' style={stageStyle}>
          <Stage onShowOptionsChange={handleOptionsChange}/>
        </div>
        <div id='right-menu' style={mapStyle}>
          <LeafletMap />
        </div>
      </div>
    </div>
  )
}