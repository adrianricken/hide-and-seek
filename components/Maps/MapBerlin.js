import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import { Icon, divIcon, point } from "leaflet";
import Link from "next/link";
import { useRouter } from "next/router";

const customIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149983.png",
  //   iconUrl: require("./icons/placeholder.png"),
  iconSize: [30, 30],
});

export default function MapBerlin({ data }) {
  return (
    <MapContainer center={[52.51173, 13.40156]} zoom={11}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {data.map((park) => (
        <Marker
          key={park._id}
          position={[park.coordinates.lat, park.coordinates.lng]}
          icon={customIcon}
        >
          <Popup>
            <Link href={`/parks/${park._id}`} passHref>
              {park.name}
            </Link>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
