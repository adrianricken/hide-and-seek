import useSWR from "swr";
import { useRouter } from "next/router";
import CardDetail from "@/components/CardDetail";

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
      {/* <h1>{park.name}</h1>
      <img src={park.imageURL} alt={park.name} height={300} width={400} />
      <p>{park.description}</p> */}
      <CardDetail
        id={park._id}
        name={park.name}
        location={park.location}
        description={park.description}
        image={park.imageURL}
        amenities={park.amenities}
        accessible={park.accessible}
      />
    </>
  );
}
