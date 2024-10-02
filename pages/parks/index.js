import useSWR from "swr";
import Card from "@/components/Card";
import Link from "next/link";
import styled from "styled-components";

const ParkListItem = styled.li`
  list-style: none;
`;

export default function Parks() {
  const { data } = useSWR("/api/parks", { fallbackData: [] });

  return (
    <>
      <ul>
        {data.map((park) => {
          return (
            <ParkListItem key={park._id}>
              <Card name={park.name} image={park.imageURL} />
            </ParkListItem>
          );
        })}
      </ul>
    </>
  );
}
