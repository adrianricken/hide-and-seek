import useSWR from "swr";
import Card from "@/components/Card";
import styled from "styled-components";

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
      <div></div>
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
