import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import styled from "styled-components";

const createIcon = (iconUrl) =>
  new Icon({
    iconUrl,
    iconSize: [30, 30],
  });

const icons = {
  Climbing: createIcon(
    "https://cdn-icons-png.flaticon.com/512/6162/6162025.png"
  ),
  "Beach volleyball": createIcon(
    "https://cdn-icons-png.flaticon.com/512/6162/6162025.png"
  ),
  Playground: createIcon(
    "https://cdn-icons-png.flaticon.com/512/6162/6162025.png"
  ),
  "Table tennis": createIcon(
    "https://cdn-icons-png.flaticon.com/512/6162/6162025.png"
  ),
  Boule: createIcon("https://cdn-icons-png.flaticon.com/512/6162/6162025.png"),
  Calisthenics: createIcon(
    "https://cdn-icons-png.flaticon.com/512/6162/6162025.png"
  ),
  Football: createIcon(
    "https://cdn-icons-png.flaticon.com/512/6162/6162025.png"
  ),
  Skating: createIcon(
    "https://cdn-icons-png.flaticon.com/512/6162/6162025.png"
  ),
  Basketball: createIcon(
    "https://cdn-icons-png.flaticon.com/512/6162/6162025.png"
  ),
};

const LevelContainer = styled.div`
  z-index: 100;
  box-sizing: border-box;
  height: fit-content;
`;

export default function MapPark({ latitude, longitude, zoomLevel, amenities }) {
  return (
    <>
      <LevelContainer>
        <MapContainer center={[latitude, longitude]} zoom={zoomLevel}>
          <TileLayer
            attribution="&copy; OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <TileLayer url="https://tile.jawg.io/1ca2be1b-3c2c-4d66-bbf6-82bcad84a98a/{z}/{x}/{y}{r}.png?access-token=OCQMFeqjmuIUfZ9XUmVpkiFgeLCwveHnhg78w316UnrCDNpitbJ0Xus26IF0J4WW" />
          {amenities.map((amenity, index) =>
            amenity.coordinates.map((coord, idx) => (
              <Marker
                key={`${index}-${idx}`}
                position={[coord.lat, coord.lng]}
                icon={icons[amenity.type]}
              >
                <Popup>{amenity.type}</Popup>
              </Marker>
            ))
          )}
        </MapContainer>
      </LevelContainer>
    </>
  );
}
