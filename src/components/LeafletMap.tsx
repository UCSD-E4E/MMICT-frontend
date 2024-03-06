import {
    MapContainer,
    TileLayer,
    LayersControl,
    useMap,
    Polygon, 
    GeoJSON
  } from 'react-leaflet';
  import { FullscreenControl } from 'react-leaflet-fullscreen';
  import "react-leaflet-fullscreen/styles.css"
  import Control from 'react-leaflet-custom-control'
  import {Download as DownloadIcon} from '@mui/icons-material'
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
            style={{ width: '96%',
                    height: '100%',
                    marginLeft: '2%',
                    marginRight: '2%',
                    borderRadius: '20px',
                    boxShadow: '4px 7px 18px 0px rgba(0,0,0,0.5)'}}
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
          <FullscreenControl/>
          <Control prepend={false} position='bottomleft'>
              <button style={{backgroundSize: '26px 26px',
                              backgroundColor: 'white',
                              paddingTop: '6px',
                              paddingLeft: '7.5px',
                              paddingRight: '7.5px',
                              border: '2px solid rgba(0,0,0,0.25)',
                              borderRadius: '4px',
                              }}>
                <DownloadIcon />
              </button>
          </Control>
          </MapContainer>
        </div>
        </div>
    )
}