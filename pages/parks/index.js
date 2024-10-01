import useSWR from "swr";
import Card from "@/components/Card";
import Link from "next/link";

export default function ParksList() {
  const { data } = useSWR("/api/parks", { fallbackData: [] });

  return (
    <>
      <Link href={"../"}>back</Link>
      <ul>
        {data.map((park) => {
          return (
            <ul key={park._id}>
              <Card name={park.name} image={park.imageURL} />
            </ul>
          );
        })}
      </ul>
    </>
  );
}
