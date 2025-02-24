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
  align-items: start;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto; /* Sidebar oben, dann Liste */
  }
`;

const ParkContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  padding: 2rem;
  width: 100%;
`;

const Sidebar = styled.div`
  height: auto;
  padding: 2rem;
  background-color: white;
  z-index: 10;
  position: sticky;
  top: 0;

  @media (max-width: 760px) {
    position: relative;
    padding: 2rem;
  }
`;

const StyledListItem = styled.li`
  list-style: none;
`;

const ParkCard = styled.div`
  overflow: hidden;
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
      ? park.amenities.some((amenity) => amenity.type === filter)
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
          <Filter setFilter={setFilter} />
        </Sidebar>
        <ParkContainer>
          {filteredParks.map((park) => (
            <StyledListItem key={park._id}>
              <ParkCard>
                <Card name={park.name} id={park._id} />
              </ParkCard>
            </StyledListItem>
          ))}
        </ParkContainer>
      </MainContainer>
    </>
  );
}
