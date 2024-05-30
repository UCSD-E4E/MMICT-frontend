import { MapContainer, TileLayer, LayersControl, GeoJSON, Marker, Popup, useMapEvents } from "react-leaflet";
import type { LatLng } from "leaflet";
import { FullscreenControl } from "react-leaflet-fullscreen";
import "react-leaflet-fullscreen/styles.css";
import Control from "react-leaflet-custom-control";
import { Download as DownloadIcon } from "@mui/icons-material";
import { GeoJsonObject } from "geojson";
import mapData from "./Classify.json";
import mapData2 from "./labels.json";
import { useState, useRef } from "react";
import Toggle from "./Toggle";
import "../assets/css/map.css";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const { BaseLayer } = LayersControl;

interface GeojsonStyle {
  show: boolean;
  color: string;
}

interface LeafletMapProps {
  position: LatLng | null,
  setPosition: (position: LatLng | null) => void
}

export default function LeafletMap(props: LeafletMapProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  const initialGeojsonStyles = [
    {
      show: false,
      color: "blue",
    },
    {
      show: false,
      color: "green",
    },
  ];

  const showStyle = { opacity: 1, fillOpacity: 0.2 };
  const hideStyle = { opacity: 0, fillOpacity: 0 };

  const [geojsonStyles, setGeojsonStyles] =
    useState<GeojsonStyle[]>(initialGeojsonStyles);

  const handleDownload = () => {
    // code to handle download
  };

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
      <Toggle
        geojsonStyles={geojsonStyles}
        setGeojsonStyles={setGeojsonStyles}
      />
      <div style={{ width: "100%", height: "73vh" }} ref={elementRef}>
        <MapContainer
          center={[17.792094, -77.188759]}
          zoom={13}
          className="map"
        >
          <GeoJSON
            data={
              {
                type: "FeatureCollection",
                features: mapData.features,
              } as GeoJsonObject
            }
            style={
              geojsonStyles[0].show
                ? { ...showStyle, color: geojsonStyles[0].color }
                : hideStyle
            }
          />

          <GeoJSON
            data={
              {
                type: "FeatureCollection",
                features: mapData2.features,
              } as GeoJsonObject
            }
            style={
              geojsonStyles[1].show
                ? { ...showStyle, color: geojsonStyles[1].color }
                : hideStyle
            }
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
                url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
              />
            </BaseLayer>
            <BaseLayer name="Background Imagery">
              <TileLayer
                attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              />
            </BaseLayer>
          </LayersControl>
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
  );
}
