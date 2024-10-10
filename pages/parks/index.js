import useSWR from "swr";
import styled from "styled-components";
import Card from "@/components/Card/Card";
import dynamic from "next/dynamic";

const MapBerlin = dynamic(() => import("../../components/Maps/MapBerlin"), {
  ssr: false, // Deaktiviert das Server-Side-Rendering
});

// Hauptcontainer, der das Layout festlegt
const MainContainer = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr; /* Linke Leiste hat feste Breite, rechter Bereich flexibel */
  gap: 20px; /* Abstand zwischen Leiste und Parks */

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* Leiste und Parks untereinander auf kleineren Bildschirmen */
  }
`;

const Sidebar = styled.div`
  background-color: #f7f7f7;
  height: fit-content;
  padding: 0 40px 0 40px;

  position: sticky;
  top: 10vh; /* Abstand vom oberen Rand des Bildschirms */
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

// Main container for the parks
const ParkContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(300px, 1fr)
  ); /* Responsive grid */
  gap: 40px; /* Space between cards */
  padding: 40px; /* Padding around the grid */
`;

const ParkListItem = styled.li`
  list-style: none;
`;

// Individual park card
const ParkCard = styled.div`
  background: #fff; /* Card background */
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Shadow effect */
  overflow: hidden; /* Clip overflow */
  transition: transform 0.2s; /* Smooth hover effect */
`;

export default function Parks() {
  const { data } = useSWR("/api/parks", { fallbackData: [] });

  const sortedParks = data.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <MapBerlin data={data} />
      <MainContainer>
        <Sidebar>
          <p>Search for specific Park:</p>
          <SearchInput />
        </Sidebar>
        <ParkContainer>
          {sortedParks.map((park) => {
            return (
              <ParkListItem key={park._id}>
                <ParkCard>
                  <Card
                    name={park.name}
                    image={park.imageURL}
                    id={park._id}
                    info={park.description_short}
                  />
                </ParkCard>
              </ParkListItem>
            );
          })}
        </ParkContainer>
      </MainContainer>
    </>
  );
}
