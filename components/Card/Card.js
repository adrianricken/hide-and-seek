import styled from "styled-components";
import Image from "next/image.js";
import Link from "next/link";

const CardContainer = styled.div`
  width: 30rem;
`;

const StyledParkName = styled.h3`
  margin-top: 1rem;
  color: #336234;
`;

const ImageContainer = styled.div`
  position: relative;
  height: 20rem;
  width: 30rem;
`;

const StyledImage = styled(Image)`
  object-fit: cover;
  filter: saturate(0.8);
`;

export default function Card({ name, image, id }) {
  return (
    <CardContainer>
      <Link href={`/parks/${id}`} passHref>
        <ImageContainer>
          <StyledImage
            src={image}
            fill
            sizes="30rem"
            alt="image of park"
            priority={true}
          />
        </ImageContainer>
      </Link>
      <StyledParkName>{name}</StyledParkName>
    </CardContainer>
  );
}
