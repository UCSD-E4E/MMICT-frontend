import {
  MapContainer,
  TileLayer,
  LayersControl,
  useMap,
  Polygon, 
  GeoJSON,
  useMapEvents,
  Marker,
  Popup,
} from 'react-leaflet';
import L, { FeatureGroup, geoJson, LatLng, Layer, LayerEvent, LayerGroup } from 'leaflet';
import { FullscreenControl } from "react-leaflet-fullscreen";
import "react-leaflet-fullscreen/styles.css";
import Control from "react-leaflet-custom-control";
import { Download as DownloadIcon } from "@mui/icons-material";
import { GeoJsonObject } from 'geojson'
import {useEffect, useRef, useState} from 'react';
import Toggle from './Toggle';
import "../assets/css/map.css";
import 'leaflet/dist/leaflet.css';

const center = [40.63463151377654, -97.89969605983609];

L.Icon.Default.mergeOptions({
iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
iconUrl: require('leaflet/dist/images/marker-icon.png'),
shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const defaultStyle = {
  color: "blue",
  opacity: 1.0,
  fillOpacity: 0.2
}

type Props = {
  geoJsons: string[],
  position: LatLng | null,
  setPosition: (position: LatLng | null) => void
}
export default function LeafletMap(props : Props) {
  const elementRef = useRef<HTMLDivElement>(null);

  const showGeojsons = useRef<Boolean[]>([])
  const [geoStyles, setGeoStyles] = useState<Map<number, {color: string, opacity: number, fillOpacity: number}>>(new Map<number, {color: string, opacity: number, fillOpacity: number}>());
  const geoIds = useRef<number[]>([]);

  const handleDownload = () => {
    // code to handle download
  };

  function toggleGeoJsonHide(geoId: number, show: Boolean){
    showGeojsons.current[geoId] = show
    let currStyle = geoStyles.get(geoId);
    if(currStyle === undefined){
      currStyle = {
        color: "blue",
        opacity: 0,
        fillOpacity: 0
      }
    }
    else if(show){
      currStyle.opacity = 1;
      currStyle.fillOpacity = 0.2;
    }
    else{
      currStyle.opacity = 0;
      currStyle.fillOpacity = 0;
    }
    setGeoStyles(geoStyles => new Map(geoStyles.set(geoId, currStyle ?? defaultStyle)))
  }

  function asGeoJson(jsonStr: string){
    let gjs = {
      type: "FeatureCollection",
      features: JSON.parse(jsonStr).features
    } as GeoJsonObject
    return gjs
  }

  useEffect(()=>{
    for(var i = 0; i < showGeojsons.current.length; i++){
      toggleGeoJsonHide(geoIds.current[i], showGeojsons.current[i])
    }
  },[showGeojsons])

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
      <Toggle showGeojsons={showGeojsons.current} toggleFn={toggleGeoJsonHide}/>
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
                showGeojsons.current.push(true)
              }
              const tempStyle = geoStyles.get(geoId)
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

  // const MapContent = () => {
  //   var map = useMap()
  //   // useEffect(() => {
  //     // var map = useMap() // L.map('map').setView([17.792094, -77.188759], 13);
  //     // L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //     //     maxZoom: 19,
  //     //     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  //     // }).addTo(map);
  
  //     setGeoJsonLayerGroup(new L.FeatureGroup().addTo(map));
  //     // map.invalidateSize()
  //   // }, []);
  //   useEffect(() => {
  //     initGeoJsons()
  //   }, [props.geoJsons])

  //   useEffect(()=>{
  //     for(var i = 0; i < showGeojsons.length; i++){
  //       toggleGeoJsonHide(geoIds[i], showGeojsons[i])
  //     }
  //   },[showGeojsons])
  //   return null
  // }

  // function initGeoJsons(){
    //   props.geoJsons.forEach((geoString) =>{
    //     var geoJson = JSON.parse(geoString)
    //     addGeoJson(geoJson.features);
    //   })
    // }
    // function addGeoJson(features: object){
    //   let data={
    //     type: "FeatureCollection",
    //     features: features,
    //   } as GeoJsonObject
      
    //   let geoJson = L.geoJSON(data);
    //   geoJsonLayerGroup!.addLayer(geoJson);
    //   let geoId = geoJsonLayerGroup!.getLayerId(geoJson);
    //   setGeoIds([... (geoIds ?? []), geoId]);
    //   setShowGeojsons([... (showGeojsons ?? []), true])
    //   toggleGeoJsonHide(geoId, true)
    // }