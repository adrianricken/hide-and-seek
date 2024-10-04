import Image from "next/image";
import styled from "styled-components";

const ImageContainer = styled.div`
  position: relative;
  height: 30rem;
  width: 30rem;
`;

const StyledImage = styled(Image)`
  object-fit: cover;
`;

export default function CardDetail({
  id,
  name,
  location,
  description,
  image,
  amenities,
  accessible,
}) {
  //   if (!park) {
  //     return <p>Loading...</p>;
  //   }

  return (
    <>
      <h1>{name}</h1>
      <ImageContainer>
        <StyledImage src={image} fill alt="" />
      </ImageContainer>
      <p>{description}</p>
    </>
  );
}
