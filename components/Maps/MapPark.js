import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import styled from "styled-components";

const icons = {
  "Table tennis": new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/6162/6162025.png",
    iconSize: [30, 30],
  }),
  "Beach volleyball": new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/6162/6162025.png",
    iconSize: [30, 30],
  }),
  Playground: new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/2830/2830129.png",
    iconSize: [30, 30],
  }),
  Climbing: new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/6162/6162025.png",
    iconSize: [30, 30],
  }),
  Basketball: new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/6162/6162025.png",
    iconSize: [30, 30],
  }),
  Football: new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/6162/6162025.png",
    iconSize: [30, 30],
  }),
  Skating: new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/6162/6162025.png",
    iconSize: [30, 30],
  }),
};

const getIconForAmenity = (type) => icons[type];

const LevelContainer = styled.div`
  z-index: 100;
  box-sizing: border-box;
  height: fit-content;
`;

export default function MapPark({ latitude, longitude, zoomLevel, amenities }) {
  return (
    <LevelContainer>
      <MapContainer center={[latitude, longitude]} zoom={zoomLevel}>
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <TileLayer url="https://tile.jawg.io/1ca2be1b-3c2c-4d66-bbf6-82bcad84a98a/{z}/{x}/{y}{r}.png?access-token=OCQMFeqjmuIUfZ9XUmVpkiFgeLCwveHnhg78w316UnrCDNpitbJ0Xus26IF0J4WW" />

        {amenities &&
          amenities.length > 0 &&
          amenities.map((amenity, amenityIndex) => {
            // Make sure coordinates are valid
            const coordinates = amenity.coordinates || [];

            return coordinates.map((coordinate, coordIndex) => (
              <Marker
                key={`${amenityIndex}-${coordIndex}`}
                position={[coordinate.lat, coordinate.lng]}
                icon={getIconForAmenity(amenity.type)}
              >
                <Popup>{amenity.type}</Popup>
              </Marker>
            ));
          })}
      </MapContainer>
    </LevelContainer>
  );
}
