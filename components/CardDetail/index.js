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
  return (
    <>
      <section>
        <div></div>
        <div>
          <h1>{name}</h1>
        </div>
      </section>
      <ImageContainer>
        <StyledImage src={image} fill alt="" />
      </ImageContainer>
      <p>{description}</p>
      <br />
      <p>{accessible}</p>
    </>
  );
}
