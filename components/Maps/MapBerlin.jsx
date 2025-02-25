import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import styled from "styled-components";
import Link from "next/link";

const customIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684850.png",
  iconSize: [20, 20],
});

const LevelContainer = styled.div`
  z-index: 100;
  box-sizing: border-box;
  height: fit-content;
`;

const StyledLink = styled(Link)`
  text-decoration: none; // Remove underline
  color: inherit; // Inherit color from parent
`;

export default function MapBerlin({ data }) {
  return (
    <LevelContainer>
      <MapContainer center={[52.51079, 13.39336]} zoom={12}>
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <TileLayer url="https://tile.jawg.io/1ca2be1b-3c2c-4d66-bbf6-82bcad84a98a/{z}/{x}/{y}{r}.png?access-token=OCQMFeqjmuIUfZ9XUmVpkiFgeLCwveHnhg78w316UnrCDNpitbJ0Xus26IF0J4WW" />
        {data.map((park) => (
          <Marker
            key={park._id}
            position={[park.coordinates.lat, park.coordinates.lng]}
            icon={customIcon}
          >
            <Popup>
              <StyledLink href={`/parks/${park._id}`} passHref>
                {park.name}
              </StyledLink>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </LevelContainer>
  );
}
