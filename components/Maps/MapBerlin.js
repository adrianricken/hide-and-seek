import { MapContainer, Marker, TileLayer } from "react-leaflet";

export default function MapBerlin({ data }) {
  console.log("data", data);

  return (
    <MapContainer center={[52.520008, 13.404954]} zoom={11}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {data.map((park) => (
        <Marker
          key={park._id}
          position={[park.coordinates.lat, park.coordinates.lng]}
        >
          {/* <Popup>
            <strong>{park.name}</strong>
            <br />
            {park.description}
          </Popup> */}
        </Marker>
      ))}
    </MapContainer>
  );
}
