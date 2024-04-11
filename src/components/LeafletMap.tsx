import {
    MapContainer,
    TileLayer,
    LayersControl,
    useMap,
    Polygon, 
    GeoJSON,
  } from 'react-leaflet';
  import L, { FeatureGroup, geoJson, Layer, LayerEvent, LayerGroup } from 'leaflet';
  import { GeoJsonObject } from 'geojson'
  import {useEffect, useRef, useState} from 'react';
  import Toggle from './Toggle';

const center = [40.63463151377654, -97.89969605983609];

type Props = {
  geoJsons: string[]
}
export default function LeafletMap({geoJsons}: Props) {
    const elementRef = useRef<HTMLDivElement>(null);
    const goFullScreen = () => {
      const element = elementRef.current;
      console.log('Full Screen')
      if(element){
        if(element.requestFullscreen){
          element.requestFullscreen();
        }
      }
    }

    const [showGeojsons, setShowGeojsons] = useState<Boolean[]>([])
    const [geoStyles, setGeoStyles] = useState<Map<number, {color: string, opacity: number, fillOpacity: number}>>(new Map<number, {color: string, opacity: number, fillOpacity: number}>());
    const [geoIds, setGeoIds] = useState<number[]>([]);
    
    const [geoJsonLayerGroup, setGeoJsonLayerGroup] = useState<L.LayerGroup>();

    useEffect(() => {
      var map = L.map('map').setView([17.792094, -77.188759], 13);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);
  
      setGeoJsonLayerGroup(new L.FeatureGroup().addTo(map));
    }, []);

    useEffect(() => {
      initGeoJsons()
    }, [geoJsons])

    useEffect(()=>{
      for(var i = 0; i < showGeojsons.length; i++){
        toggleGeoJsonHide(geoIds[i], showGeojsons[i])
      }
    },[showGeojsons])

    function initGeoJsons(){
      geoJsons.forEach((geoString) =>{
        var geoJson = JSON.parse(geoString)
        addGeoJson(geoJson.features);
      })
    }
    function addGeoJson(features: object){
      let data={
        type: "FeatureCollection",
        features: features,
      } as GeoJsonObject
      
      let geoJson = L.geoJSON(data);
      geoJsonLayerGroup!.addLayer(geoJson);
      let geoId = geoJsonLayerGroup!.getLayerId(geoJson);
      setGeoIds([... (geoIds ?? []), geoId]);
      setShowGeojsons([... (showGeojsons ?? []), true])
      toggleGeoJsonHide(geoId, true)
    }
    function toggleGeoJsonHide(geoId: number, show: Boolean){
      let currStyle = geoStyles.get(geoId);
      if(currStyle === undefined){
        currStyle = {
          color: "blue",
          opacity: 1,
          fillOpacity: 0.2
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
      geoStyles.set(geoId, currStyle);
      (geoJsonLayerGroup!.getLayer(geoId) as L.GeoJSON).setStyle(
        currStyle
      )
    }
    return (
      <div>
        <div style={{ width: '100%', height: '68vh'}} ref={elementRef}>
          <Toggle showGeojsons={showGeojsons} setShowGeojsons={setShowGeojsons}/>
          <div id="map" style={{ width: '96%', height: '100%', marginLeft: '2%', marginRight: '2%'}}> </div>
          <button style={{marginLeft:"2%", fontSize:"1.5vw"}}>Download</button>
          <button style={{fontSize:"1.5vw"}} onClick={goFullScreen}>Full Screen</button>
        </div>
      </div>
    )
}