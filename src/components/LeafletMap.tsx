import {
  MapContainer,
  TileLayer,
  GeoJSON,
  useMapEvents,
  Marker,
  Popup,
} from 'react-leaflet';
import L, { LatLng } from 'leaflet';
import { FullscreenControl } from "react-leaflet-fullscreen";
import "react-leaflet-fullscreen/styles.css";
import Control from "react-leaflet-custom-control";
import { Download as DownloadIcon } from "@mui/icons-material";
import { GeoJsonObject } from 'geojson'
import {useEffect, useRef, useState} from 'react';
import "../assets/css/map.css";
import 'leaflet/dist/leaflet.css';

const center = [40.63463151377654, -97.89969605983609];

L.Icon.Default.mergeOptions({
iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
iconUrl: require('leaflet/dist/images/marker-icon.png'),
shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const DEFAULT_COLORS = ["blue", "red", "green"]
const DEFAULT_OPACITY = 1.0
const DEFAULT_FILL_OPACITY = 0.2

type Props = {
  geoJsons: string[],
  position: LatLng | null,
  setPosition: (position: LatLng | null) => void,
  showGeojsons: Boolean[],
  setShowGeojsons: Function
}
export default function LeafletMap(props : Props) {
  const elementRef = useRef<HTMLDivElement>(null);

  // const [showGeojsons, setShowGeojsons] = useState<Boolean[]>([])
  const [geoStyles, setGeoStyles] = useState<Map<number, {color: string, opacity: number, fillOpacity: number}>>(new Map<number, {color: string, opacity: number, fillOpacity: number}>());
  const geoIds = useRef<number[]>([]);

  const handleDownload = () => {
    // code to handle download
  };

  function initGeojsonStyle(geoId: number){
    return {
      color: DEFAULT_COLORS[geoId],
      opacity: DEFAULT_OPACITY,
      fillOpacity: DEFAULT_FILL_OPACITY
    }
  }
  function toggleGeoJsonHide(geoId: number, show: Boolean){
    props.showGeojsons[geoId] = show
    var currStyle = geoStyles.get(geoId) ?? initGeojsonStyle(geoId)
    if(show){
      currStyle.opacity = 1;
      currStyle.fillOpacity = 0.2;
    }
    else{
      currStyle.opacity = 0;
      currStyle.fillOpacity = 0;
    }
    setGeoStyles(geoStyles => new Map(geoStyles.set(geoId, currStyle)))
  }

  function asGeoJson(jsonStr: string){
    let gjs = {
      type: "FeatureCollection",
      features: JSON.parse(jsonStr).features
    } as GeoJsonObject
    return gjs
  }

  useEffect(()=>{
    for(var i = 0; i < props.showGeojsons.length; i++){
      toggleGeoJsonHide(geoIds.current[i], props.showGeojsons[i])
    }
  },[props.showGeojsons])

  const LocationMarker = () => {
    const map = useMapEvents({
      click(e) {
       props.setPosition(e.latlng) 
      }
    })
  
    return props.position === null ? null : (
      <Marker position={props.position}>
        <Popup>Selected Location</Popup>
      </Marker>
    )
  }
  return (
    <div className="map-container">
      <div style={{ width: '100%', height: '73vh'}} ref={elementRef}>
        <MapContainer
          center={[17.792094, -77.188759]}
          zoom={13}
          className="map"
        >
          {
            props.geoJsons.map((json, geoId) => {
              if(!geoIds.current.includes(geoId)){
                geoIds.current.push(geoId)
                props.showGeojsons.push(true)
              }
              var tempStyle = geoStyles.get(geoId) ?? initGeojsonStyle(geoId)
              let style = () => { 
                return {
                  color: tempStyle?.color,
                  opacity: tempStyle?.opacity,
                  fillOpacity: tempStyle?.fillOpacity
                } 
              }
              return <GeoJSON data={asGeoJson(json)} key={geoId} style={style}/>
            })
          }
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <FullscreenControl />
          <Control prepend={false} position="bottomleft">
            <button className="download" onClick={handleDownload}>
              <DownloadIcon />
            </button>
          </Control>
          <LocationMarker/>
        </MapContainer>
      </div>
    </div>
  )
}