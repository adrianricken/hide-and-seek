import Link from "next/link";
import { useRouter } from "next/router.js";
import useSWR from "swr";
import styled from "styled-components";

const ImageContainer = styled.div`
  position: relative;
  height: 15rem;
`;

// const StyledLocationLink = styled(StyledLink)`
//   text-align: center;
//   background-color: white;
//   border: 3px solid lightsalmon;
// `;

export default function DetailsPage() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  const { data, isLoading, error } = useSWR(`/api/parks/${id}`);

  if (!isReady || isLoading || error) return <h2>Loading...</h2>;
  const { park } = data;

  return (
    <>
      <Link href={"/"} passHref legacyBehavior>
        <Link justifySelf="start">back</Link>
      </Link>
      <ImageContainer>
        <StyledImage
          src={park.image}
          priority
          fill
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          alt=""
        />
      </ImageContainer>
      <h2>
        {park.name}, {park.location}
      </h2>
      {/* <Link href={park.mapURL} passHref legacyBehavior>
        <StyledLocationLink>Location on Google Maps</StyledLocationLink>
      </Link> */}
      {/* <p>{park.description}</p> */}
    </>
  );
}
