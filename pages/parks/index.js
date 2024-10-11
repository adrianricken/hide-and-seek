import useSWR from "swr";
import styled from "styled-components";
import Card from "@/components/Card/Card";
import dynamic from "next/dynamic";
import Filter from "@/components/Filter/Filter";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

const MapBerlin = dynamic(() => import("../../components/Maps/MapBerlin"), {
  ssr: false, // Disable Server-Side Rendering
});

const MainContainer = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr; /* Fixed width sidebar, flexible main area */

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* Stack sidebar and parks on smaller screens */
  }
`;

const ParkContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 5rem;
  padding: 5rem;
`;

const ParkListItem = styled.li`
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
`;

const LogButton = styled.button`
  border: none;
  background-color: transparent;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 6rem;
  top: 0;
  right: 0;
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
          <nav>
            {!session ? (
              <LogButton onClick={() => signIn()}>Login</LogButton>
            ) : (
              <ProfileContainer>
                <Link href={"./profile"}>
                  <Image
                    src={session.user.image}
                    alt="User Profile"
                    width={50}
                    height={50}
                    style={{ borderRadius: "50%" }}
                  />
                </Link>
                <LogButton onClick={() => signOut({ callbackUrl: "/" })}>
                  Logout
                </LogButton>
              </ProfileContainer>
            )}
          </nav>
        </Sidebar>
        <ParkContainer>
          {filteredParks.map((park) => (
            <ParkListItem key={park._id}>
              <ParkCard>
                <Card
                  name={park.name}
                  image={park.imageURL}
                  id={park._id}
                  info={park.description_short}
                  hash={park.hash}
                />
              </ParkCard>
            </ParkListItem>
          ))}
        </ParkContainer>
      </MainContainer>
    </>
  );
}
