import useSWR from "swr";
import styled from "styled-components";
import Card from "@/components/Card/Card";
import dynamic from "next/dynamic";
import Filter from "@/components/Filter/Filter";
import { useState, useEffect } from "react";

const MapBerlin = dynamic(() => import("../../components/Maps/MapBerlin"), {
  ssr: false, // Disable Server-Side Rendering
});

const MainContainer = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr; /* Fixed width sidebar, flexible main area */
  gap: 20px; /* Space between sidebar and parks */

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* Stack sidebar and parks on smaller screens */
  }
`;

const Sidebar = styled.div`
  background-color: #f7f7f7;
  height: fit-content;
  padding: 0 40px;
  position: sticky;
  top: 10vh; /* Space from top of the screen */
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

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
  const [filter, setFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredParks, setFilteredParks] = useState(sortedParks);

  useEffect(() => {
    const filtered = sortedParks.filter((park) => {
      const matchesAmenity = filter
        ? park.amenities.map((amenity) => amenity).includes(filter)
        : true;

      const matchesSearch = park.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return matchesAmenity && matchesSearch; // Both conditions must be true
    });

    setFilteredParks(filtered);
  }, [filter, searchQuery, sortedParks]);

  return (
    <>
      <MapBerlin data={filteredParks} />
      <MainContainer>
        <Sidebar>
          <SearchInput
            type="text"
            placeholder="Search parks by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
          />{" "}
          <Filter setFilter={setFilter} /> {/* Pass the setFilter function */}
        </Sidebar>
        <ParkContainer>
          {filteredParks.map((park) => {
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
