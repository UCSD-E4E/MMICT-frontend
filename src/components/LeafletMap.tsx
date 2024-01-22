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
  import {useRef} from 'react';
const center = [40.63463151377654, -97.89969605983609];
const { BaseLayer } = LayersControl;
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
    return (
      <div style={{ width: '100%', height: '85vh'}} ref={elementRef}>
          <MapContainer
            center={[18.173094, -77.318759]}
            zoom={10}
            style={{ width: '96%', height: '100%', marginLeft: '2%', marginRight: '2%'}}
            className="map"
          >
            <GeoJSON
              data={{
                type: "FeatureCollection",
                features: mapData.features
              } as GeoJsonObject }
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
    )
}