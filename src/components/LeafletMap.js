import {
    MapContainer,
    TileLayer,
    useMap,
    Polygon
  } from 'react-leaflet';

const center = [40.63463151377654, -97.89969605983609];
export default function LeafletMap() {
    return (
        <MapContainer
          center={[18.173094, -77.318759]}
          zoom={10}
          style={{ width: '50vw', height: '60vh', marginLeft:'25vw'}}
          className="map"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/*
          <Marker position={[51.505, -0.09]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker> */}
        </MapContainer>
    )
}