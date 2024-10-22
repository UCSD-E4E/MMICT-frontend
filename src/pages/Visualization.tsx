import LeafletMap from '../components/LeafletMap';
import '../assets/css/visualization.css';
import ProgressBar from "@ramonak/react-progress-bar";
import { useState } from 'react';
import ClassifyForm from '../components/ClassifyForm';
import { LatLng } from 'leaflet';
import ImageUpload from '../components/ImageUpload';
import Classifications from '../components/Classifications';

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

  const [showGeojsons, setShowGeojsons] = useState<Boolean[]>([])
  const [images, setImages] = useState<string[]>(["test.png", "jamaica3-31-34ortho-2-0.tif"])
  const [position, setPosition] = useState<LatLng | null>(null);
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
          <ImageUpload 
            images={images}
            setImages={setImages}
          />
          <ClassifyForm 
            position={position} 
            setPosition={setPosition} 
            wsStatusUpdate={updateStatus} 
            wsGeoJsonUpdate={updateGeoJson}
            images={images}
          />
          <Classifications
            showGeojsons={showGeojsons}
            setShowGeojsons={setShowGeojsons}
          />
        </div>
        <div id='right-menu'>
          <LeafletMap
            geoJsons={geoJsons}
            position={position} setPosition={setPosition}
            showGeojsons={showGeojsons}
            setShowGeojsons={setShowGeojsons}
          />
        </div>
      </div>
    </div>
  )
}