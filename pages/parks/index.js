import useSWR from "swr";
import styled from "styled-components";
import Card from "@/components/Card/Card";
import Image from "next/image";

const ParkListItem = styled.li`
  list-style: none;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export default function Parks() {
  const { data } = useSWR("/api/parks", { fallbackData: [] });

  const sortedParks = data.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <div>
        <Image
          src={
            "https://media.istockphoto.com/id/834203826/de/vektor/berlin-stadtplan-mit-bezirken-grau-abbildung-silhouette-form.jpg?s=612x612&w=0&k=20&c=WwhLlfWqzbObQpSrY_bXa7bNcrQ3nPbTF2B0UNx0D5A="
          }
          width={1100}
          height={600}
          alt="map of berlin"
        />
      </div>
      <CardContainer>
        <ul>
          {sortedParks.map((park) => {
            return (
              <ParkListItem key={park._id}>
                <Card name={park.name} image={park.imageURL} id={park._id} />
              </ParkListItem>
            );
          })}
        </ul>
      </CardContainer>
    </>
  );
}
