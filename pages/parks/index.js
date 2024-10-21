import useSWR from "swr";
import styled from "styled-components";
import Card from "@/components/Card/Card";
import dynamic from "next/dynamic";
import Filter from "@/components/Filter/Filter";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Head from "next/head";

const MapBerlin = dynamic(() => import("../../components/Maps/MapBerlin"), {
  ssr: false,
});

const MainContainer = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr; /* Fixed width sidebar, flexible main area */

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    justify-items: center; /* Horizontally center the content */
    align-items: center; /* Vertically center the content */
  }
`;

const ParkContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 5rem;
  padding: 5rem;
`;

const StyledListItem = styled.li`
  list-style: none;
`;

const ParkCard = styled.div`
  overflow: hidden;
`;

const Sidebar = styled.div`
  height: fit-content;
  padding: 5rem 0 0 5rem;
  background-color: white;
  z-index: 10;
  position: sticky;
  top: 10vh;

  @media (max-width: 760px) {
    margin-right: 5rem;
    width: 100%;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export default function Parks() {
  const { data: session } = useSession();
  const { data } = useSWR("/api/parks", { fallbackData: [] });
  const sortedParks = data.sort((a, b) => a.name.localeCompare(b.name));
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("");

  const filteredParks = sortedParks.filter((park) => {
    const matchesAmenity = filter
      ? park.amenities.map((amenity) => amenity).includes(filter)
      : true;

    const matchesSearch = park.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesAmenity && matchesSearch;
  });

  return (
    <>
      <Head>
        <title>Hide and Seek - Parks</title>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>

      <MapBerlin data={filteredParks} />
      <MainContainer>
        <Sidebar>
          <SearchInput
            type="text"
            placeholder="Search parks by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
          />
          <Filter setFilter={setFilter} /> {/* Pass the setFilter function */}
        </Sidebar>
        <ParkContainer>
          {filteredParks.map((park) => (
            <StyledListItem key={park._id}>
              <ParkCard>
                <Card name={park.name} image={park.imageURL} id={park._id} />
              </ParkCard>
            </StyledListItem>
          ))}
        </ParkContainer>
      </MainContainer>
    </>
  );
}
