import useSWR from "swr";
import { useRouter } from "next/router";
import CardDetail from "@/components/CardDetail/CardDetail";

export default function ParkDetails() {
  const router = useRouter();
  const { id } = router.query;

  const { data } = useSWR(id ? `/api/parks/${id}` : null);

  if (!data) {
    return <p>Loading...</p>;
  }

  const park = data.park;

  return (
    <>
      <CardDetail
        id={park._id}
        name={park.name}
        latitude={park.coordinates.lat}
        longitude={park.coordinates.lng}
        zoomLevel={park.zoomLevel}
        description={park.description}
        image={park.imageURL}
        amenities={park.amenities}
        accessible={park.accessible}
        description_short={park.description_short}
        secondImage={park.secondImageURL}
      />
    </>
  );
}
