import {
    MapContainer,
    TileLayer,
    LayersControl,
    useMap,
    Polygon
  } from 'react-leaflet';
  import React from 'react';

const center = [40.63463151377654, -97.89969605983609];
const { BaseLayer } = LayersControl;
export default function LeafletMap() {
    return (
        <MapContainer
          center={[18.173094, -77.318759]}
          zoom={10}
          style={{ width: '50vw', height: '60vh', marginLeft:'25vw'}}
          className="map"
        >
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
    )
}