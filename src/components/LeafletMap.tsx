import {
    MapContainer,
    TileLayer,
    LayersControl,
    useMap,
    Polygon, 
    GeoJSON,
  } from 'react-leaflet';
  import { GeoJsonObject } from 'geojson'
  import mapData from "./Classify.json"
  import mapData2 from "./labels.json"
  import {useState, useRef} from 'react';
  import Toggle from './Toggle';
const center = [40.63463151377654, -97.89969605983609];
const { BaseLayer } = LayersControl;

interface GeojsonStyle {
  show: boolean,
  color: string,
}

export default function LeafletMap() {
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

    const initialGeojsonStyles = [{
      show: false,
      color: "blue",
    }, {
      show: false,
      color: "green"
    }]

    const showStyle = {opacity: 1, fillOpacity: 0.2}
    const hideStyle = {opacity: 0, fillOpacity: 0}

    const [geojsonStyles, setGeojsonStyles] = useState<GeojsonStyle[]>(initialGeojsonStyles)

    console.log(geojsonStyles)

    return (
      <div>
        <Toggle geojsonStyles={geojsonStyles} setGeojsonStyles={setGeojsonStyles}/>
      <div style={{ width: '100%', height: '68vh'}} ref={elementRef}>
          
          <MapContainer
            center={[17.792094, -77.188759]}
            zoom={13}
            style={{ width: '96%', height: '100%', marginLeft: '2%', marginRight: '2%'}}
            className="map"
          >
            <GeoJSON
              data={{
                type: "FeatureCollection",
                features: mapData.features
              } as GeoJsonObject}
              style={geojsonStyles[0].show ? {...showStyle, color: geojsonStyles[0].color} : hideStyle}
            />

            <GeoJSON
              data={{
                type: "FeatureCollection",
                features: mapData2.features
              } as GeoJsonObject}
              style={geojsonStyles[1].show ? {...showStyle, color: geojsonStyles[1].color} : hideStyle}
            />
            <LayersControl>
            <BaseLayer checked name="OpenStreetMap">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            </BaseLayer>
            <BaseLayer name="Topography">
            <TileLayer
              attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
              url='https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'
            />
            </BaseLayer>
            <BaseLayer name="Background Imagery">
            <TileLayer
              attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
              url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
            />
            </BaseLayer>
          </LayersControl>
            {/*
            <Marker position={[51.505, -0.09]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker> */}
          </MapContainer>
          <button style={{marginLeft:"2%", fontSize:"1.5vw"}}>Download</button>
          <button style={{fontSize:"1.5vw"}} onClick={goFullScreen}>Full Screen</button>
        </div>
        </div>
    )
}